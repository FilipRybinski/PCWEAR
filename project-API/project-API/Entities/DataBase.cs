﻿using Microsoft.EntityFrameworkCore;

namespace project_API.Entities
{
    public class DataBase :DbContext
    {
        private readonly IConfiguration _configuration;
        public DataBase(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public DbSet<User> Users { get; set; }
        public DbSet<PersonalData> PersonalData { get; set; }
        public DbSet<PostalDetails> PostalDetails { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(r => r.UserName).IsRequired().HasMaxLength(15);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}
