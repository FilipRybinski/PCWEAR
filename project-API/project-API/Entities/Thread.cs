namespace project_API.Entities
{
    public class Thread
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public DateTime CreateDate { get; set; }
        public virtual ICollection<Post> Posts { get; set; }=new List<Post>();
        public virtual User User { get; set; }
    }
}
