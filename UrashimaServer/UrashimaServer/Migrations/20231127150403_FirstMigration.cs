using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrashimaServer.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdsPoints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdsForm = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Planned = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdsPoints", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReportLoc",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportLoc", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdsBoards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdsPointId = table.Column<int>(type: "int", nullable: false),
                    AdsType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpiredDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdsBoards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdsBoards_AdsPoints_AdsPointId",
                        column: x => x.AdsPointId,
                        principalTable: "AdsPoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdsPointImages",
                columns: table => new
                {
                    Image = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AdsPointId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdsPointImages", x => x.Image);
                    table.ForeignKey(
                        name: "FK_AdsPointImages_AdsPoints_AdsPointId",
                        column: x => x.AdsPointId,
                        principalTable: "AdsPoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReportStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TreatmentProcess = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdsPointId = table.Column<int>(type: "int", nullable: true),
                    AdsBoardId = table.Column<int>(type: "int", nullable: true),
                    ReportLocId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reports_AdsBoards_AdsBoardId",
                        column: x => x.AdsBoardId,
                        principalTable: "AdsBoards",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reports_ReportLoc_ReportLocId",
                        column: x => x.ReportLocId,
                        principalTable: "ReportLoc",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ReportImages",
                columns: table => new
                {
                    Image = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ReportId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportImages", x => x.Image);
                    table.ForeignKey(
                        name: "FK_ReportImages_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdsBoards_AdsPointId",
                table: "AdsBoards",
                column: "AdsPointId");

            migrationBuilder.CreateIndex(
                name: "IX_AdsPointImages_AdsPointId",
                table: "AdsPointImages",
                column: "AdsPointId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportImages_ReportId",
                table: "ReportImages",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_AdsBoardId",
                table: "Reports",
                column: "AdsBoardId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReportLocId",
                table: "Reports",
                column: "ReportLocId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdsPointImages");

            migrationBuilder.DropTable(
                name: "ReportImages");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "AdsBoards");

            migrationBuilder.DropTable(
                name: "ReportLoc");

            migrationBuilder.DropTable(
                name: "AdsPoints");
        }
    }
}
