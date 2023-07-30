using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace dotnetapp.Models
{
    
    public class UserRegisterDto
    {
        [JsonPropertyName("Email ")]
        public string Email { get; set; }

        [JsonPropertyName("username ")]
        public string username { get; set; }

        [JsonPropertyName("mobileNumber")]
        public string mobileNumber { get; set; }

        [JsonPropertyName("Password")]
        public string Password { get; set; }

        [JsonPropertyName("userRole")]
        public string userRole { get; set; }
    }
    
    public class UserLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class AdminLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class AdminRegisterDto
    {
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

    }

    public class UserProfileDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Role { get; set; }
        public List<LoanApplicantDTO> LoanApplicants { get; set; }
    }

    public class LoanApplicantDTO
    {
        public string ApplicantName { get; set; }
        public string ApplicantEmail { get; set; }
        public string ApplicantPhone { get; set; }
        public string ApplicantAddress { get; set; }
        public string Aadhar { get; set; }
        public string Pan { get; set; }
        public decimal Salary { get; set; }
        public string LoanId { get; set; }
        public decimal LoanAmountRequired { get; set; }
        public int LoanRepaymentMonths { get; set; }
        public string UserEmail { get; set; }
        public string DocumentType { get; set;}
        public IFormFile DocumentUpload { get; set; }
        public bool? IsApproved { get; set; }

    }

    public class DocumentDTO
    {
        public int LoanApplicantId { get; set;}
        public string DocumentType { get; set; }
        public byte[] DocumentUpload { get; set;}
    }
}