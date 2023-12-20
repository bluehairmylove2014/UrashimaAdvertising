using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;

namespace UrashimaServer.Models
{
    public class AdsPoint
    {
        [Key]
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public ICollection<AdsPointImage>? Images { get; set; }
        public ICollection<AdsBoard>? AdsBoard { get; set; }
        public ICollection<Report>? Reports { get; set; }

        public int? AdsCreateRequestId { set; get; }
        public AdsCreationRequest? AdsCreateRequest { set; get; }
    }
}
