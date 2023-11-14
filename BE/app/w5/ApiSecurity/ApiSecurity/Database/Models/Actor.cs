using System.ComponentModel.DataAnnotations;

namespace ApiSecurity.Database.Models
{
    public class Actor
    {
        [Key]
        public int actor_Id { get; set; }
        public string first_name { get; set; } = string.Empty;
        public string last_name { get; set; } = string.Empty;
        public DateTime last_update { get; set; }
    }
}
