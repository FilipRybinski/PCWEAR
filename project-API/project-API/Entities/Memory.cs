namespace project_API.Entities
{
    public class Memory
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public int speed { get; set; }
        public int modulesLower { get; set; }
        public int modulesUpper { get; set; }
        public string color { get; set; }
        public int cl { get; set; }
        public virtual Part Part { get; set; }
    }
}
