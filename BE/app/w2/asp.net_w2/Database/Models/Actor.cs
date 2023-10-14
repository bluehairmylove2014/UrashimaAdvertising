using System.ComponentModel.DataAnnotations;

namespace asp.net_w2.Database.Models
{
    public class Actor
    {
        [Key]
        [Required]
        public int actor_Id { get; set; }
        [Required]
        [MaxLength(45)]
        public string first_name { get; set; }
        [Required]
        [MaxLength(45)]
        public string last_name { get; set; }
        [Required]
        public DateTime last_update { get; set; }

    }
}
