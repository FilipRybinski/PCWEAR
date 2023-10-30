namespace project_API.Models
{
    public class ProcessorCoolerDto
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
        public int rpmLower { get; set; }
        public int rpmUpper { get; set; }
        public double noiseLower { get; set; }
        public double noiseUpper { get; set; }
        public int size { get; set; }
    }
    public class ProcessorCoolerReturnDto : ProcessorCoolerDto
    {
        public bool? favourites { get; set; }
        public double rating { get; set; }
        public int commentsCount { get; set; }
    }
}
