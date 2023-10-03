using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using project_API.Settings;
using project_API.SwaggerExamples.Responses;
using Swashbuckle.AspNetCore.Filters;
using System.Net;
using System.Net.Mime;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/threads")]
    [ApiController]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(ErrorBadRequestExample), 400)]
    [ProducesResponseType(typeof(ErrorInternalServerExample), 500)]
    [ProducesResponseType(typeof(ErrorThreadNotFoundExample), 404)]
    public class ThreadController : ControllerBase
    {
        private readonly IThreadService _threadService;
        public ThreadController(IThreadService threadService)
        {
            _threadService = threadService;
        }
        [Authorize]
        [HttpPost("addThread")]
        [ProducesResponseType(typeof(ErrorUnauthorizeExample), 401)]
        public async Task<ActionResult> addThread([FromBody] ThreadPostNewDto thread)
        {
            await _threadService.postThread(thread,Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return NotFound();
        }
        [HttpGet("getThreads")]
        public async Task<ActionResult<ICollection<ThreadDto>>> getThreads([FromQuery] string? category, [FromQuery] string? title, [FromQuery] string? description)
        {
            var filter = new FilterThreadcs();
            if (!string.IsNullOrEmpty(category))
            {
                filter.byCategoryName = category;
            }
            if (!string.IsNullOrEmpty(title))
            {
                filter.byTitle = title;
            }
            if (!string.IsNullOrEmpty(description))
            {
                filter.byDescription = description;
            }
            var result = await _threadService.getAllThreads(filter);

            return Ok(result);
        }
        [Authorize]
        [HttpPost("addReaction")]
        public async Task<ActionResult> addReaction([FromBody] ThreadReactionDto body)
        {
            var result=await _threadService.postReaction(body, Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok(result);
        }
        [HttpGet("updateViews/{id}")]
        public async Task updateViews([FromRoute] int id)
        {
            await _threadService.updateThreadViews(id);
        }
    }
}
