#pragma warning disable 
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace ApiValidation.Controllers
{
    [Route("/api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private const string USER_NAME = "dat";
        private const string PASSWORD = "123123";
        IConfiguration _configuration;

        public class LoginDto
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
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

            return Ok(token);
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
