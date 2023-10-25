using System.ComponentModel.DataAnnotations;
namespace ApiValidation.Models
{
    public class Film
    {
        [Key]
        public int film_id { get; set; }
        [Required(ErrorMessage = "title is required")]
        [MaxLength(45)]
        public string title { get; set; }
        [MinLength(1), MaxLength(50)]
        public string? description { get; set; }
        [MaxLength(4)]
        public string? release_year { get; set; }
        [Required]
        public byte language_id { get; set; }
        public byte? original_language_id { get; set; }
        [Required]
        public byte rental_duration { get; set; }
        [Required]
        public Decimal rental_rate { get; set; }
        public Int16? length { get; set; }
        [Required]
        public Decimal replacement_cost { get; set; }
        [Required]
        public string rating { get; set; } = "PG";
        public string? special_features { get; set; } = "Deleted Scenes,Behind the Scenes";
        [Required]
        public DateTime last_update { get; set; }
    }
}
