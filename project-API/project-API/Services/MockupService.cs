using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using project_API.Exceptions;
using project_API.Models;
using project_API.Settings;
using HtmlAgilityPack;

namespace project_API
{
    public interface IMockupTemplate
    {
        public Task<EmailTemplate> getTemplateByName(string name);
    }
    public class MockupService : IMockupTemplate
    {
        private readonly MockupSettings _settings;
        private List<EmailTemplate> templates;
        public MockupService(IOptions<MockupSettings> options) {
            _settings = options.Value;
            try
            {
                templates = JsonConvert.DeserializeObject<List<EmailTemplate>>(File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(),_settings.Path)));
            }
            catch
            {
                throw new CustomException("Templates not found");
            }
        }
        public async Task<EmailTemplate> getTemplateByName(string name)
        {
            try
            {
                var result = templates.FirstOrDefault(t => t.Name == name);
                if (result is null)
                {
                    throw new CustomException("No template of this name found");
                }
                await Task.Run(() =>
                {
                    HtmlDocument template = new HtmlDocument();
                    template.Load(Path.Combine(Directory.GetCurrentDirectory(), result.Body));
                    if (template is not null)
                    {
                        template.GetElementbyId("toReplace").SetAttributeValue("href", "http://localhost:4200/forum/thread?id=4&title=dadasda");
                        result.Body = template.DocumentNode.OuterHtml;
                    }
                });
                return result;
            }
            catch
            {
                throw new CustomException("Sending notification failed ");
            }
        }
    }
}
