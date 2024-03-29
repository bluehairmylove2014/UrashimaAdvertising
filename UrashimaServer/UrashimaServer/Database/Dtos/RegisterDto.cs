﻿using System.ComponentModel.DataAnnotations;
using UrashimaServer.Common.Constant;
using UrashimaServer.Utility;

namespace UrashimaServer.Dtos
{
    public class RegisterDto
    {
        public string FullName { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        [RoleCheck]
        public string Role { get; set; } = GlobalConstant.WardOfficer;
        public string UnitUnderManagement { get; set; } = string.Empty;
    }

    public class RegisterSocialDto
    {
        // public string FullName { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RefreshToken
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Expires { get; set; }
    }

    public class ChangePasswordRequest
    {
        [Required]
        public string OldPassword { get; set; } = string.Empty;
        [Required, MinLength(6, ErrorMessage = "Mật khẩu ít nhất 6 kí tự")]
        public string Password { get; set; } = string.Empty;
    }

    public class ResetPasswordRequest
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, MinLength(6, ErrorMessage = "Mật khẩu ít nhất 6 kí tự")]
        public string Password { get; set; } = string.Empty;
    }

    public class EmailDto
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }

    public class OtpDto
    {
        public string Otp { get; set; } = string.Empty;
    }

    public class EmailAndOtpDto
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Otp { get; set; } = string.Empty;
    }
}
