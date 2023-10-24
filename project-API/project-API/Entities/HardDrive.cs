namespace project_API.Entities
{
    public class HardDrive
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public int capacity { get; set; }
        public string type { get; set; }
        public int cache { get; set; }
        public string interfaces { get; set; }
        public virtual Part Part { get; set; }
    }
}
