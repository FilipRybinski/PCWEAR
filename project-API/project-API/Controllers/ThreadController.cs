using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using project_API.Settings;
using System.Net;
using System.Net.Mime;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/threads")]
    [ApiController]
    [ProducesResponseType(typeof(BadRequestExample), 400)]
    [ProducesResponseType(typeof(InternalServerExample), 500)]
    [ProducesResponseType(typeof(NotFoundExample), 404)]
    public class ThreadController : ControllerBase
    {
        private readonly IThreadService _threadService;
        public ThreadController(IThreadService threadService)
        {
            _threadService = threadService;
        }
        [Authorize]
        [HttpPost("addThread")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult<Boolean>> addThread([FromBody] ThreadPostNewDto thread)
        {
            var result=await _threadService.postThread(thread,Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok(result);
        }
        [HttpGet("getThreads")]
        public async Task<ActionResult<List<ThreadDto>>> getThreads([FromQuery] string? category, [FromQuery] string? title, [FromQuery] string? description, [FromQuery] int page, [FromQuery]int pageSize)
        {
            var filter = new FilterThreadcs();
            if (!string.IsNullOrEmpty(category))
            {
                if (category.Contains(','))
                {
                    filter.byCategoryName = category.Split(',').ToList();
                }
                else
                {
                    filter.byCategoryName = new List<string>
                    {
                        category
                    };
                }
            }
            if (!string.IsNullOrEmpty(title))
            {
                filter.byTitle = title;
            }
            if (!string.IsNullOrEmpty(description))
            {
                filter.byDescription = description;
            }
            filter.page = page;
            filter.pageSize = pageSize;
            var result = await _threadService.getAllThreads(filter);

            return Ok(result);
        }
        [HttpGet("getThread/{id}")]
        public async Task<ActionResult<ThreadDto>> getThread([FromRoute]int id)
        {
            var userRole = HttpContext.User.FindFirstValue(ClaimTypes.Role);
            var result=await _threadService.getThread(id,userRole);
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("getAllNotAcceptedThreads")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult<List<ThreadDto>>> getAllNotAcceptedThreads()
        {
            var result= await _threadService.getAllNotAcceptedThreads();
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("getArchive")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult<List<ArchiveDto>>> getArchive()
        {
            var result = await _threadService.getArchive();
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("acceptThreads")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult<Boolean>> acceptThreads([FromBody] List<int> body )
        {
            var result=await _threadService.acceptThreads(body);
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("changeStateArchive")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult<Boolean>> changeStateArchive([FromBody] List<ArchiveChangeState> body)
        {
            var result = await _threadService.changeStateArchive(body);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("addReaction")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult<ThreadLikesDto>> addReaction([FromBody] ThreadReactionDto body)
        {
            var result=await _threadService.postReaction(body, Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok(result);
        }
        [HttpGet("updateViews/{id}")]
        public async Task<ActionResult<Boolean>> updateViews([FromRoute] int id)
        {
            var result=await _threadService.updateThreadViews(id);
            return Ok(result);
        }
    }
}
