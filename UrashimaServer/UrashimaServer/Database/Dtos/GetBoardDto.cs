
using System.Collections;

namespace UrashimaServer.Models
{
    public class GetAdsBoardDto
    {
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Size { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }

        public GetAdsPointDto? AdsPoint { set; get; }
        public ICollection<Report>? Reports { set; get; }
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
