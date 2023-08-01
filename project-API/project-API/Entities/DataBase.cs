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
        public DbSet<User> Users { get; set; }
        public DbSet<personalData> PersonalData { get; set; }
        public DbSet<postalDetails> PostalDetails { get; set; }
        public DbSet<role> Roles { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<Post> Posts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(r => r.userName).IsRequired().HasMaxLength(15);
            modelBuilder.Entity<User>().Property(r => r.email).IsRequired();
            modelBuilder.Entity<User>().Property(r => r.userPassword).IsRequired();

            //// relations 1-1
            modelBuilder.Entity<User>().HasOne(u => u.personalData).WithOne(p => p.User).HasForeignKey<personalData>(p=>p.UserId);
            modelBuilder.Entity<User>().HasOne(u => u.postalDetails).WithOne(p => p.User).HasForeignKey<postalDetails>(p => p.UserId);
            //// relations 1-many
            modelBuilder.Entity<User>().HasMany(u=>u.Threads).WithOne(t=>t.User).HasForeignKey(t=>t.UserId);
            modelBuilder.Entity<User>().HasMany(u => u.Posts).WithOne(p => p.User).HasForeignKey(u => u.UserId);
            modelBuilder.Entity<Thread>().HasMany(p => p.Posts).WithOne(p => p.Thread).HasForeignKey(t => t.ThreadId);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
                optionsBuilder.UseMySQL(_configuration.GetConnectionString("DefaultConnection"));

        }
    }
}
