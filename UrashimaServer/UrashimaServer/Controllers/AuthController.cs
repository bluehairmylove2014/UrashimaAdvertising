using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.Enum;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Dtos;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly DataContext _dbContext;

        public AuthController(IConfiguration configuration, DataContext dbContext)
        {
            _configuration = configuration;
            _dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            if (_dbContext.AdsBoards == null)
            {
                return NotFound();
            }
            var acc = await _dbContext.Accounts.FindAsync(id);

            if (acc == null)
            {
                return NotFound();
            }

            return acc;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Account>> Register(RegisterDto request)
        {
            if (request.Password.Length < 6)
                return BadRequest(new {
                    message = "Password must contain at least 6 characters!"
                });

            var acc = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Email.Equals(request.Email));

            if (acc != null)
            {
                return BadRequest(new {
                    message = "Account has already existed!"
                });
            }

            if (!GlobalConstant.Roles.Contains(request.Role))
            {
                return BadRequest(new
                {
                    message = "Unsupported role!"
                });
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            acc = new Account()
            {
                Email = request.Email,
                FullName = request.FullName,
                PasswordHash = Helper.ByteArrayToString(passwordHash),
                PasswordSalt = Helper.ByteArrayToString(passwordSalt),
                Role = request.Role
            };

            var token = CreateToken(acc, GlobalConstant.WardOfficer);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, acc);
            await _dbContext.Accounts.AddAsync(acc);
            await _dbContext.SaveChangesAsync();
            return Ok(new
            {
                message = "Register successfully!",
                token,
                refreshToken = refreshToken.Token,
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDto request)
        {
            var hasOrigin = this.Request.Headers.TryGetValue("Origin", out var requestOrigin);

            var account = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Email.Equals(request.Email));

            if (account == null)
            {
                return NotFound(new
                {
                    Message = "Tài khoản không tồn tại."
                });
            }

            if (!Helper.IsAuthorizedOrigin(requestOrigin.ToString(), account.Role))
            {
                return BadRequest(new
                {
                    message = "Invalid origin!",
                });
            }

            if (!VerifyPasswordHash(request.Password, Helper.StringToByteArray(account.PasswordHash), Helper.StringToByteArray(account.PasswordSalt)))
            {
                return BadRequest(new {
                    message = "Wrong credentials!",
                });
            }

            string token = CreateToken(account, account.Role);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, account);
            await _dbContext.SaveChangesAsync();

            return Ok(new
            {
                accountId = account.Id,
                message = "Đăng nhập thành công!",
                token,
                refreshToken = refreshToken.Token,
                role = account.Role
            });
        }

        [HttpPost("login-social")]
        public async Task<ActionResult<string>> LoginSocial(RegisterSocialDto request)
        {
            if (!GlobalConstant.Roles.Contains(request.Role))
            {
                return BadRequest(new
                {
                    message = "Unsupported role!"
                });
            }

            var acc = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Email.Equals(request.Email));

            Account newAcc = acc ?? new Account ()
            {
                Email = request.Email,
                FullName = request.FullName,
                Role = request.Role
            };

            var hasOrigin = this.Request.Headers.TryGetValue("Origin", out var requestOrigin);
            if (!Helper.IsAuthorizedOrigin(requestOrigin.ToString(), newAcc.Role))
            {
                return BadRequest(new
                {
                    message = "Invalid origin!",
                });
            }

            var token = CreateToken(newAcc, request.Role);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, newAcc);

            if (acc is null)
            {
                await _dbContext.Accounts.AddAsync(newAcc);
                await _dbContext.SaveChangesAsync();
            }

            return Ok(new {
                accountId = newAcc.Id,
                message = "Login successfully!",
                token,
                refreshToken = refreshToken.Token,
                role = request.Role
            });
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken(string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest(new
                {
                    message = "Invalid refresh token!"
                });
            }

            var acc = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.RefreshToken == refreshToken);

            if (acc == null)
            {
                return BadRequest(new
                {
                    message = "Account not found!"
                });
            }

            if (acc.TokenExpires < DateTime.Now)
            {
                return Unauthorized(new {
                    message = "Refresh Token expired, try again."
                });
            }

            string token = CreateToken(acc, acc.Role);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, acc);
            return Ok(new {
                message = "Refresh token successfully",
                token,
                refreshToken = newRefreshToken.Token,
            });
        }

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken, Account acc)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            acc.RefreshToken = newRefreshToken.Token;
            acc.TokenCreated = newRefreshToken.Created;
            acc.TokenExpires = newRefreshToken.Expires;
        }

        private string CreateToken(Account acc, string role)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, acc.Email),
                new Claim(ClaimTypes.Role, role),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
