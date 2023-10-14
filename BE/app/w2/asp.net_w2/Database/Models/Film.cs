using static System.Net.Mime.MediaTypeNames;
using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace asp.net_w2.Database.Models
{
    public class Film
    {
        [Key]
        [Required]
        public int film_id {  get; set; }
        [Required]
        [MaxLength(45)]
        public string title { get; set; }
        public string? description { get; set; }
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
        public string rating { get; set; }
        public string? special_features { get; set; }
        [Required]
        public DateTime last_update { get; set; }
    }
}
