using System.ComponentModel.DataAnnotations;
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

    public class ReportLocationDto
    {
        public LocationDto? Location { get; set; }
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

    public class LocationDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
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
}
