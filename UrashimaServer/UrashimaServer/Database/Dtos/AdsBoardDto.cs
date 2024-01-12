
using System.Collections;
using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Utility;

namespace UrashimaServer.Models
{
    public class GetAdsBoardDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        [Range(1, int.MaxValue)]
        public int Width { get; set; }
        [Range(1, int.MaxValue)]
        public int Height { get; set; }
        [ImageCheck]
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }

        public GetAdsPointDto? AdsPoint { set; get; }
    }

    public class AdsBoardBasicDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        [Range(1, int.MaxValue)]
        public int Width { get; set; }
        [Range(1, int.MaxValue)]
        public int Height { get; set; }
        [ImageCheck]
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }

    public class GetAdsPointDto
    {
        [Required]
        public int Id { get; set; }
        [Range(-90, 90)]
        public double Latitude { get; set; }
        [Range(-180, 180)]
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public ICollection<AdsPointImage>? Images { get; set; }
    }
}
