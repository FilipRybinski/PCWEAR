namespace project_API.Models
{
    public class MemoryDto
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
        public int speed { get; set; }
        public int modulesLower { get; set; }
        public int modulesUpper { get; set; }
        public string color { get; set; }
        public int cl { get; set; }
    }
    public class MemoryReturnDto : MemoryDto
    {
        public double rating { get; set; }
        public int commentsCount { get; set; }
    }
}
