using project_API.Entities;

namespace project_API.Models
{
    public class userRegisterDto
    {
        public string userName { get; set; }
        public string userPassword { get; set; }
        public string userPasswordConfirmed { get; set; }
        public string email { get; set; }
        public int roleId { get; set; } = 1;
        public PostalDetailsDto postalDetails { get; set; }
        public PersonalDataDto PersonalData { get; set; }
    }
}
