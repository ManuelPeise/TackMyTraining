﻿// <auto-generated />
using System;
using Data.TrainingContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Data.TrainingContext.Migrations
{
    [DbContext(typeof(TrainingDbContext))]
    [Migration("20240930184908_AddUserSettingsTable")]
    partial class AddUserSettingsTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Data.Models.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("CrendentialsId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UpdatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CrendentialsId");

                    b.ToTable("AppUser");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = "2024-09-30",
                            CreatedBy = "System",
                            CrendentialsId = 1,
                            DateOfBirth = new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "test@training.com",
                            FirstName = "",
                            IsActive = true,
                            LastName = "",
                            UpdatedAt = "2024-09-30",
                            UpdatedBy = "System"
                        });
                });

            modelBuilder.Entity("Data.Models.Entities.LogMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ExceptionJson")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Trigger")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UpdatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("MessageLog");
                });

            modelBuilder.Entity("Data.Models.Entities.UserCredentials", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("FailedLoginAttemts")
                        .HasColumnType("int");

                    b.Property<string>("JwT")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Salt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UpdatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("AppUserCredentials");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = "2024-09-30",
                            CreatedBy = "System",
                            FailedLoginAttemts = 0,
                            JwT = "",
                            Password = "U3VwZXJTZWNyZXRmMTEwYmFlMC1kMGQ5LTRkZGUtODY5Ni1jNWViZWQyNWRkNDM=",
                            RefreshToken = "",
                            Salt = "f110bae0-d0d9-4dde-8696-c5ebed25dd43",
                            UpdatedAt = "2024-09-30",
                            UpdatedBy = "System"
                        });
                });

            modelBuilder.Entity("Data.Models.Entities.UserHealthData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal?>("BodyFat")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("BodyMassIndex")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal?>("HeartBeat")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Height")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("MuscleMass")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("UpdatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<decimal>("Weight")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("HealthDatas");
                });

            modelBuilder.Entity("Data.Models.Entities.UserSettings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SettingsJson")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SettingsName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SettingsType")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedAt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("UserSettings");
                });

            modelBuilder.Entity("Data.Models.Entities.AppUser", b =>
                {
                    b.HasOne("Data.Models.Entities.UserCredentials", "Credentials")
                        .WithMany()
                        .HasForeignKey("CrendentialsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Credentials");
                });
#pragma warning restore 612, 618
        }
    }
}
