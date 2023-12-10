using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrashimaServer.Migrations
{
    /// <inheritdoc />
    public partial class V6_RenameReportLocToLocationAndAddAddressField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportLocs_LocationId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "ReportLocs");

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Locations_LocationId",
                table: "Reports",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Locations_LocationId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.CreateTable(
                name: "ReportLocs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportLocs", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportLocs_LocationId",
                table: "Reports",
                column: "LocationId",
                principalTable: "ReportLocs",
                principalColumn: "Id");
        }
    }
}
