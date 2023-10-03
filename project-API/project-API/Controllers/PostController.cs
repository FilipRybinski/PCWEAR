using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using System.Security.Claims;

namespace project_API.Controllers
{
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService) {
            _postService = postService;
        }
        [Authorize]
        [HttpPost("addPost/{id}")]
        public async Task<ActionResult> addPost([FromBody] PostDto body, [FromRoute]int threadId)
        {
            var userId = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = await _postService.addPost(body, userId, threadId);
            return Ok(result);
        }
    }
}
