using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Utils;
using UrashimaServer.Models;

namespace UrashimaServer.Common.Helper
{
    public class EmailSettings
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public string DisplayName { get; set; }
        public int Port { get; set; }
    }

    public interface IEmailService
    {
        Task SendOtpEmailAsync(MailRequest mailRequest);
        Task SendReportEmailAsync(MailRequest mailRequest);
    }

    public class EmailService : IEmailService
    {
        private readonly EmailSettings emailSettings;

        public EmailService(IOptions<EmailSettings> options)
        {
            this.emailSettings = options.Value;
        }

        public async Task SendOtpEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailSettings.Email);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();

            var htmlContent = System.IO.File.ReadAllText(Path.Combine(mailRequest.ResourcePath, "index.html"));
            htmlContent = htmlContent.Replace("EmailNameToReplace", $"{mailRequest.Name}");
            htmlContent = htmlContent.Replace("MyPasswordToReplace", $"{mailRequest.Otp}");

            builder.HtmlBody = htmlContent;

            var image = builder.LinkedResources.Add(Path.Combine(mailRequest.ResourcePath, "images", "image-5.png"));
            image.ContentId = MimeUtils.GenerateMessageId();
            builder.HtmlBody = builder.HtmlBody.Replace("{{IMAGE_CID}}", image.ContentId);


            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.Host, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(emailSettings.Email, emailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendReportEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailSettings.Email);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();

            var htmlContent = System.IO.File.ReadAllText(Path.Combine(mailRequest.ResourcePath, "index_report.html"));
            htmlContent = htmlContent.Replace("Guest_Name_To_Replace", $"{mailRequest.Name}");

            var statusString = mailRequest.Status ? "Đã xử lý" : "Chưa xử lý";
            htmlContent = htmlContent.Replace("Report_Status_To_Replace", $"{statusString}");

            htmlContent = htmlContent.Replace("Treatment_Process_To_Replace", $"{mailRequest.TreatmentProcess}");

            builder.HtmlBody = htmlContent;

            var imgList = new List<string>() {
                "image-1.png", "image-2.gif", "image-3.png"
            };

            foreach (var imgName in imgList)
            {
                var image = builder.LinkedResources.Add(Path.Combine(mailRequest.ResourcePath, "images_report", imgName));
                image.ContentId = MimeUtils.GenerateMessageId();
                builder.HtmlBody = builder.HtmlBody.Replace($"{imgName}", image.ContentId);
            }

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.Host, emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(emailSettings.Email, emailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
