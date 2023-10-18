namespace project_API.Models
{
    public class PostWithUserDto
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public string user { get; set; }
        public string createDate { get; set; }
        public string pathUserImage { get; set; }
        public int roleId { get; set; }
    }
}
