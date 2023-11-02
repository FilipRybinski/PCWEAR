using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendedController : ControllerBase
    {
        private readonly IRecommendedService _recommendedService;
        public  RecommendedController(IRecommendedService recommendedService)
        {
            _recommendedService = recommendedService;
        }
        [Authorize(Roles = "Admin,Moderator")]
        [HttpPost("addRecommended")]
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

