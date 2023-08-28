using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Models;

namespace project_API.Services
{
    public interface IThreadCategoryService
    {
        public Task addCategory(CategoryDto body);
        public Task<ICollection<Category>> getCategory();
    }
    public class ThreadCategoryService : IThreadCategoryService
    {
        private readonly dataBase _dbcontext;
        public ThreadCategoryService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task addCategory(CategoryDto body)
        {
            var category = new Category()
            {
                Name=body.Name,
                bgColor=body.bgColor,
                color=body.color,
            };
            await _dbcontext.Categories.AddAsync(category);
            await _dbcontext.SaveChangesAsync();
        }
        public async Task<ICollection<Category>> getCategory()
        {
            var categories = await _dbcontext.Categories.ToListAsync();
            return categories;
        }
    }
}
