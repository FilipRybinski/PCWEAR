using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssessmentController : ControllerBase
    {
        private readonly IAssessmentService _assessmentService;
        public AssessmentController(IAssessmentService assessmentService)
        {
            _assessmentService = assessmentService;
        }
        [Authorize]
        [HttpPost("addAssessment")]
        public async Task<IActionResult> addAssessment([FromBody] AssessmentDto body)
        {
            await _assessmentService.addAssessment(body, Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok();
        }
        [Authorize]
        [HttpGet("checkAssessment/{id}")]
        public async Task<IActionResult> checkAssessment([FromRoute] int id)
        {
            var result = await _assessmentService.checkAssessment(id, Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok(result);
        }
        [Authorize]
        [HttpPut("modifyAssessment")]
        public async Task<IActionResult> modifyAssessment([FromBody] AssessmentDto body)
        {
            await _assessmentService.modifyAssessment(body, Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok();
        }
        [HttpGet("getAssessments/{id}")]
        public async Task<IActionResult> getAssessnebts([FromRoute] int id)
        {
            var result = await _assessmentService.getAssessments(id);
            return Ok(result);
        }
    }
}
