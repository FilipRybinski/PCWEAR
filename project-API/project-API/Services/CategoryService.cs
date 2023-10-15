using Microsoft.EntityFrameworkCore;
using project_API.Entities;
using project_API.Exceptions;
using project_API.Models;

namespace project_API.Services
{
    public interface ICategoryService
    {
        public Task addCategory(CategoryDto body);
        public Task<ICollection<Category>> getCategory();
    }
    public class CategoryService : ICategoryService
    {
        private readonly dataBase _dbcontext;
        public CategoryService(dataBase dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task addCategory(CategoryDto body)
        {
            if(await _dbcontext.Categories.AnyAsync(c=>c.Name==body.Name))
            {
                throw new BadRequestException("Category with this name already exists");
            }
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
