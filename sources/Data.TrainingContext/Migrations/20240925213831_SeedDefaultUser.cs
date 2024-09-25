using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.TrainingContext.Migrations
{
    /// <inheritdoc />
    public partial class SeedDefaultUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AppUserCredentials",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "FailedLoginAttemts", "JwT", "Password", "RefreshToken", "Salt", "UpdatedAt", "UpdatedBy" },
                values: new object[] { 1, "2024-09-25", "System", 0, "", "U3VwZXJTZWNyZXQyMjVlNDEzNi1iYmQ2LTQ4MzgtOTcyMy1hZDMwOWU2M2JlODY=", "", "225e4136-bbd6-4838-9723-ad309e63be86", "2024-09-25", "System" });

            migrationBuilder.InsertData(
                table: "AppUser",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "CrendentialsId", "DateOfBirth", "Email", "FirstName", "IsActive", "LastName", "UpdatedAt", "UpdatedBy" },
                values: new object[] { 1, "2024-09-25", "System", 1, new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "test@training.com", "", true, "", "2024-09-25", "System" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AppUser",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AppUserCredentials",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
