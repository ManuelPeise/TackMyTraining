﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Data.TrainingContext.Migrations
{
    /// <inheritdoc />
    public partial class InitializeDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AppUserCredentials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Password = table.Column<string>(type: "longtext", nullable: false),
                    Salt = table.Column<string>(type: "longtext", nullable: false),
                    JwT = table.Column<string>(type: "longtext", nullable: false),
                    RefreshToken = table.Column<string>(type: "longtext", nullable: false),
                    FailedLoginAttemts = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: false),
                    CreatedAt = table.Column<string>(type: "longtext", nullable: false),
                    UpdatedBy = table.Column<string>(type: "longtext", nullable: false),
                    UpdatedAt = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserCredentials", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "HealthDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Height = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Weight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BodyFat = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MuscleMass = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    HeartBeat = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BodyMassIndex = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: false),
                    CreatedAt = table.Column<string>(type: "longtext", nullable: false),
                    UpdatedBy = table.Column<string>(type: "longtext", nullable: false),
                    UpdatedAt = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthDatas", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MessageLog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Trigger = table.Column<string>(type: "longtext", nullable: false),
                    Message = table.Column<string>(type: "longtext", nullable: false),
                    ExceptionJson = table.Column<string>(type: "longtext", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: false),
                    CreatedAt = table.Column<string>(type: "longtext", nullable: false),
                    UpdatedBy = table.Column<string>(type: "longtext", nullable: false),
                    UpdatedAt = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageLog", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AppUser",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(type: "longtext", nullable: false),
                    LastName = table.Column<string>(type: "longtext", nullable: false),
                    Email = table.Column<string>(type: "longtext", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CrendentialsId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: false),
                    CreatedAt = table.Column<string>(type: "longtext", nullable: false),
                    UpdatedBy = table.Column<string>(type: "longtext", nullable: false),
                    UpdatedAt = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppUser_AppUserCredentials_CrendentialsId",
                        column: x => x.CrendentialsId,
                        principalTable: "AppUserCredentials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AppUserCredentials",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "FailedLoginAttemts", "JwT", "Password", "RefreshToken", "Salt", "UpdatedAt", "UpdatedBy" },
                values: new object[] { 1, "2024-09-28", "System", 0, "", "U3VwZXJTZWNyZXQ3OTcwOWNkMC1jZmY4LTRhZmUtOGMzMi04MWFjOWYyNWJiZjU=", "", "79709cd0-cff8-4afe-8c32-81ac9f25bbf5", "2024-09-28", "System" });

            migrationBuilder.InsertData(
                table: "AppUser",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "CrendentialsId", "DateOfBirth", "Email", "FirstName", "IsActive", "LastName", "UpdatedAt", "UpdatedBy" },
                values: new object[] { 1, "2024-09-28", "System", 1, new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "test@training.com", "", true, "", "2024-09-28", "System" });

            migrationBuilder.CreateIndex(
                name: "IX_AppUser_CrendentialsId",
                table: "AppUser",
                column: "CrendentialsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUser");

            migrationBuilder.DropTable(
                name: "HealthDatas");

            migrationBuilder.DropTable(
                name: "MessageLog");

            migrationBuilder.DropTable(
                name: "AppUserCredentials");
        }
    }
}
