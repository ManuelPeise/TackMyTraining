using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.TrainingContext.Migrations
{
    /// <inheritdoc />
    public partial class MigrateDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUser_AppUserCredentials_CrendentialsId",
                table: "AppUser");

            migrationBuilder.AlterColumn<int>(
                name: "CrendentialsId",
                table: "AppUser",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AppUserCredentials",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "Salt" },
                values: new object[] { "U3VwZXJTZWNyZXRlZmEyYjVmMi0zYjRiLTQxNDQtODQ3Ni1mZDFlNjdmODAwMWY=", "efa2b5f2-3b4b-4144-8476-fd1e67f8001f" });

            migrationBuilder.AddForeignKey(
                name: "FK_AppUser_AppUserCredentials_CrendentialsId",
                table: "AppUser",
                column: "CrendentialsId",
                principalTable: "AppUserCredentials",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUser_AppUserCredentials_CrendentialsId",
                table: "AppUser");

            migrationBuilder.AlterColumn<int>(
                name: "CrendentialsId",
                table: "AppUser",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AppUserCredentials",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "Salt" },
                values: new object[] { "U3VwZXJTZWNyZXQ0YjY2MjQ2Yy0xOGJjLTQ2NTMtYmZjZS03OWJiODc5ZjI4NmI=", "4b66246c-18bc-4653-bfce-79bb879f286b" });

            migrationBuilder.AddForeignKey(
                name: "FK_AppUser_AppUserCredentials_CrendentialsId",
                table: "AppUser",
                column: "CrendentialsId",
                principalTable: "AppUserCredentials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
