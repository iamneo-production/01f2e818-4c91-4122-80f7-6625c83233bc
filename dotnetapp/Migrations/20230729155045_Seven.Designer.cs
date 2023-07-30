﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using dotnetapp.Models;

#nullable disable

namespace dotnetapp.Migrations
{
    [DbContext(typeof(ProductDBContext))]
    [Migration("20230729155045_Seven")]
    partial class Seven
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("dotnetapp.Models.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mobile")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("dotnetapp.Models.Document", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DocumentType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("DocumentUpload")
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("LoanApplicantId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LoanApplicantId")
                        .IsUnique();

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("dotnetapp.Models.LoanApplicant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Aadhar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ApplicantAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ApplicantEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ApplicantName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ApplicantPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AppliedDateTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DocumentFileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsApproved")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("LastRejectedDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("LoanAmountRequired")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<string>("LoanId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LoanRepaymentMonths")
                        .HasColumnType("int");

                    b.Property<string>("Pan")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Salary")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("LoanApplicants");
                });

            modelBuilder.Entity("dotnetapp.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mobile")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("dotnetapp.Models.Document", b =>
                {
                    b.HasOne("dotnetapp.Models.LoanApplicant", "LoanApplicants")
                        .WithOne("Documents")
                        .HasForeignKey("dotnetapp.Models.Document", "LoanApplicantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LoanApplicants");
                });

            modelBuilder.Entity("dotnetapp.Models.LoanApplicant", b =>
                {
                    b.HasOne("dotnetapp.Models.User", "Users")
                        .WithMany("LoanApplicants")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Users");
                });

            modelBuilder.Entity("dotnetapp.Models.LoanApplicant", b =>
                {
                    b.Navigation("Documents");
                });

            modelBuilder.Entity("dotnetapp.Models.User", b =>
                {
                    b.Navigation("LoanApplicants");
                });
#pragma warning restore 612, 618
        }
    }
}
