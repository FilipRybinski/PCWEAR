using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;

namespace project_API.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _threadCategoryService;
        public CategoryController(ICategoryService threadCategoryService)
        {
            _threadCategoryService = threadCategoryService;
        }
        [HttpPost("postCategory")]
        public async Task<ActionResult> addCatergory([FromBody] CategoryDto body)
        {
            await _threadCategoryService.addCategory(body);
            return Ok();
        }
        [HttpGet("getCategory")]
        public async Task<ActionResult> getCatergory()
        {
            var categories = await _threadCategoryService.getCategory();
            return Ok(categories);
        }
    }
}
