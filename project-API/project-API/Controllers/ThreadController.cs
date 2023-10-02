using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
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
        private readonly IEmailService _emailService;
        public ThreadController(IThreadService threadService, IEmailService emailService)
        {
            _threadService = threadService;
            _emailService = emailService;
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
        [HttpGet("updateViews/{id}")]
        public async Task updateViews([FromRoute] int id)
        {
            await _threadService.updateThreadViews(id);
        }
        [HttpGet("filterThreads")]
        public async Task<ActionResult> filteredThreads([FromQuery] string? category, [FromQuery] string? title, [FromQuery] string? description)
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
            if (!string.IsNullOrEmpty(description)){
                filter.byDescription = description;
            }
            var result = await _threadService.filteredThreads(filter);

            return Ok(result);
        }
        [HttpPost("emailTest")]
        public async Task<ActionResult> test([FromQuery] string email)
        {
            var result =await _emailService.NotificationOfNewPost(email);
            return Ok();
        }

    }
}
