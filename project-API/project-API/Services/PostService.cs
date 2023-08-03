using project_API.Entities;

namespace project_API.Services
{
    interface IPostService
    {
    }
    public class PostService:IPostService
    {
        private readonly dataBase _dbcontext;
        public PostService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }

    }
}
