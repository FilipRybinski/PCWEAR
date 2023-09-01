namespace project_API.Entities
{
    public class ThreadReaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ThreadId { get; set; }
        public int value { get; set; }= 0;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
