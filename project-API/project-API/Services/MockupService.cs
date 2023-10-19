using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using project_API.Exceptions;
using project_API.Models;
using project_API.Settings;
using HtmlAgilityPack;
using Thread = project_API.Entities.Thread;
using System.Text.Encodings.Web;
using project_API.Entities;

namespace project_API
{
    public interface IMockupTemplate
    {
        public EmailTemplate getTemplateByName(string name, string query);
    }
    public class MockupService : IMockupTemplate
    {
        private readonly MockupSettings _settings;
        private List<EmailTemplate> templates;
        public MockupService(IOptions<MockupSettings> options) {
            _settings = options.Value;
            loadTemplatesData();
        }
        public EmailTemplate getTemplateByName(string name,string query)
        {
            var result = templates.FirstOrDefault(t => t.Name == name);
            if (result is null)
            {
                throw new BadRequestException("No template of this name was found");
            }
            HtmlDocument template = new HtmlDocument();
            var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), _settings.DirectoryPath);
            var filePath=Path.Combine(directoryPath, result.Name)+".html";
            if (File.Exists(filePath))
            {
                template.Load(Path.Combine(Directory.GetCurrentDirectory(), filePath));
                if (template is null)
                {
                    throw new InternalServerException("Reading template");
                }
                template.GetElementbyId("heading").InnerHtml = result.heading;
                template.GetElementbyId("toReplace").SetAttributeValue("href",result.url+ query);
                result.Body = template.DocumentNode.OuterHtml;
                return result;
            }
            else
            {
                throw new InternalServerException("Reading templates");
            }
        }
        private async Task loadTemplatesData()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), _settings.Path);
            if (File.Exists(path))
            {
                var data = await Task.Run(() => {
                    return File.ReadAllText(path);
                    });
                templates = JsonConvert.DeserializeObject<List<EmailTemplate>>(data);
            }
        }
    }
}
