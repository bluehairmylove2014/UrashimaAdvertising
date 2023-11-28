using System.ComponentModel.DataAnnotations;
using UrashimaServer.Models;

namespace UrashimaServer.Database.Dtos
{
    public class UserAdsPointBasicDto
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
    }

    public class PointImageDto
    {
        public string Image { get; set; } = string.Empty;
    }

    public class GetPointAdsBoardDto
    {
        public int Id { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Size { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }

    public class UserAdsPointDetailDto
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public ICollection<PointImageDto>? Images { get; set; }
        public ICollection<GetPointAdsBoardDto>? AdsBoards { get; set; }
    }
}
