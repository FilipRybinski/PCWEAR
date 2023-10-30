namespace project_API.Models
{
    public class CommentDto
    {
        public string user { get; set; }
        public string pathUserImage { get; set; }
        public int roleId { get; set; }
        public string comment { get; set; }
        public int rating { get; set; }
    }
}
