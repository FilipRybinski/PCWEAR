namespace project_API.Entities
{
    public class PowerSupply
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public string type { get; set; }
        public string efficiency { get; set; }
        public int wattage { get; set; }
        public string modular { get; set; }
        public string color { get; set; }
        public virtual Part Part { get; set; }
    }
}
