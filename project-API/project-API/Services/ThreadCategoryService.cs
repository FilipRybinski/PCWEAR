using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Models;

namespace project_API.Services
{
    public interface IThreadCategoryService
    {
        public Task addCategory(ThreadCategoryDto body);
        public Task<ICollection<ThreadCategory>> getCategory();
    }
    public class ThreadCategoryService : IThreadCategoryService
    {
        private readonly dataBase _dbcontext;
        public ThreadCategoryService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task addCategory(ThreadCategoryDto body)
        {
            var category = new ThreadCategory()
            {
                Name=body.name,
                bgColor=body.bgColor,
                color=body.color,
            };
            await _dbcontext.ThreadCategories.AddAsync(category);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<ICollection<ThreadCategory>> getCategory()
        {
            var categories = await _dbcontext.ThreadCategories.ToListAsync();
            return categories;
        }
    }
}
