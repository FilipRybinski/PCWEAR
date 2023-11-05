using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_API.Migrations
{
    /// <inheritdoc />
    public partial class removeprice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "price",
                table: "Parts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "price",
                table: "Parts",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
