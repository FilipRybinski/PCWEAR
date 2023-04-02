using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using project_API.Entities;
using project_API.Exceptions;
using project_API.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace project_API.Services
{
    public interface IAccountService
    {
        public void RegisterUser(UserRegisterDto dto);
        public string GenerateJwt(LoginDto dto);
        public void DeleteUser(int id);
    }
    public class AccountService : IAccountService
    {
        private readonly DataBase _dbcontext;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        public AccountService(DataBase dbcontext, IPasswordHasher<User> passwordHasher,AuthenticationSettings authenticationSettings)
        {
            _authenticationSettings = authenticationSettings;
            _dbcontext = dbcontext;
            _passwordHasher = passwordHasher;
        }
        public void RegisterUser(UserRegisterDto dto)
        {
            var newUser = new User()
            {
                Email = dto.Email,
                UserName = dto.UserName,
                RoleId = dto.RoleId,
                PersonalData = dto.PersonalData,
                PostalDetails = dto.PostalDetails,
            };
            var hashedPassword= _passwordHasher.HashPassword(newUser, dto.UserPassword);
            newUser.UserPassword = hashedPassword;
            _dbcontext.Users.Add(newUser);
            _dbcontext.SaveChanges();
        }   
        public string GenerateJwt(LoginDto dto)
        {
            var user=_dbcontext.Users
                .Include(u=>u.PersonalData)
                .Include(u=>u.Role)
                .FirstOrDefault(u=>u.Email== dto.Email);
            if(user is null)
            {
                throw new NotFoundException("User not found");
            }
            var result=_passwordHasher.VerifyHashedPassword(user, user.UserPassword, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new VerificationPasswordException("Password verification failed");
            }
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,$"{user.PersonalData.Name} {user.PersonalData.Surname}"),
                new Claim(ClaimTypes.Role,$"{user.Role.Name}"),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);
            var tokenHandler=new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
        public void DeleteUser(int id)
        {
            var user= _dbcontext.Users.FirstOrDefault(u => u.Id == id);
            if(user is null)
            {
                throw new NotFoundException("User not found");
            }
            _dbcontext.Users.Remove(user);
            _dbcontext.SaveChanges();
        }
    }
}
