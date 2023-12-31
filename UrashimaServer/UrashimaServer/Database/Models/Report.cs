﻿using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;

namespace UrashimaServer.Models
{
    public class Report
    {
        [Key]
        public int Id { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public bool ReportStatus { get; set; } = false;
        public string TreatmentProcess { get; set; } = string.Empty;
        public DateTime SubmissionDate { get; set; } = DateTime.Now;
        public ICollection<ReportImage>? Images { get; set; }

        public int? AdsBoardId { get; set; }
        public AdsBoard? AdsBoard { get; set; }

        public int? AdsPointId { get; set; }
        public AdsPoint? AdsPoint { get; set; }

        public int? LocationId { get; set; }
        public Location? Location { get; set; }
    }
}
