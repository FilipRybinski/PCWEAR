using Microsoft.EntityFrameworkCore;

namespace project_API.Entities
{
    public class dataBase :DbContext
    {
        private readonly IConfiguration _configuration;
        public dataBase(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public DbSet<user> Users { get; set; }
        public DbSet<personalData> PersonalData { get; set; }
        public DbSet<postalDetails> PostalDetails { get; set; }
        public DbSet<role> Roles { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<user>().Property(r => r.userName).IsRequired().HasMaxLength(15);
            modelBuilder.Entity<user>().Property(r => r.email).IsRequired();
            modelBuilder.Entity<user>().Property(r => r.userPassword).IsRequired();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
                optionsBuilder.UseMySQL(_configuration.GetConnectionString("DefaultConnection"));

        }
    }
}
