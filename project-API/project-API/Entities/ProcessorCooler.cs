using System.Drawing;

namespace project_API.Entities
{
    public class ProcessorCooler
    {
        public int Id { get; set; }
        public int PartId { get; set; }
        public int rpmLower { get; set; }
        public int rpmUpper { get; set; }
        public double noiseLower { get; set; }
        public double noiseUpper { get; set; }
        public int size { get; set; }
        public virtual Part Part { get; set; }
    }
}
