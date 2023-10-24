namespace project_API.Entities
{
    public class Case
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public string type { get; set; }
        public string color { get; set; }
        public string sidePanel { get; set; }
        public double externalVolume { get; set; }

        public virtual Part Part { get; set; }
    }
}
