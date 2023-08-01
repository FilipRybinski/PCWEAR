namespace project_API.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string userName { get; set; }
        public string userPassword { get; set; }
        public string email { get; set; }
        public int roleId { get; set; }
        public virtual role role { get; set; }
        public virtual postalDetails postalDetails { get; set; }
        public virtual personalData personalData { get; set; }
        public virtual ICollection<Thread> Threads { get; set; }= new List<Thread>();
        public virtual ICollection<Post> Posts { get; set; }= new List<Post>();
    }
}
