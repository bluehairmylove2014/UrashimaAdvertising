using UrashimaServer.Common.Constant;

namespace UrashimaServer.Dtos
{
    public class RegisterDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterSocialDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = GlobalConstant.User;
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RefreshToken
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Expires { get; set; }
    }
}
