namespace project_API.Models
{
    public class HardDriveDto
    {
        public string name { get; set; }
        public string imageUrl { get; set; }
        public int capacity { get; set; }
        public string type { get; set; }
        public int cache { get; set; }
        public string interfaces { get; set; }

    }
    public class HardDriveReturnDto : HardDriveDto
    {
        public double rating { get; set; }
        public int commentsCount { get; set; }
    }
}
