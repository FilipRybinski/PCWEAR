using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using project_API.Settings;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(typeof(BadRequestExample), 400)]
    [ProducesResponseType(typeof(InternalServerExample), 500)]
    [ProducesResponseType(typeof(NotFoundExample), 404)]
    public class RecommendedController : ControllerBase
    {
        private readonly IRecommendedService _recommendedService;
        public  RecommendedController(IRecommendedService recommendedService)
        {
            _recommendedService = recommendedService;
        }
        [Authorize(Roles = "Admin,Moderator")]
        [HttpPost("addRecommended")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult> addNewComputerSet([FromBody] List<int> body)
        {   
           await _recommendedService.addSet(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)),body);
            return Ok();
        }
        [HttpGet("getRecommended")]
        public async Task<ActionResult> getSets()
        {
            var result = await _recommendedService.getSets();
            return Ok(result);
        }
    }
}

