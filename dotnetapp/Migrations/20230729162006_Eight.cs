using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnetapp.Migrations
{
    public partial class Eight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppliedDateTime",
                table: "LoanApplicants");

            migrationBuilder.DropColumn(
                name: "DocumentFileName",
                table: "LoanApplicants");

            migrationBuilder.DropColumn(
                name: "LastRejectedDate",
                table: "LoanApplicants");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppliedDateTime",
                table: "LoanApplicants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DocumentFileName",
                table: "LoanApplicants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastRejectedDate",
                table: "LoanApplicants",
                type: "datetime2",
                nullable: true);
        }
    }
}
