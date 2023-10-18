using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_API.Models;
using project_API.Services;
using project_API.Settings;
using System.Net.Mime;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/account")]
    [ApiController]
    [ProducesResponseType(typeof(BadRequestExample), 400)]
    [ProducesResponseType(typeof(InternalServerExample), 500)]
    [ProducesResponseType(typeof(NotFoundExample), 404)]
    public class accountController : ControllerBase
    {
        private  readonly IAccountService _accountService;
        private readonly IFileService _fileService;
        public accountController(IAccountService accountService,IFileService fileService)
        {
            _accountService = accountService;
            _fileService = fileService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] userRegisterDto dto)
        {
            await _accountService.RegisterUser(dto);
            return Ok();
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLoginDto dto)
        {
            var token= await _accountService.GenerateJwt(dto);
            var user = await _accountService.GetCurrentUserByEmail(dto.email);
            HttpContext.Response.Cookies.Append("token", token,
                new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(1),
                    HttpOnly = true,
                    Secure = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.None
                });
            return Ok(user);
        }
        [Authorize(Roles ="Admin")]
        [HttpDelete("delete/{id}")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            await _accountService.DeleteUser(id);
            return NoContent();
        }
        [HttpGet("getCurrentUser")]
        public async Task<IActionResult> getCurrentLoggedUser()
        {
            int id = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _accountService.GetCurrentUserByCredentials(id);
            return Ok(user);
        }
        [Authorize]
        [HttpGet("logout")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<IActionResult> logout()
        {
            HttpContext.Response.Cookies.Append("token", "token",
                new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(-1),
                    HttpOnly = true,
                    Secure = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.None
                });
            return Ok(null);
        }
        [Authorize]
        [HttpPost("userAvatar")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult> uploadIcon()
        {
            await _fileService.uploadFile(Request.Form.Files.First(), Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));
            return Ok();
        }
        [Authorize]
        [HttpPost("userEdit")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult> editUser([FromBody] UserEditDto dto)
        {
            var result=await _accountService.editUser(Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)),dto);
            return Ok(result);
        }
        [Authorize(Roles ="Admin")]
        [HttpGet("getUsers")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult<List<UserDto>>> getUsers()
        {
            var result = await _accountService.GetUsers();
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("updatePermission")]
        [ProducesResponseType(typeof(UnauthorizeExample), 401)]
        public async Task<ActionResult<Boolean>> updatePermission([FromBody] List<PermissionDto> permissions)
        {
            var result = await _accountService.updatePermissions(permissions);
            return Ok(result);
        }
    }
}
