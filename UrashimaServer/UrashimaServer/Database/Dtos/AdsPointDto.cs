using System.ComponentModel.DataAnnotations;
using UrashimaServer.Models;
using UrashimaServer.Utility;

namespace UrashimaServer.Database.Dtos
{
    public class UserAdsPointBasicDto
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
        public bool IsEmpty { get; set; }
    }

    public class PointImageDto
    {
        [ImageCheck]
        public string Image { get; set; } = string.Empty;
    }

    public class GetPointAdsBoardDto
    {
        [Required]
        public int Id { get; set; }
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

    public class PostAdsPointDto
    {
        [Key]
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
    }

    public class UserAdsPointDetailDto
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
        public ICollection<PointImageDto>? Images { get; set; }
        public ICollection<GetPointAdsBoardDto>? AdsBoard { get; set; }
    }

    public class HQPostAdsPointDto
    {
        public int Id { get; set; }
        [Range(-90, 90)]
        public double Latitude { get; set; }
        [Range(-180, 180)]
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public ICollection<PointImageDto>? Images { get; set; }
        public ICollection<HQPostPointAdsBoardDto>? AdsBoard { get; set; }
    }

    public class HQPostPointAdsBoardDto
    {
        public string AdsType { get; set; } = string.Empty;
        [Range(1, int.MaxValue)]
        public int Width { get; set; }
        [Range(1, int.MaxValue)]
        public int Height { get; set; }
        [ImageCheck]
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }
}
