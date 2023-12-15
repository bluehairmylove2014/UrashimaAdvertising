using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Models
{
    public class PointModify
    {
        [Key]
        public int Id { get; set; }
        public int PointId { get; set; }
        public bool Planned { get; set; }
        public string AdsForm { get; set; }
        public string LocationType { get; set; }
        public string Address { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public DateTime ModifyTime { get; set; }
        public string Reason { get; set; }
    }
}
