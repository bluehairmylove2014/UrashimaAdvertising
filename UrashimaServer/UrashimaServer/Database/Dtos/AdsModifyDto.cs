using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;
using UrashimaServer.Utility;

namespace UrashimaServer.Database.Dtos
{
    public class PointModifyDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int AdsPointId { get; set; }
        [Range(-90, 90)]
        public double Longitude { get; set; }
        [Range(-180, 180)]
        public double Latitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public bool IsEmpty { get; set; }
        public DateTime ModifyTime { get; set; }
        public string Reasons { get; set; } = string.Empty;
        public ICollection<PointModifyImageDto>? Images { get; set; }
        public ICollection<BoardModifyDto>? AdsBoard { get; set; }
    }

    public class BoardModifyDto
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

    public class PointModifyImageDto
    {
        [ImageCheck]
        public string Image { get; set; } = string.Empty;
    }
}
