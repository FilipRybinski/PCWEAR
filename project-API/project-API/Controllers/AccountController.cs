﻿using Google.Protobuf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using project_API.Entities;
using project_API.Models;
using project_API.Services;

namespace project_API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class accountController : ControllerBase
    {
        private  readonly IAccountService _accountService;
        public accountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] userRegisterDto dto)
        {
            await _accountService.RegisterUser(dto);
            return Ok();
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] loginDto dto)
        {
            var token= await _accountService.GenerateJwt(dto);
            HttpContext.Response.Cookies.Append("token", token,
                new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(1),
                    HttpOnly = true,
                    Secure = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.None
                });
            return Ok();
        }
        [Authorize(Roles ="Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            await _accountService.DeleteUser(id);
            return NoContent();
        }
    }
}
