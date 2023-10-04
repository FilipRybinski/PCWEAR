using Org.BouncyCastle.Asn1.Ocsp;
using project_API.Entities;
using project_API.Exceptions;

namespace project_API.Services
{
    public interface IFileService
    {
        public Task uploadFile(IFormFile file, int id);
    }
    public class FileService : IFileService
    {
        private readonly dataBase _dbcontext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IAccountService _accountService;
        public FileService(IWebHostEnvironment webHostEnvironment, dataBase dbcontext, IAccountService accountService)
        {
            _webHostEnvironment = webHostEnvironment;
            _dbcontext = dbcontext;
            _accountService = accountService;
        }
        public async Task uploadFile(IFormFile file, int id)
        {
            try
            {
                string path = _webHostEnvironment.WebRootPath + "\\usersIcons\\";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                var userPath = path + $"\\{id}\\";
                if (!Directory.Exists(userPath))
                {
                    Directory.CreateDirectory(userPath);
                }
   /*             var type = file.FileName.Substring(file.FileName.Length - 4);*/
                var finalPath = userPath;
                if (System.IO.Directory.GetFiles(finalPath).Length != 0)
                {
                    new List<string>(System.IO.Directory.GetFiles(finalPath)).ForEach(file =>
                    {
                        System.IO.File.Delete(file);
                    });
                }
                using (FileStream fileStrea = System.IO.File.Create(finalPath + file.FileName))
                {
                    file.CopyTo(fileStrea);
                    fileStrea.Flush();
                }
                await _accountService.replaceImageUrl(id, file.FileName);
            }
            catch (Exception e)
            {
                throw new InternalServerException();
            }
        }
    }
}
