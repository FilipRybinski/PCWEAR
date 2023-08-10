using project_API.Entities;

namespace project_API.Models
{
    public class PostalDetailsDto
    {
        public string city { get; set; }
        public string country { get; set; }
        public string postalCode { get; set; }
        public string street { get; set; }
    }
}
