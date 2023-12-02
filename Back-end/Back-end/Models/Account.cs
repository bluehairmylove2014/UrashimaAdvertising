﻿namespace Back_end.Models
{
    public class Account
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string RefreshToken { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        // AreaManaged??
    }
}
