using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Dtos
{
    public class AccountBasicInfoDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Phone { get; set; } = string.Empty;
    }

    public class AccountDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Phone { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string UnitUnderManagement { get; set; } = string.Empty;
    }

    public class UpdateUnitUnderManagementDto
    {
        public int Id { get; set; }
        public string UnitUnderManagement { get; set; } = string.Empty;
    }
}
