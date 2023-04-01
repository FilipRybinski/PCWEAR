namespace project_API.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string Email { get; set; }
        public PostalDetails PostalDetails { get; set; }
        public PersonalData PersonalData { get; set; }

    }
}
