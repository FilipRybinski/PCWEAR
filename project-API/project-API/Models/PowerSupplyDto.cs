namespace project_API.Models
{
    public class PowerSupplyDto
    {
        public string name { get; set; }
        public string imageUrl { get; set; }
        public string type { get; set; }
        public string efficiency { get; set; }
        public int wattage { get; set; }
        public string modular { get; set; }
        public string color { get; set; }

    }
    public class PowerSupplyReturnDto : PowerSupplyDto
    {
        public double? rating { get; set; }
        public int? commentsCount { get; set; }
    }
}
