using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UrashimaServer.Database.Models
{
    public class BoardModify
    {
        [Key]
        public int Id { get; set; }
        public int AdsBoardId { get; set; }
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Width { get; set; }
        public int Height { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }

        public PointModify? AdsPoint { get; set; }
    }
}
