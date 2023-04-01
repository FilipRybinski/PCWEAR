using BCrypt.Net;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Org.BouncyCastle.Crypto.Generators;
using System.Security.Cryptography;

namespace project_API.Services
{
    public interface IPasswordService
    {
        public string GetHashedPassword(string password);
        public bool VerifyHashedPassword(string password,string hashedPassword);

    }
    public class PasswordService:IPasswordService
    {
        public string GetHashedPassword(string password)
        {
            var hashed = BCrypt.Net.BCrypt.HashPassword(password);
            return hashed;
        }
        public bool VerifyHashedPassword(string password,string hashedPassword)
        {
            var result = BCrypt.Net.BCrypt.Verify(password, hashedPassword);
            return result;
        }
    }
}
