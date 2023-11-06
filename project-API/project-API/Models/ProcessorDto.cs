namespace project_API.Models
{
    public class ProcessorDto
    {
        public int ?Id { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
        public int cores { get; set; }
        public int threads { get; set; }
        public bool graphics { get; set; }
        public int tdp { get; set; }
        public string socket { get; set; }
    }
    public class ProcessorReturnDto : ProcessorDto
    {
        public bool? favourites { get; set; }
        public double rating { get; set; }
        public int commentsCount { get; set; }
    }
}

