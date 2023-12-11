
using System.Collections;
using UrashimaServer.Database.Dtos;

namespace UrashimaServer.Models
{
    public class GetAdsBoardDto
    {
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Width { get; set; }
        public int Height { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }

        public GetAdsPointDto? AdsPoint { set; get; }
        public ICollection<ReportAdsBoardDto>? Reports { set; get; }
    }

    public class AdsBoardBasicDto
    {
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Width { get; set; }
        public int Height { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }

    public class GetAdsPointDto
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public ICollection<AdsPointImage>? Images { get; set; }
    }
}
