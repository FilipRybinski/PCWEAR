namespace project_API.Entities
{
    public class Processor
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public int cores { get; set; }
        public int threads { get; set; }
        public bool graphics { get; set; }
        public int tdp { get; set; }
        public string socket { get; set; }
        public virtual Part Part { get; set; }
    }
}
