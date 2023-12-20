using UrashimaServer.Database.Models;

namespace UrashimaServer.Database.Dtos
{
    public class PointModifyDto
    {
        public int Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public DateTime ModifyTime { get; set; }
        public string Reason { get; set; } = string.Empty;
        public ICollection<PointModifyImageDto>? Images { get; set; }
        public ICollection<BoardModifyDto>? AdsBoard { get; set; }
    }

    public class BoardModifyDto
    {
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Width { get; set; }
        public int Height { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }

    public class PointModifyImageDto
    {
        public string Image { get; set; } = string.Empty;
    }
}
