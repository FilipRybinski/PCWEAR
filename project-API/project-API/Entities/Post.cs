﻿namespace project_API.Entities
{
    public interface IPOST
    {

    }
    public class Post
    {
        public int Id { get; set; }
        public int ThreadId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string Title { get; set; }
        public string Body { get; set; }
        public virtual Thread Thread { get; set; }
        public virtual User User { get; set; }
    }
}
