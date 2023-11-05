using Microsoft.EntityFrameworkCore;

namespace project_API.Entities
{
    public class Part
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Rating> Rating { get; set; }
        public virtual Processor Processor { get; set; }
        public virtual Motherboard Motherboard { get; set; }
        public virtual Memory Memory { get; set; }
        public virtual ProcessorCooler ProcessorCooler { get; set; }
        public virtual HardDrive HardDrive { get; set; }
        public virtual Graphics Graphics { get; set; }
        public virtual Case Case { get; set; }
        public virtual PowerSupply PowerSupply { get; set; }
    }
}
