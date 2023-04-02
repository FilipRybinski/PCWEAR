using project_API.Entities;

namespace project_API.Models
{
    public class UserRegisterDto
    {
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserPasswordConfirmed { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; } = 1;
        public PostalDetails PostalDetails { get; set; }
        public PersonalData PersonalData { get; set; }
    }
}
