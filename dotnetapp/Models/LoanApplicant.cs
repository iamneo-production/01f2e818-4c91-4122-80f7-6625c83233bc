using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class LoanApplicant
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ApplicantName { get; set; }
        public string ApplicantAddress { get; set; }
        public string ApplicantEmail { get; set; }
        public string ApplicantPhone { get; set; }
        public string LoanId { get; set; }
        public string Aadhar { get; set; }
        public string Pan { get; set; }
        public decimal Salary { get; set; }
        public decimal LoanAmountRequired { get; set; }
        public int LoanRepaymentMonths { get; set; }
        public bool? IsApproved { get; set; }
        public User Users { get; set; }
       // Byte array to store the document data
        public Document Documents { get; set; }
    }
}