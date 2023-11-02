namespace project_API.Models
{
    public class ComputerSetDto
    {
        public string Date { get; set; }
        public string user { get; set; }
        public string pathUserImage { get; set; }
        public int roleId { get; set; }
        public List<object> parts { get; set; }

    }
}
