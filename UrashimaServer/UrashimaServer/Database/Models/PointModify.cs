using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using UrashimaServer.Models;

namespace UrashimaServer.Database.Models
{
    public class PointModify
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public DateTime ModifyTime { get; set; }
        public string Reason { get; set; } = string.Empty;
        public ICollection<PointModifyImage>? Images { get; set; }
        public ICollection<BoardModify>? AdsBoard { get; set; }
    }

    public class PointModifyImage
    {
        [Key]
        public string Image { get; set; } = string.Empty;
        public int AdsPointId { get; set; }
        public PointModify? AdsPoint { set; get; }
    }
}
