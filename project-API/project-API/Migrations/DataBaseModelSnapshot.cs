﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using project_API.Entities;

#nullable disable

namespace project_API.Migrations
{
    [DbContext(typeof(dataBase))]
    partial class dataBaseModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CategoryThread", b =>
                {
                    b.Property<int>("CategoriesId")
                        .HasColumnType("int");

                    b.Property<int>("ThreadsId")
                        .HasColumnType("int");

                    b.HasKey("CategoriesId", "ThreadsId");

                    b.HasIndex("ThreadsId");

                    b.ToTable("CategoryThread");
                });

            modelBuilder.Entity("project_API.Entities.Case", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PartId")
                        .HasColumnType("int");

                    b.Property<string>("color")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("externalVolume")
                        .HasColumnType("double");

                    b.Property<string>("sidePanel")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("PartId")
                        .IsUnique();

                    b.ToTable("Cases");
                });

            modelBuilder.Entity("project_API.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("bgColor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("color")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("project_API.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("comment")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("partId")
                        .HasColumnType("int");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("partId");

                    b.HasIndex("userId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("project_API.Entities.ComputerSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("partsId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("userId");

                    b.ToTable("ComputerSets");
                });

            modelBuilder.Entity("project_API.Entities.Favourites", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("partId")
                        .HasColumnType("int");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("partId");

                    b.HasIndex("userId");

                    b.ToTable("Favourites");
                });

            modelBuilder.Entity("project_API.Entities.Graphics", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PartId")
                        .HasColumnType("int");

                    b.Property<int>("boostClock")
                        .HasColumnType("int");

                    b.Property<string>("chipset")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("color")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("coreClock")
                        .HasColumnType("int");

                    b.Property<int>("length")
                        .HasColumnType("int");

                    b.Property<int>("memory")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PartId")
                        .IsUnique();

                    b.ToTable("Graphicss");
                });

            modelBuilder.Entity("project_API.Entities.HardDrive", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PartId")
                        .HasColumnType("int");

                    b.Property<int>("cache")
                        .HasColumnType("int");

                    b.Property<int>("capacity")
                        .HasColumnType("int");

                    b.Property<string>("interfaces")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("PartId")
                        .IsUnique();

                    b.ToTable("HardDrives");
                });

            modelBuilder.Entity("project_API.Entities.Memory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PartId")
                        .HasColumnType("int");

                    b.Property<int>("cl")
                        .HasColumnType("int");

                    b.Property<string>("color")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("modulesLower")
                        .HasColumnType("int");

                    b.Property<int>("modulesUpper")
                        .HasColumnType("int");

                    b.Property<int>("speed")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PartId")
                        .IsUnique();

                    b.ToTable("Memorys");
                });

            modelBuilder.Entity("project_API.Entities.Motherboard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PartId")
                        .HasColumnType("int");

                    b.Property<string>("color")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("formFactor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("maxMemory")
                        .HasColumnType("int");

                    b.Property<int>("memorySlot")
                        .HasColumnType("int");

                    b.Property<string>("socket")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("PartId")
                        .IsUnique();

                    b.ToTable("Motherboards");
                });

            modelBuilder.Entity("project_API.Entities.Part", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Parts");
                });

            modelBuilder.Entity("project_API.Entities.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("ThreadId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ThreadId");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("project_API.Entities.PowerSupply", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PartId")
                        .HasColumnType("int");

                    b.Property<string>("color")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("efficiency")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("modular")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("wattage")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PartId")
                        .IsUnique();

                    b.ToTable("PowerSupplys");
                });

            modelBuilder.Entity("project_API.Entities.PrivateDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("phoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("surname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("PrivateDetails");
                });

            modelBuilder.Entity("project_API.Entities.Processor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PartId")
                        .HasColumnType("int");

                    b.Property<int>("cores")
                        .HasColumnType("int");

                    b.Property<bool>("graphics")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("socket")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("tdp")
                        .HasColumnType("int");

                    b.Property<int>("threads")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PartId")
                        .IsUnique();

                    b.ToTable("Processors");
                });

            modelBuilder.Entity("project_API.Entities.ProcessorCooler", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PartId")
                        .HasColumnType("int");

                    b.Property<double>("noiseLower")
                        .HasColumnType("double");

                    b.Property<double>("noiseUpper")
                        .HasColumnType("double");

                    b.Property<int>("rpmLower")
                        .HasColumnType("int");

                    b.Property<int>("rpmUpper")
                        .HasColumnType("int");

                    b.Property<int>("size")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PartId")
                        .IsUnique();

                    b.ToTable("ProcessorCoolers");
                });

            modelBuilder.Entity("project_API.Entities.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("partId")
                        .HasColumnType("int");

                    b.Property<int>("rating")
                        .HasColumnType("int");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("partId");

                    b.HasIndex("userId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("project_API.Entities.Thread", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<bool>("accepted")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("archived")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("views")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Threads");
                });

            modelBuilder.Entity("project_API.Entities.ThreadReaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("ThreadId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("threadReactions");
                });

            modelBuilder.Entity("project_API.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("confirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("pathUserImage")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("roleId")
                        .HasColumnType("int");

                    b.Property<string>("userName")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<string>("userPassword")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("roleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("project_API.Entities.role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("CategoryThread", b =>
                {
                    b.HasOne("project_API.Entities.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("project_API.Entities.Thread", null)
                        .WithMany()
                        .HasForeignKey("ThreadsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("project_API.Entities.Case", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithOne("Case")
                        .HasForeignKey("project_API.Entities.Case", "PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("project_API.Entities.Comment", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithMany("Comments")
                        .HasForeignKey("partId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("project_API.Entities.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");

                    b.Navigation("User");
                });

            modelBuilder.Entity("project_API.Entities.ComputerSet", b =>
                {
                    b.HasOne("project_API.Entities.User", "User")
                        .WithMany("ComputerSet")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("project_API.Entities.Favourites", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithMany()
                        .HasForeignKey("partId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("project_API.Entities.User", "User")
                        .WithMany("Favourites")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");

                    b.Navigation("User");
                });

            modelBuilder.Entity("project_API.Entities.Graphics", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithOne("Graphics")
                        .HasForeignKey("project_API.Entities.Graphics", "PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("project_API.Entities.HardDrive", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithOne("HardDrive")
                        .HasForeignKey("project_API.Entities.HardDrive", "PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("project_API.Entities.Memory", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithOne("Memory")
                        .HasForeignKey("project_API.Entities.Memory", "PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("project_API.Entities.Motherboard", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithOne("Motherboard")
                        .HasForeignKey("project_API.Entities.Motherboard", "PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("project_API.Entities.Post", b =>
                {
                    b.HasOne("project_API.Entities.Thread", "Thread")
                        .WithMany("Posts")
                        .HasForeignKey("ThreadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("project_API.Entities.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Thread");

                    b.Navigation("User");
                });

            modelBuilder.Entity("project_API.Entities.PowerSupply", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithOne("PowerSupply")
                        .HasForeignKey("project_API.Entities.PowerSupply", "PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("project_API.Entities.PrivateDetail", b =>
                {
                    b.HasOne("project_API.Entities.User", "User")
                        .WithOne("personalData")
                        .HasForeignKey("project_API.Entities.PrivateDetail", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("project_API.Entities.Processor", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithOne("Processor")
                        .HasForeignKey("project_API.Entities.Processor", "PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("project_API.Entities.ProcessorCooler", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithOne("ProcessorCooler")
                        .HasForeignKey("project_API.Entities.ProcessorCooler", "PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("project_API.Entities.Rating", b =>
                {
                    b.HasOne("project_API.Entities.Part", "Part")
                        .WithMany("Rating")
                        .HasForeignKey("partId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("project_API.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");

                    b.Navigation("User");
                });

            modelBuilder.Entity("project_API.Entities.Thread", b =>
                {
                    b.HasOne("project_API.Entities.User", "User")
                        .WithMany("Threads")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("project_API.Entities.User", b =>
                {
                    b.HasOne("project_API.Entities.role", "role")
                        .WithMany()
                        .HasForeignKey("roleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("role");
                });

            modelBuilder.Entity("project_API.Entities.Part", b =>
                {
                    b.Navigation("Case")
                        .IsRequired();

                    b.Navigation("Comments");

                    b.Navigation("Graphics")
                        .IsRequired();

                    b.Navigation("HardDrive")
                        .IsRequired();

                    b.Navigation("Memory")
                        .IsRequired();

                    b.Navigation("Motherboard")
                        .IsRequired();

                    b.Navigation("PowerSupply")
                        .IsRequired();

                    b.Navigation("Processor")
                        .IsRequired();

                    b.Navigation("ProcessorCooler")
                        .IsRequired();

                    b.Navigation("Rating");
                });

            modelBuilder.Entity("project_API.Entities.Thread", b =>
                {
                    b.Navigation("Posts");
                });

            modelBuilder.Entity("project_API.Entities.User", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("ComputerSet");

                    b.Navigation("Favourites");

                    b.Navigation("Posts");

                    b.Navigation("Threads");

                    b.Navigation("personalData")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
