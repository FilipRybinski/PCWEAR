﻿using Microsoft.AspNetCore.Authorization;
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
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
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
        public async Task<ActionResult> addPost([FromBody] PostDto body, [FromRoute]int threadId)
        {
            var userId = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = await _postService.addPost(body, userId, threadId);
            return Ok(result);
        }
    }
}