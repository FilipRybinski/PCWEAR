namespace project_API.Models
{
    public class MotherboardDto
    {
        public int? Id { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
        public string socket { get; set; }
        public string formFactor { get; set; }
        public int maxMemory { get; set; }
        public int memorySlot { get; set; }
        public string color { get; set; }
    }
    public class MotherboardReturnDto : MotherboardDto
    {
        public bool? favourites { get; set; }
        public double rating { get; set; }
        public int commentsCount { get; set; }
    }
}
