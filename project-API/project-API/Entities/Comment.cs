namespace project_API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public int partId { get; set; }
        public int userId { get; set; }
        public string comment { get; set; }
        public virtual Part Part { get; set; }
        public virtual User User { get; set; }
    }
}
