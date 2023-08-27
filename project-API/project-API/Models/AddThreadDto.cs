using project_API.Entities;

namespace project_API.Models
{
    public class AddThreadDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<int> ThreadCategories { get; set; }
    }
}
