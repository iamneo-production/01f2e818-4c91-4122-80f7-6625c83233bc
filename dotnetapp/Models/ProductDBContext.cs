using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Models
{
    public class ProductDBContext : DbContext
    {
        public ProductDBContext(DbContextOptions<ProductDBContext> options) : base(options) 
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LoanApplicant>()
                .Property(b => b.LoanAmountRequired)
                .HasPrecision(10, 2); // Precision 18, Scale 2

            modelBuilder.Entity<LoanApplicant>()
                .Property(b => b.Salary)
                .HasPrecision(10, 2);

        }

        public DbSet<LoanApplicant> LoanApplicants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Document> Documents { get; set; }
    }
}