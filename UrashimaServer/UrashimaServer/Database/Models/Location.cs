using System.ComponentModel.DataAnnotations;
using UrashimaServer.Models;

namespace UrashimaServer.Database.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public ICollection<Report>? Reports { get; set; }
    }
}
