namespace project_API.Entities
{
    public class Thread
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public bool accepted { get; set; }=false;
        public bool archived { get; set; }=false;
        public virtual ICollection<Post> Posts { get; set; }=new List<Post>();
        public virtual ICollection<Category> Categories { get; set; } =new List<Category>();
        public virtual User User { get; set; }
    }
}
