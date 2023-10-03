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
            loadTemplatesData();
        }
        public async Task<EmailTemplate> getTemplateByName(string name)
        {
            var result = templates.FirstOrDefault(t => t.Name == name);
            if (result is null)
            {
                throw new CustomException("No template of this name found");
            }
            await Task.Run(() =>
            {
                HtmlDocument template = new HtmlDocument();
                var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), _settings.DirectoryPath);
                var filePath=Path.Combine(directoryPath, result.Body);
                if (File.Exists(filePath))
                {
                    template.Load(Path.Combine(Directory.GetCurrentDirectory(), filePath));
                 if (template is null)
                    {
                        throw new CustomException("Failed to load template");
                    }
                    template.GetElementbyId("toReplace").SetAttributeValue("href", "http://localhost:4200/forum/thread?id=4&title=dadasda");
                    result.Body = template.DocumentNode.OuterHtml;
                }
            });
            return result;
        }
        public ICollection<EmailTemplate> loadTemplatesData()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), _settings.Path);
            if (File.Exists(path))
            {
                var data = File.ReadAllText(path);
                return JsonConvert.DeserializeObject<List<EmailTemplate>>(data);
            }
            return new List<EmailTemplate>();
        }
    }
}
