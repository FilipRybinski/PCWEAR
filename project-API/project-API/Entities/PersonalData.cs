namespace project_API.Entities
{
    public class personalData
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string phoneNumber { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }  

    }
}
