using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using project_API.Models.EmailSettings;

namespace project_API.Services
{
    public interface IEmailService
    {
        public Task NotificationOfNewPost(string email);
    }
    public class EmailService : IEmailService
    {
        public readonly EmailSettings _emailSettings;
        public readonly IMockupTemplate _mockupTemplate;
        public EmailService(IOptions<EmailSettings> options, IMockupTemplate mockupTemplate )
        {
            _emailSettings = options.Value;
            _mockupTemplate = mockupTemplate;
        }
        public async Task NotificationOfNewPost(string email)
        {
            var template = await _mockupTemplate.getTemplateByName("NewPostNotification");
            var newEmail = new MimeMessage();
            newEmail.From.Add(MailboxAddress.Parse(_emailSettings.Email));
            newEmail.To.Add(MailboxAddress.Parse(email));
            newEmail.Subject = template.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = template.Body;
            newEmail.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_emailSettings.Host, _emailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailSettings.Email, _emailSettings.Password);
            await smtp.SendAsync(newEmail);
            smtp.Disconnect(true);
        }
    }
}
