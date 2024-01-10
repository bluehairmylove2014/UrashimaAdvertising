using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Database.Dtos
{
    public class ReportAdsBoardDto
    {
        [Required]
        public int AdsPointId { get; set; }
        public int AdsBoardId { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public ICollection<ReportImageDto>? Images { get; set; }
    }

    public class ReportImageDto
    {
        [ImageCheck]
        public string Image { get; set; } = string.Empty;
    }

    public class PostReportLocationDto
    {
        [Range(-90, 90)]
        public double Latitude { get; set; }
        [Range(-180, 180)]
        public double Longitude { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public ICollection<ReportImageDto>? Images { get; set; }
    }

    public class GetReportDto
    {
        [Required]
        public int Id { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public bool ReportStatus { get; set; } = false;
        public string TreatmentProcess { get; set; } = string.Empty;
        public DateTime SubmissionDate { get; set; }
        public ICollection<ReportImageDto>? Images { get; set; }
    }

    public class PostReportDto
    {
        [Required]
        public int AdsId { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public ICollection<ReportImageDto>? Images { get; set; }
    }

    public class PostReportBoardDto
    {
        [Required]
        public int AdsPointID { get; set; }
        [Required]
        public int AdsBoardID { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public ICollection<ReportImageDto>? Images { get; set; }
    }

    public class GetReportDetailDto
    {
        [Required]
        public int Id { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public bool ReportStatus { get; set; } = false;
        public string TreatmentProcess { get; set; } = string.Empty;
        public DateTime SubmissionDate { get; set; }
        public ICollection<ReportImageDto>? Images { get; set; }
        public AdsBoardBasicDto? AdsBoard { get; set; }
        public UserAdsPointBasicDto? AdsPoint { get; set; }
        public LocationBasicDto? Location { get; set; }

    }
}
