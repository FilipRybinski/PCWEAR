namespace project_API.Entities
{
    public class Motherboard
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public string socket { get; set; }
        public string formFactor { get; set; }
        public int maxMemory { get; set; }
        public int memorySlot { get; set; }
        public string color { get; set; }
        public virtual Part Part { get; set; }
    }
}
