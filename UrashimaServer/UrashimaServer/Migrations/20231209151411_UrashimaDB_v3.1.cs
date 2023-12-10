using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrashimaServer.Migrations
{
    /// <inheritdoc />
    public partial class UrashimaDB_v31 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdsCreationRequests_AdsPoints_AdsPointId",
                table: "AdsCreationRequests");

            migrationBuilder.DropIndex(
                name: "IX_AdsCreationRequests_AdsPointId",
                table: "AdsCreationRequests");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "AdsCreationRequests",
                newName: "RequestStatus");

            migrationBuilder.AddColumn<int>(
                name: "AdsCreateRequestId",
                table: "AdsBoards",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BoardModifies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BoardId = table.Column<int>(type: "int", nullable: false),
                    PointId = table.Column<int>(type: "int", nullable: false),
                    AdsType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Width = table.Column<int>(type: "int", nullable: false),
                    Height = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpiredDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoardModifies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PointModifies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PointId = table.Column<int>(type: "int", nullable: false),
                    Planned = table.Column<bool>(type: "bit", nullable: false),
                    AdsForm = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    ModifyTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointModifies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RequestAdsBoards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PointID = table.Column<int>(type: "int", nullable: false),
                    BoardID = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestAdsBoards", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdsBoards_AdsCreateRequestId",
                table: "AdsBoards",
                column: "AdsCreateRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_AdsBoards_AdsCreationRequests_AdsCreateRequestId",
                table: "AdsBoards",
                column: "AdsCreateRequestId",
                principalTable: "AdsCreationRequests",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdsBoards_AdsCreationRequests_AdsCreateRequestId",
                table: "AdsBoards");

            migrationBuilder.DropTable(
                name: "BoardModifies");

            migrationBuilder.DropTable(
                name: "PointModifies");

            migrationBuilder.DropTable(
                name: "RequestAdsBoards");

            migrationBuilder.DropIndex(
                name: "IX_AdsBoards_AdsCreateRequestId",
                table: "AdsBoards");

            migrationBuilder.DropColumn(
                name: "AdsCreateRequestId",
                table: "AdsBoards");

            migrationBuilder.RenameColumn(
                name: "RequestStatus",
                table: "AdsCreationRequests",
                newName: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_AdsCreationRequests_AdsPointId",
                table: "AdsCreationRequests",
                column: "AdsPointId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AdsCreationRequests_AdsPoints_AdsPointId",
                table: "AdsCreationRequests",
                column: "AdsPointId",
                principalTable: "AdsPoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
