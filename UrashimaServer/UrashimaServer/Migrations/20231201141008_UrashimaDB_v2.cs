using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrashimaServer.Migrations
{
    /// <inheritdoc />
    public partial class UrashimaDB_v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportLoc_LocationId",
                table: "Reports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportLoc",
                table: "ReportLoc");

            migrationBuilder.DropColumn(
                name: "AdsPointId",
                table: "Reports");

            migrationBuilder.RenameTable(
                name: "ReportLoc",
                newName: "ReportLocs");

            migrationBuilder.RenameColumn(
                name: "Size",
                table: "AdsBoards",
                newName: "Width");

            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "AdsBoards",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportLocs",
                table: "ReportLocs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportLocs_LocationId",
                table: "Reports",
                column: "LocationId",
                principalTable: "ReportLocs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportLocs_LocationId",
                table: "Reports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportLocs",
                table: "ReportLocs");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "AdsBoards");

            migrationBuilder.RenameTable(
                name: "ReportLocs",
                newName: "ReportLoc");

            migrationBuilder.RenameColumn(
                name: "Width",
                table: "AdsBoards",
                newName: "Size");

            migrationBuilder.AddColumn<int>(
                name: "AdsPointId",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportLoc",
                table: "ReportLoc",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportLoc_LocationId",
                table: "Reports",
                column: "LocationId",
                principalTable: "ReportLoc",
                principalColumn: "Id");
        }
    }
}
