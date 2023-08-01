using Microsoft.AspNetCore.Identity;
using project_API.Entities;
using project_API.Models;

namespace project_API.Services
{
    public interface ITopicsServices
    {
       
    }
    public class topicsServicecs :ITopicsServices
    {
        private readonly dataBase _dbcontext;
        public topicsServicecs(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
    }
}
