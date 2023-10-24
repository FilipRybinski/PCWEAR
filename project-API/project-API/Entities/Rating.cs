namespace project_API.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        public int rating { get; set; }
        public int partId { get; set; }
        public int userId { get; set; }
        public virtual Part Part { get; set; }
        public virtual User User { get; set; }
    }
}
