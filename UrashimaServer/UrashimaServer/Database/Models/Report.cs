namespace UrashimaServer.Models
{
    public class Report
    {
        public int Id { get; set; }
        public string ReportType { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ReportStatus { get; set; } = string.Empty;
        public string TreatmentProcess { get; set; } = string.Empty;
    }
}
