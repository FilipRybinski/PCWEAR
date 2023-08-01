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
using System.Text.Json;
using System.Text.Json.Serialization;

namespace project_API.Services
{
    public interface IAccountService
    {
        public Task RegisterUser(userRegisterDto dto);
        public Task<string> GenerateJwt(loginDto dto);
        public Task DeleteUser(int id);
    }
    public class accountService : IAccountService
    {
        private readonly dataBase _dbcontext;
        private readonly IPasswordHasher<user> _passwordHasher;
        private readonly authenticationSettings _authenticationSettings;
        public accountService(dataBase dbcontext, IPasswordHasher<user> passwordHasher,authenticationSettings authenticationSettings)
        {
            _authenticationSettings = authenticationSettings;
            _dbcontext = dbcontext;
            _passwordHasher = passwordHasher;
        }
        public async Task RegisterUser(userRegisterDto dto)
        {
            var eamilTaken =await  _dbcontext.Users.FirstOrDefaultAsync(u => u.email == dto.email);
            var newUser = new user()
            {
                email = dto.email,
                userName = dto.userName,
                roleId = dto.roleId,
                personalData = dto.PersonalData,
                postalDetails = dto.postalDetails,
            };
            var hashedPassword= _passwordHasher.HashPassword(newUser, dto.userPassword);
            newUser.userPassword = hashedPassword;
            await _dbcontext.Users.AddAsync(newUser);
            await _dbcontext.SaveChangesAsync();
            await Task.CompletedTask;
        }   
        public async Task<string> GenerateJwt(loginDto dto)
        {
            var user=await _dbcontext.Users
                .Include(u=>u.personalData)
                .Include(u=>u.role)
                .FirstOrDefaultAsync(u=>u.email== dto.email);
            if (user is null)
            {
                throw new verificationException();
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.userPassword, dto.password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new verificationException();
            }
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,$"{user.personalData.name} {user.personalData.surname}"),
                new Claim(ClaimTypes.Role,$"{user.role.name}"),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);
            var tokenHandler=new JwtSecurityTokenHandler();
            var resultToken = tokenHandler.WriteToken(token);
            return await Task.FromResult(resultToken);
        }
        public async Task DeleteUser(int id)
        {
            var user=await _dbcontext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if(user is null)
            {
                throw new notFoundException("User not found");
            }
            _dbcontext.Users.Remove(user);
            await _dbcontext.SaveChangesAsync();
        }
    }
}
