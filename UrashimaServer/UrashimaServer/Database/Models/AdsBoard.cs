using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Models
{
    public class AdsBoard
    {
        [Key]
        public int Id { get; set; }
        [Key]
        public int AdsPointId { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Size { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }
}
