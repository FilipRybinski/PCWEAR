using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;

namespace project_API.Controllers
{
    [Route("api/topics")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly ITopicsServices _topicsServices;
        public TopicsController(ITopicsServices topicsServices)
        {
            _topicsServices = topicsServices;
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

        [Authorize(Roles = "User")]
        [HttpPost("addTopic")]
        public async Task<ActionResult> Register([FromBody] userRegisterDto dto)
        {
            return Ok();
        }
        [Authorize(Roles = "User")]
        [HttpDelete("removeTopic/{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            return NoContent();
        }
    }
}
