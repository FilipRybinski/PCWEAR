namespace project_API.Models
{
    public class FilterThreadcs
    {
       public string byTitle { get; set; }
       public string byDescription { get; set; }
       public List<string> byCategoryName { get; set; }
        public int page { get; set; }
        public int pageSize { get; set; }
    }
}
