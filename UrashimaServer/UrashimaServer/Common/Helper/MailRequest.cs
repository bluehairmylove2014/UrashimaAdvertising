namespace UrashimaServer.Common.Helper
{
    public class MailRequest
    {
        public string ToEmail { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string ResourcePath { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Otp { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
}
