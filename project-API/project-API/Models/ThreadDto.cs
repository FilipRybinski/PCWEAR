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
    }
}
