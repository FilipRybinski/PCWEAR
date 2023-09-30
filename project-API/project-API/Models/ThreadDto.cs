using project_API.Entities;

namespace project_API.Models
{
    public class ThreadDto
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string createDate { get; set; }
        public int posts { get; set; }
        public string user { get; set; }
        public int likes { get; set; }
        public int dislikes { get; set; }
        public  int currentLike { get; set; }
        public int views { get; set; }
        public string pathUserImage { get; set; }
        public ICollection<CategoryDto> categories { get; set; }
    }
}
