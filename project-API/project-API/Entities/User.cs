namespace project_API.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string userName { get; set; }
        public string userPassword { get; set; }
        public string email { get; set; }
        public string pathUserImage { get; set; }
        public bool confirmed { get; set; } = false;
        public int roleId { get; set; }
        public virtual role role { get; set; }
        public virtual PrivateDetail personalData { get; set; }
        public virtual ICollection<Thread> Threads { get; set; }= new List<Thread>();
        public virtual ICollection<Post> Posts { get; set; }= new List<Post>();
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
