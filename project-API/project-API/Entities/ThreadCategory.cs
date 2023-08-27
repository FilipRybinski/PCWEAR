namespace project_API.Entities
{
    public class ThreadCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string bgColor { get; set; }
        public string color { get; set; }
        public virtual ICollection<Thread> Threads { get; set; } = new List<Thread>();
    }
}
