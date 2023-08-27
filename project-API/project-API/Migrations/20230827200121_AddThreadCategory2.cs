using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_API.Migrations
{
    /// <inheritdoc />
    public partial class AddThreadCategory2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ThreadCategories_Threads_ThreadId",
                table: "ThreadCategories");

            migrationBuilder.DropIndex(
                name: "IX_ThreadCategories_ThreadId",
                table: "ThreadCategories");

            migrationBuilder.DropColumn(
                name: "ThreadId",
                table: "ThreadCategories");

            migrationBuilder.CreateTable(
                name: "ThreadThreadCategory",
                columns: table => new
                {
                    ThreadCategoriesId = table.Column<int>(type: "int", nullable: false),
                    ThreadsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThreadThreadCategory", x => new { x.ThreadCategoriesId, x.ThreadsId });
                    table.ForeignKey(
                        name: "FK_ThreadThreadCategory_ThreadCategories_ThreadCategoriesId",
                        column: x => x.ThreadCategoriesId,
                        principalTable: "ThreadCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ThreadThreadCategory_Threads_ThreadsId",
                        column: x => x.ThreadsId,
                        principalTable: "Threads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ThreadThreadCategory_ThreadsId",
                table: "ThreadThreadCategory",
                column: "ThreadsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThreadThreadCategory");

            migrationBuilder.AddColumn<int>(
                name: "ThreadId",
                table: "ThreadCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ThreadCategories_ThreadId",
                table: "ThreadCategories",
                column: "ThreadId");

            migrationBuilder.AddForeignKey(
                name: "FK_ThreadCategories_Threads_ThreadId",
                table: "ThreadCategories",
                column: "ThreadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
