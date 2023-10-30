using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using project_API.Settings;
using System.Net.Mime;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/posts")]
    [ApiController]
    [ProducesResponseType(typeof(BadRequestExample), 400)]
    [ProducesResponseType(typeof(InternalServerExample), 500)]
    [ProducesResponseType(typeof(NotFoundExample), 404)]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService) {
            _postService = postService;
        }
        [Authorize]
        [HttpPost("addPost/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult> addPost([FromBody] PostDto body, [FromRoute]int id)
        {
            var userId = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = await _postService.addPost(body, userId, id);
            return Ok(result);
        }
        [HttpGet("getPosts/{threadId}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult> addPost( [FromRoute] int threadId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            var userRole = HttpContext.User.FindFirstValue(ClaimTypes.Role);
            var result = await _postService.getPosts(threadId,userRole,page,pageSize);
            return Ok(result);
        }
    }
}
