using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;

namespace UrashimaServer.Models
{
    public class Report
    {
        [Key]
        public int Id { get; set; }
        
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ReportStatus { get; set; } = string.Empty;
        public string TreatmentProcess { get; set; } = string.Empty;
        public ICollection<ReportImage>? ReportImages { get; set; }

        public int? AdsPointId { get; set; }
        public int? AdsBoardId { get; set; }
        public AdsBoard? AdsBoard { get; set; }

        public int? ReportLocId { get; set; }
        public ReportLoc? ReportLoc { get; set; }
    }
}
