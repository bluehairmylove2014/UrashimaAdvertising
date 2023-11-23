namespace Back_end.Models
{
    public class Report
    {
        public int Id { get; set; }
        public string ReportType { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Content { get; set; }
        public string ReportStatus { get; set; }
        // Image??
    }
}
