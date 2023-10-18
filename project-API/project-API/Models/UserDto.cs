using project_API.Entities;

namespace project_API.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string pathUserImage { get; set; }
        public int roleId { get; set; }
    }
}
