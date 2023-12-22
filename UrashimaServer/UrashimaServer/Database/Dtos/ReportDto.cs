using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Database.Dtos
{
    public class ReportAdsBoardDto
    {
        public int AdsPointId { get; set; }
        public int AdsBoardId { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public ICollection<ReportImageDto>? Images { get; set; }
    }

    public class ReportImageDto
    {
        public string Image { get; set; } = string.Empty;
    }

    public class PostReportLocationDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public ICollection<ReportImageDto>? Images { get; set; }
    }

    public class GetReportDto
    {
        public int Id { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
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
        public int AdsId { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public ICollection<ReportImageDto>? Images { get; set; }
    }
}
