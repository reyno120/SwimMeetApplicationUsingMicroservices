using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeetPlanning.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Meets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meets", x => x.Id);
                });


            // Seeding data should not be a part of normal app execution and only be used for development/testing
            // https://learn.microsoft.com/en-us/ef/core/modeling/data-seeding
            migrationBuilder.InsertData(
                table: "Meets",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Test DB Meet 1" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Meets");
        }
    }
}
