using project_API.Entities;

namespace project_API.Models
{
    public class userRegisterDto
    {
        public string userName { get; set; }
        public string userPassword { get; set; }
        public string email { get; set; }
        public PrivateDetailDto PersonalData { get; set; }
    }
}
