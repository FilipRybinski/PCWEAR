﻿using Google.Protobuf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using project_API.Entities;
using project_API.Models;
using project_API.Services;
using System.Diagnostics.Tracing;
using System.Security.Claims;

namespace project_API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class accountController : ControllerBase
    {
        private  readonly IAccountService _accountService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public accountController(IAccountService accountService, IWebHostEnvironment webHostEnvironment)
        {
            _accountService = accountService;
            _webHostEnvironment = webHostEnvironment;
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
        [HttpGet("logout")]
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
        [HttpPost("userIcon")]
        public async Task<ActionResult> uploadIcon()
        {
            int id = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            try
            {
                var file = Request.Form.Files[0];
                string path = _webHostEnvironment.WebRootPath + "\\usersIcons\\";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                var userPath = path+ $"\\{id}\\";
                if (!Directory.Exists(userPath))
                {
                    Directory.CreateDirectory(userPath);
                }
                var type = file.FileName.Substring(file.FileName.Length-4);
                var finalPath = userPath;
                if (System.IO.Directory.GetFiles(finalPath).Length!=0)
                {
                    new List<string>(System.IO.Directory.GetFiles(finalPath)).ForEach(file =>
                    {
                        System.IO.File.Delete(file);
                    });
                }
                using (FileStream fileStrea = System.IO.File.Create(finalPath+"image"+type))
                {
                    file.CopyTo(fileStrea);
                    fileStrea.Flush();
                }
                await _accountService.replaceImageUrl(id,type);
            }catch (Exception ex)
            {
                throw ex;
            }
            return Ok();
        }
    }
}
