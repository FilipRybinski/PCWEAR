namespace project_API.Models
{
    public class CaseDto
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
        public string type { get; set; }
        public string color { get; set; }
        public string sidePanel { get; set; }
        public double externalVolume { get; set; }
    }
    public class CaseReturnDto : CaseDto
    {
        public bool? favourites { get; set; }
        public double rating { get; set; }
        public int commentsCount { get; set; }
    }
}
