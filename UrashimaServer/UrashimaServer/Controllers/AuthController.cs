using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Common.Helper;
using UrashimaServer.Database;
using UrashimaServer.Dtos;
using UrashimaServer.Models;
using OtpNet;

namespace UrashimaServer.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly DataContext _dbContext;
        readonly IEmailService _emailService;

        public AuthController(IConfiguration configuration, DataContext dbContext, IEmailService emailService)
        {
            _configuration = configuration;
            _dbContext = dbContext;
            _emailService = emailService;
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

            //if (!Helper.IsAuthorizedOrigin(requestOrigin.ToString(), account.Role))
            //{
            //    return BadRequest(new
            //    {
            //        message = "Invalid origin!",
            //    });
            //}

            if (!VerifyPasswordHash(request.Password, Helper.StringToByteArray(account.PasswordHash), Helper.StringToByteArray(account.PasswordSalt)))
            {
                return BadRequest(new {
                    message = "Sai thông tin tài khoản",
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

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(EmailDto emailDto)
        {
            if (_dbContext.Accounts == null)
            {
                return NotFound();
            }
            var account = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Email == emailDto.Email);

            if (account == null)
            {
                return NotFound();
            }

            account.PasswordResetToken = GenerateOTP();
            account.ResetTokenExpires = DateTime.Now.AddMinutes(5);
            await _dbContext.SaveChangesAsync();

            // Setup mail
            MailRequest mailRequest = new MailRequest();
            mailRequest.ToEmail = emailDto.Email;
            mailRequest.Subject = "Mã OTP đổi mật khẩu!!!";
            mailRequest.Body = $"Thân chào {account.FullName}, Mã OTP của bạn là: {account.PasswordResetToken} và sẽ hết hạn trong vòng 300s";
            try
            {
                await _emailService.SendEmailAsync(mailRequest);
            }
            catch
            {
                return BadRequest(new
                {
                    Message = "Không thể gửi email"
                });
            }

            return Ok(new
            {
                Message = "Mã Otp đã được gửi đến địa chỉ mail của bạn"
            });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtpToken(EmailAndOtpDto request)
        {
            if (_dbContext.Accounts == null)
            {
                return NotFound();
            }

            var account = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Email == request.Email);

            if (account == null)
            {
                return NotFound();
            }

            if (!account.PasswordResetToken.Equals(request.Otp) || IsOtpExpired(account.ResetTokenExpires, 300))
            {
                return BadRequest(new
                {
                    Message = "Mã otp không hợp lệ"
                });
            }
            
            return Ok(new
            {
                Message = "Mã otp hợp lệ"
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            if (_dbContext.Accounts == null)
            {
                return NotFound();
            }
            var account = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Email == request.Email);

            if (account == null)
            {
                return NotFound();
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            account.PasswordHash = Helper.ByteArrayToString(passwordHash);
            account.PasswordSalt = Helper.ByteArrayToString(passwordSalt);

            await _dbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Đổi mật khẩu thành công"
            });
        }

        [HttpPost("change-password"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            if (_dbContext.Accounts == null)
            {
                return NotFound();
            }
            var account = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (account == null)
            {
                return NotFound();
            }

            if (!VerifyPasswordHash(request.OldPassword, Helper.StringToByteArray(account.PasswordHash), Helper.StringToByteArray(account.PasswordSalt)))
            {
                return BadRequest(new
                {
                    message = "Mật khẩu cũ không chính xác",
                });
            }

            if (request.Password.Equals(request.OldPassword))
            {
                return BadRequest(
                    new
                    {
                        Message = "Mật khẩu cũ và mật khẩu mới không được trùng nhau"
                    });
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            account.PasswordHash = Helper.ByteArrayToString(passwordHash);
            account.PasswordSalt = Helper.ByteArrayToString(passwordSalt);

            await _dbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Đổi mật khẩu thành công"
            });
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

        private string GenerateOTP()
        {
            var key = KeyGeneration.GenerateRandomKey(20);

            var base32String = Base32Encoding.ToString(key);
            var base32Bytes = Base32Encoding.ToBytes(base32String);
            var totp = new Totp(base32Bytes, 300);
            return totp.ComputeTotp(DateTime.UtcNow);
        }

        private bool IsOtpExpired(DateTime otpTime, int validityPeriodSeconds)
        {
            TimeSpan timeSinceOtp = DateTime.Now - otpTime;
            return timeSinceOtp.TotalSeconds > validityPeriodSeconds;
        }
    }
}
