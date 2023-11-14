using ApiSecurity.Database.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ApiValidation.Controllers
{
    [Route("/api/v1/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private const string USER_NAME = "dat";
        private const string PASSWORD = "123123";
        readonly IConfiguration _configuration;

        public class LoginDto
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class TokenDto
        {
            public string Token { get; set; } = string.Empty;
            public string RefreshToken { get; set; } = string.Empty;
        }

        private static RefreshToken myRefreshToken { get; set; } = new RefreshToken()
        {
            Expires = DateTime.UtcNow,
        };

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public ActionResult<TokenDto> Login(LoginDto login)
        {
            if (login.Username != USER_NAME)
            {
                return NotFound("Cannot find username");
            }

            if (login.Password != PASSWORD)
            {
                return NotFound("Incorrect password");
            }

            string token = CreateToken(login.Username);
            var refresh_token = GenerateRefreshToken();
            SetRefreshToken(refresh_token);

            return Ok(new TokenDto
            {
                Token = token,
                RefreshToken = refresh_token.Token
            });
        }

        [HttpPost("refresh-token")]
        public ActionResult<string> RefreshToken(LoginDto login, string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest(new
                {
                    message = "Refresh token không hợp lệ"
                });
            }

            if (myRefreshToken.Expires < DateTime.Now)
            {
                return Unauthorized(new
                {
                    message = "Refresh Token đã hết hạn, vui lòng đăng nhập lại"
                });
            }

            string token = CreateToken(login.Username);
            var refresh_token = GenerateRefreshToken();
            SetRefreshToken(refresh_token);

            return Ok(new
            {
                message = "Refresh token thành công",
                token,
                refreshToken = refresh_token.Token,
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

        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            myRefreshToken = newRefreshToken;
        }

        private string CreateToken(string username)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username)
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
    }
}
