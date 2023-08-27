using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_API.Migrations
{
    /// <inheritdoc />
    public partial class addMore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "accepted",
                table: "Threads",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "archived",
                table: "Threads",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "accepted",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "archived",
                table: "Threads");
        }
    }
}
