using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrashimaServer.Migrations
{
    /// <inheritdoc />
    public partial class UrashimaDB_v4_UpdateImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportImages",
                table: "ReportImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdsPointImages",
                table: "AdsPointImages");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "ReportImages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ReportImages",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "AdsPointImages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "AdsPointImages",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportImages",
                table: "ReportImages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdsPointImages",
                table: "AdsPointImages",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportImages",
                table: "ReportImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdsPointImages",
                table: "AdsPointImages");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ReportImages");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "AdsPointImages");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "ReportImages",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "AdsPointImages",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportImages",
                table: "ReportImages",
                column: "Image");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdsPointImages",
                table: "AdsPointImages",
                column: "Image");
        }
    }
}
