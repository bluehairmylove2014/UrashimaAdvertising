using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UrashimaServer.Models
{
    public class AdsBoard
    {
        [Key]
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Width { get; set; }
        public int Height { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }

        public AdsPoint? AdsPoint { set; get; }
        public ICollection<Report>? Reports { set; get; }
    }
}
