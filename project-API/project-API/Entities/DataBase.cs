using Microsoft.EntityFrameworkCore;
using System.Text.Json;

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
        public DbSet<PrivateDetail> PrivateDetails { get; set; }
        public DbSet<role> Roles { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ThreadReaction> threadReactions { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<Processor> Processors { get; set; }
        public DbSet<Motherboard> Motherboards { get; set; }
        public DbSet<HardDrive> HardDrives { get; set; }
        public DbSet<PowerSupply> PowerSupplys { get; set; }
        public DbSet<ProcessorCooler> ProcessorCoolers { get; set; }
        public DbSet<Graphics> Graphicss { get; set; }
        public DbSet<Case> Cases { get; set; }
        public DbSet<Memory> Memorys { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Favourites> Favourites { get; set; }
        public DbSet<ComputerSet> ComputerSets { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(r => r.userName).IsRequired().HasMaxLength(15);
            modelBuilder.Entity<User>().Property(r => r.email).IsRequired();
            modelBuilder.Entity<User>().Property(r => r.userPassword).IsRequired();

            //// relations 1-1
            modelBuilder.Entity<Part>().HasOne(p => p.Processor).WithOne(p => p.Part);
            modelBuilder.Entity<Part>().HasOne(p => p.Motherboard).WithOne(p => p.Part);
            modelBuilder.Entity<Part>().HasOne(p => p.HardDrive).WithOne(p => p.Part);
            modelBuilder.Entity<Part>().HasOne(p => p.PowerSupply).WithOne(p => p.Part);
            modelBuilder.Entity<Part>().HasOne(p => p.ProcessorCooler).WithOne(p => p.Part);
            modelBuilder.Entity<Part>().HasOne(p => p.Graphics).WithOne(p => p.Part);
            modelBuilder.Entity<Part>().HasOne(p => p.Case).WithOne(p => p.Part);
            modelBuilder.Entity<Part>().HasOne(p => p.Memory).WithOne(p => p.Part);
            modelBuilder.Entity<User>().HasOne(u => u.personalData).WithOne(p => p.User).HasForeignKey<PrivateDetail>(p=>p.UserId);
            //// relations 1-many
            modelBuilder.Entity<User>().HasMany(u => u.ComputerSet).WithOne(t => t.User);
            modelBuilder.Entity<User>().HasMany(u=>u.Threads).WithOne(t=>t.User).HasForeignKey(t=>t.UserId);
            modelBuilder.Entity<User>().HasMany(u=>u.Threads).WithOne(t=>t.User).HasForeignKey(t=>t.UserId);
            modelBuilder.Entity<User>().HasMany(u => u.Posts).WithOne(p => p.User).HasForeignKey(u => u.UserId);
            modelBuilder.Entity<User>().HasMany(p => p.Comments).WithOne(p => p.User);
            modelBuilder.Entity<User>().HasMany(u => u.Favourites).WithOne(t => t.User);
            modelBuilder.Entity<Thread>().HasMany(p => p.Posts).WithOne(p => p.Thread).HasForeignKey(t => t.ThreadId);
            modelBuilder.Entity<Part>().HasMany(p => p.Comments).WithOne(p => p.Part);
            modelBuilder.Entity<Part>().HasMany(p => p.Rating).WithOne(p => p.Part);
            ///relations many to many
            modelBuilder.Entity<Thread>().HasMany(t => t.Categories).WithMany(e => e.Threads);
            modelBuilder.Entity<ComputerSet>().Property(e=>e.partsId).HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e=>int.Parse(e)).ToArray()
                );
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
                optionsBuilder.UseMySQL(_configuration.GetConnectionString("DefaultConnection"));

        }
    }
}
