using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Entities;
using project_API.Models;
using project_API.Services;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/threads")]
    [ApiController]
    public class ThreadController : ControllerBase
    {
        private readonly IThreadService _threadService;
        public ThreadController(IThreadService threadService)
        {
            _threadService = threadService;
        }
        [Authorize]
        [HttpPost("addThread")]
        public async Task<ActionResult> addThread([FromBody] ThreadPostNewDto thread)
        {
            await _threadService.postThread(thread,Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok();
        }
        [HttpGet("getThreads")]
        public async Task<ActionResult> getThreads()
        {
            var threads=await _threadService.getAllThreads();
            return Ok(threads);
        }
        [Authorize]
        [HttpPost("addReaction")]
        public async Task<ActionResult> addReaction([FromBody] ThreadReactionDto body)
        {
            var result=await _threadService.postReaction(body, Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok(result);
        }
    }
}
