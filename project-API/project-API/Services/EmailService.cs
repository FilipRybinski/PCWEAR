using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using project_API.Models.Settings;

namespace project_API.Services
{
    public interface IEmailService
    {
        public Task NotificationOfNewPost(string email);
    }
    public class EmailService : IEmailService
    {
        public readonly EmailSettings _emailSettings;
        public EmailService(IOptions<EmailSettings> options)
        {
            _emailSettings = options.Value;
        }
        public async Task NotificationOfNewPost(string email)
        {
            var newEmail = new MimeMessage();
            newEmail.From.Add(MailboxAddress.Parse(_emailSettings.Email));
            newEmail.To.Add(MailboxAddress.Parse(email));
            newEmail.Subject = "Someone added new post to your thread";
            var builder = new BodyBuilder();
            builder.TextBody = "x";
            newEmail.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_emailSettings.Host, _emailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailSettings.Email, _emailSettings.Password);
            await smtp.SendAsync(newEmail);
            smtp.Disconnect(true);
        }
    }
}
