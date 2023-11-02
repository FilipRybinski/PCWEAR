namespace project_API.Entities
{
    public class ComputerSet
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int[] partsId { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
        public virtual User User { get; set; }
    }
}
