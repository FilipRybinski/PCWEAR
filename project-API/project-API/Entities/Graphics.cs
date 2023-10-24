namespace project_API.Entities
{
    public class Graphics
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public string chipset { get; set; }
        public int memory { get; set; }
        public int coreClock { get; set; }
        public int boostClock { get; set; }
        public string color { get; set; }
        public int length { get; set; }
        public virtual Part Part { get; set; }
    }
}
