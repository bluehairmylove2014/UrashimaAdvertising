using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrashimaServer.Migrations
{
    /// <inheritdoc />
    public partial class UrashimaDB_v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportLoc_ReportLocId",
                table: "Reports");

            migrationBuilder.RenameColumn(
                name: "ReportLocId",
                table: "Reports",
                newName: "LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Reports_ReportLocId",
                table: "Reports",
                newName: "IX_Reports_LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportLoc_LocationId",
                table: "Reports",
                column: "LocationId",
                principalTable: "ReportLoc",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportLoc_LocationId",
                table: "Reports");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "Reports",
                newName: "ReportLocId");

            migrationBuilder.RenameIndex(
                name: "IX_Reports_LocationId",
                table: "Reports",
                newName: "IX_Reports_ReportLocId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportLoc_ReportLocId",
                table: "Reports",
                column: "ReportLocId",
                principalTable: "ReportLoc",
                principalColumn: "Id");
        }
    }
}
