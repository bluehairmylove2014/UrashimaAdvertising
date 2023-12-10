using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Models
{
    public class BoardModify
    {
        [Key]
        public int Id { get; set; }
        public int BoardId { get; set; }
        public int PointId { get; set; }
        public string AdsType { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Image {  get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}
