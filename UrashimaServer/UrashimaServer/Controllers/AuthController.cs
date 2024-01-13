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
using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Controllers
{
    /// <summary>
    /// Controller xử lý phân quyền.
    /// </summary>
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        readonly IConfiguration _configuration;
        readonly DataContext _dbContext;
        readonly IEmailService _emailService;

        public AuthController(IConfiguration configuration, DataContext dbContext, IEmailService emailService, IWebHostEnvironment hostingEnvironment)
        {
            _configuration = configuration;
            _dbContext = dbContext;
            _emailService = emailService;
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// API lấy account sử dụng Id.
        /// </summary>
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

        /// <summary>
        /// API tạo account mới.
        /// </summary>
        [HttpPost("register"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<ActionResult<Account>> Register(RegisterDto request)
        {
            if (request.Password.Length < 6)
                return BadRequest(new {
                    message = "Mật khẩu phải có ít nhất 6 ký tự."
                });

            var acc = await _dbContext.Accounts
                .FirstOrDefaultAsync(acc => acc.Email.Equals(request.Email)); //  && (!request.IsSocial || acc.PasswordHash.Equals("social"))

            if (acc != null)
            {
                return BadRequest(new {
                    message = "Tài khoản đã tồn tại!"
                });
            }

            if (!GlobalConstant.Roles.Contains(request.Role))
            {
                return BadRequest(new
                {
                    message = "Hệ thống không hỗ trợ tạo Vai trò này"
                });
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            acc = new Account()
            {
                Email = request.Email,
                FullName = request.FullName,
                Phone = request.Phone,
                DateOfBirth = request.DateOfBirth,
                PasswordHash = Helper.ByteArrayToString(passwordHash), // request.IsSocial ? "social" :
                PasswordSalt = Helper.ByteArrayToString(passwordSalt), // request.IsSocial ? "social" :
                Role = request.Role,
                UnitUnderManagement = request.Role.Equals(GlobalConstant.HeadQuater) ? 
                    GlobalConstant.ManagementUnitHQ : request.UnitUnderManagement,
            };

            var token = CreateToken(acc, request.Role);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, acc);
            await _dbContext.Accounts.AddAsync(acc);
            await _dbContext.SaveChangesAsync();
            return Ok(new
            {
                message = "Tạo tài khoản mới thành công!",
                token,
                refreshToken = refreshToken.Token,
            });
        }

        /// <summary>
        /// API đăng nhập bằng email - mật khẩu.
        /// </summary>
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDto request)
        {

            var account = await _dbContext.Accounts
                .FirstOrDefaultAsync(acc => acc.Email.Equals(request.Email));

            if (account == null)
            {
                return NotFound(new
                {
                    Message = "Tài khoản không tồn tại."
                });
            }

            var hasOrigin = this.Request.Headers.TryGetValue("Origin", out var requestOrigin);
            if (!hasOrigin || !Helper.IsAuthorizedOrigin(requestOrigin.ToString(), account.Role))
            {
                return BadRequest(new
                {
                    message = "Tài khoản đang đăng nhập tại sai trang web!",
                });
            }

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

        /// <summary>
        /// API đăng nhập sử dụng tài khoản bên thứ 3 (google, facebook,...).
        /// </summary>
        [HttpPost("login-social")]
        public async Task<ActionResult<string>> LoginSocial(RegisterSocialDto request)
        {
            var account = await _dbContext.Accounts
                .FirstOrDefaultAsync(acc => acc.Email.Equals(request.Email));

            if (account == null)
            {
                return NotFound(new
                {
                    Message = "Tài khoản không tồn tại."
                });
            }

            var hasOrigin = this.Request.Headers.TryGetValue("Origin", out var requestOrigin);
            if (!hasOrigin || !Helper.IsAuthorizedOrigin(requestOrigin.ToString(), account.Role))
            {
                return BadRequest(new
                {
                    message = "Tài khoản đang đăng nhập tại sai trang web!",
                });
            }

            string token = CreateToken(account, account.Role);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, account);
            await _dbContext.SaveChangesAsync();

            return Ok(new {
                accountId = account.Id,
                message = "Đăng nhập thành công!",
                token,
                refreshToken = refreshToken.Token,
                role = account.Role
            });
        }

        /// <summary>
        /// API lấy refresh token cho account.
        /// </summary>
        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken([Required] string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest(new
                {
                    message = "Refresh token không hợp lệ!"
                });
            }

            var acc = await _dbContext.Accounts.FirstOrDefaultAsync(acc => acc.RefreshToken == refreshToken);

            if (acc == null)
            {
                return BadRequest(new
                {
                    message = "Tài khoản không tồn tại."
                });
            }

            if (acc.TokenExpires < DateTime.Now)
            {
                return Unauthorized(new {
                    message = "Refresh Token hết hạn, xin thử lại."
                });
            }

            string token = CreateToken(acc, acc.Role);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, acc);
            return Ok(new {
                message = "Lấy Refresh token thành công",
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

        /// <summary>
        /// API quên mật khẩu.
        /// </summary>
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
                return NotFound("Tài khoản không tồn tại.");
            }

            account.PasswordResetToken = GenerateOTP();
            account.ResetTokenExpires = DateTime.Now.AddMinutes(5);
            await _dbContext.SaveChangesAsync();


            string contentRootPath = _hostingEnvironment.ContentRootPath;
            string folderPath = Path.Combine(contentRootPath, "EmailTemplate");
            // Setup mail
            MailRequest mailRequest = new()
            {
                ToEmail = emailDto.Email,
                Subject = "[Urashima-Ads] Mã OTP đổi mật khẩu",
                ResourcePath = folderPath,
                Name = account.FullName,
                Otp = account.PasswordResetToken
            };
            try
            {
                await _emailService.SendOtpEmailAsync(mailRequest);
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

        /// <summary>
        /// API xác nhận otp được gửi đến email.
        /// </summary>
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

        /// <summary>
        /// API thay đổi mật khẩu của tài khoản sau khi quên mật khẩu.
        /// </summary>
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

        /// <summary>
        /// API thay đổi mật khẩu của tài khoản sau khi đã đăng nhập.
        /// </summary>
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
