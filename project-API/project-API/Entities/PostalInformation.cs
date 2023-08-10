namespace project_API.Entities
{
    public class PostalInformation
    {
        public int Id { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string postalCode { get; set; }
        public string street { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
