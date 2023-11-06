namespace project_API.Models
{
    public class GraphicsDto
    {
        public int? Id { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
        public string chipset { get; set; }
        public int memory { get; set; }
        public int coreClock { get; set; }
        public int boostClock { get; set; }
        public string color { get; set; }
        public int length { get; set; }
    }
    public class GraphicsReturnDto : GraphicsDto
    {
        public bool? favourites { get; set; }
        public double rating { get; set; }
        public int commentsCount { get; set; }
    }
}
