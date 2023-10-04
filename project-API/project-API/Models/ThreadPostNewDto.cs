using project_API.Entities;

namespace project_API.Models
{
    public class ThreadPostNewDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<CategoryDto> Categories { get; set; }
    }
}
