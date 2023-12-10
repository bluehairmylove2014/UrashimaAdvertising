using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UrashimaServer.Models
{
    public class AdsPointImage
    {
        [Key]
        public string Image { get; set; } = string.Empty;
        public int AdsPointId { get; set; }
        public AdsPoint? AdsPoint { set; get; }
    }

    public class ReportImage
    {
        [Key]
        public string Image { get; set; } = string.Empty;
        public int ReportId { get; set; }
        public Report? Report { set; get; }
    }
}
