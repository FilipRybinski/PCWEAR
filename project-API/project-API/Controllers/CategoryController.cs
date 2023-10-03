using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using project_API.SwaggerExamples.Responses;
using System.Net.Mime;

namespace project_API.Controllers
{
    [Route("api/category")]
    [ApiController]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(ErrorBadRequestExample), 400)]
    [ProducesResponseType(typeof(ErrorInternalServerExample), 500)]
    [ProducesResponseType(typeof(ErrorThreadNotFoundExample), 404)]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _threadCategoryService;
        public CategoryController(ICategoryService threadCategoryService)
        {
            _threadCategoryService = threadCategoryService;
        }
        [Authorize]
        [HttpPost("postCategory")]
        [ProducesResponseType(typeof(ErrorUnauthorizeExample), 401)]
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
