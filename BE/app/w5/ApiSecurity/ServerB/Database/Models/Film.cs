using System.ComponentModel.DataAnnotations;

namespace ServerB.Database.Models
{
    public class Film
    {
        [Key]
        public int film_id { get; set; }
        public string title { get; set; } = string.Empty;
        public string? description { get; set; }
        public string? release_year { get; set; }
        public byte language_id { get; set; }
        public byte? original_language_id { get; set; }
        public byte rental_duration { get; set; }
        public Decimal rental_rate { get; set; }
        public Int16? length { get; set; }
        public Decimal replacement_cost { get; set; }
        public string rating { get; set; } = string.Empty;
        public string? special_features { get; set; }
        public DateTime last_update { get; set; }
    }
}
