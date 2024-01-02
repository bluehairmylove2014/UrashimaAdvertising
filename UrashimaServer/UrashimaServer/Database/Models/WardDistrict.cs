using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Models
{
    public class WardDistrict
    {
        [Key]
        public int Id { get; set; }
        public string Ward { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
    }
}
