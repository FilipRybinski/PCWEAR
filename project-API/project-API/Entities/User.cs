namespace project_API.Entities
{
    public class user
    {
        public int Id { get; set; }
        public string userName { get; set; }
        public string userPassword { get; set; }
        public string email { get; set; }
        public int roleId { get; set; }
        public virtual role role { get; set; }
        public postalDetails postalDetails { get; set; }
        public personalData personalData { get; set; }

    }
}
