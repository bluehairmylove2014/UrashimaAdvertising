using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrashimaServer.Migrations
{
    /// <inheritdoc />
    public partial class V5_AddAdsPointRefForReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdsPointId",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reports_AdsPointId",
                table: "Reports",
                column: "AdsPointId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_AdsPoints_AdsPointId",
                table: "Reports",
                column: "AdsPointId",
                principalTable: "AdsPoints",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_AdsPoints_AdsPointId",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_AdsPointId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "AdsPointId",
                table: "Reports");
        }
    }
}
