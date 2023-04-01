using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using project_API.Entities;
using project_API.Services;

namespace project_API.Controllers
{
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly DataBase _dbcontext;
        private readonly IPasswordService _passwordService;
        public UserController(DataBase dbcontext, IPasswordService passwordService)
        {
            _passwordService = passwordService;
            _dbcontext = dbcontext;
        }
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAllUser()
        {
            var users = _dbcontext.Users.ToList();
            return Ok(users);
        }
        [HttpPost]
        public ActionResult CreateUser([FromBody] User user)
        {
            if (_dbcontext.Users.FirstOrDefault(e => e.Email== user.Email) is null)
            {
                user.UserPassword = _passwordService.GetHashedPassword(user.UserPassword);
                _dbcontext.Users.Add(user);
                _dbcontext.SaveChanges();
                return Created("/api/user/{user.id}", null);
            }
            return BadRequest("User with this email already exists");
           

        }
        [HttpDelete("{id}")]
        public ActionResult DeleteUser([FromRoute] int id)
        {
            var user = _dbcontext.Users.FirstOrDefault(e => e.Id == id);
            if (user is null)
            {
                return BadRequest();
            }
            _dbcontext.Remove(user);
            _dbcontext.SaveChanges();
            return Ok();
        }

    }
}
