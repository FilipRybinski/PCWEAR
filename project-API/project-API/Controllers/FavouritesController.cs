using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Services;
using project_API.Settings;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(typeof(BadRequestExample), 400)]
    [ProducesResponseType(typeof(InternalServerExample), 500)]
    [ProducesResponseType(typeof(NotFoundExample), 404)]
    public class FavouritesController : ControllerBase
    {
        private readonly IFavouritesService _favouritesService;
        public FavouritesController(IFavouritesService favouritesService)
        {
            _favouritesService = favouritesService;
        }
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        [Authorize]
        [HttpGet("manageFavourite/{id}")]
        public async Task<IActionResult> manageFavourite([FromRoute] int id)
        {
            var result = await _favouritesService.manageFavourite(id, Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok(result);
        }
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        [Authorize]
        [HttpGet("getFavourite")]
        public async Task<IActionResult> manageFavourite()
        {
            var result = await _favouritesService.getFavourites( Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok(result);
        }
    }
}
