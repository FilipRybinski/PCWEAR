using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;

namespace project_API.Controllers
{
    [Route("api/topics")]
    [ApiController]
    public class ThreadController : ControllerBase
    {
        private readonly IThreadService _threadService;
        public ThreadController(IThreadService threadService)
        {
            _threadService = threadService;
        }
        [Authorize(Roles = "User")]
        [HttpGet("getTopics")]
        public async Task<ActionResult> getTopics()
        {
            return Ok();
        }
        [Authorize(Roles = "User")]
        [HttpGet("getSelectedTopic")]
        public async Task<ActionResult> getSelectedTopic()
        {
            return Ok();
        }

        [Authorize()]
        [HttpPost("addTopic")]
        public async Task<ActionResult> Register([FromBody] userRegisterDto dto)
        {
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("removeTopic/{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            return NoContent();
        }
    }
}
