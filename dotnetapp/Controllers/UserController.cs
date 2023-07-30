using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Interfaces.Services;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ProductDBContext _context;
        public UserController(ProductDBContext context)
        {
            _context = context;
        }


        [HttpGet("user/getProfile/{email}")]
        public async Task<ActionResult<UserProfileDTO>> getProfile(string email)
        {
            var user = await _context.Users
                                     .Include(u => u.LoanApplicants)
                                     .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var loanApplicants = user.LoanApplicants.Where(la => la.ApplicantEmail == user.Email)
                                                    .Select(la => new LoanApplicantDTO
                                                    {
                                                        ApplicantName = la.ApplicantName,
                                                        ApplicantEmail = la.ApplicantEmail,
                                                        ApplicantPhone = la.ApplicantPhone,
                                                        ApplicantAddress = la.ApplicantAddress,
                                                        Aadhar = la.Aadhar,
                                                        Pan = la.Pan,
                                                        Salary = la.Salary,
                                                        LoanId = la.LoanId,
                                                        LoanAmountRequired = la.LoanAmountRequired,
                                                        LoanRepaymentMonths = la.LoanRepaymentMonths,
                                                        UserEmail = user.Email  // We have user's email from the outer scope
                                                    }).ToList();

            if (!loanApplicants.Any())
            {
                loanApplicants.Add(new LoanApplicantDTO
                {
                    ApplicantName = "",
                    ApplicantEmail = "",
                    ApplicantPhone = "",
                    ApplicantAddress = "",
                    Aadhar = "",
                    Pan = "",
                    Salary = 0,
                    LoanAmountRequired = 0,
                    LoanRepaymentMonths = 0,
                    UserEmail = "",
                });
            }

            var userProfileDTO = new UserProfileDTO
            {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Mobile = user.Mobile,
                Email = user.Email,
                City = user.City,
                Role = user.Role,
                LoanApplicants = loanApplicants
            };

            return Ok(userProfileDTO);
        }

        [HttpPut("user/editProfile/{email}")]
        public async Task<ActionResult<UserProfileDTO>> EditProfile(string email, UserProfileDTO userProfileDto)
        {
            // Fetch the user based on the email
            var user = await _context.Users.Include(u => u.LoanApplicants).FirstOrDefaultAsync(u => u.Email == email);

            // If no user is found, return a NotFound response
            if (user == null)
            {
                return NotFound();
            }

            // Update the user properties from the userProfileDto
            user.Name = userProfileDto.Name;
            user.Mobile = userProfileDto.Mobile;
            user.City = userProfileDto.City;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            // Return the updated User object as a DTO
            // Assuming we have a method that converts User to UserDTO
            return Ok(new { Status = "Success", Message = "Profile saved" });
        }

        [HttpGet("user/getProfile")]
        public async Task<ActionResult<UserProfileDTO>> getProfile()
        {
            string email = "kshanmukha1501@gmail.com";
            var user = await _context.Users
                                     .Include(u => u.LoanApplicants)
                                     .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return Ok(new { message = "NotFound", data = false });
            }

            var loanApplicants = user.LoanApplicants.Where(la => la.ApplicantEmail == user.Email)
                                                    .Select(la => new LoanApplicantDTO
                                                    {
                                                        ApplicantName = la.ApplicantName,
                                                        ApplicantEmail = la.ApplicantEmail,
                                                        ApplicantPhone = la.ApplicantPhone,
                                                        ApplicantAddress = la.ApplicantAddress,
                                                        Aadhar = la.Aadhar,
                                                        Pan = la.Pan,
                                                        Salary = la.Salary,
                                                        LoanId = la.LoanId,
                                                        LoanAmountRequired = la.LoanAmountRequired,
                                                        LoanRepaymentMonths = la.LoanRepaymentMonths,
                                                        UserEmail = user.Email  // We have user's email from the outer scope
                                                    }).ToList();

            if (!loanApplicants.Any())
            {
                loanApplicants.Add(new LoanApplicantDTO
                {
                    ApplicantName = "",
                    ApplicantEmail = "",
                    ApplicantPhone = "",
                    ApplicantAddress = "",
                    Aadhar = "",
                    Pan = "",
                    Salary = 0,
                    LoanAmountRequired = 0,
                    LoanRepaymentMonths = 0,
                    UserEmail = "",
                });
            }

            var userProfileDTO = new UserProfileDTO
            {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Mobile = user.Mobile,
                Email = user.Email,
                City = user.City,
                Role = user.Role,
                LoanApplicants = loanApplicants
            };

            return userProfileDTO;
        }

        [HttpGet("user/getDocuments")]
        public async Task<ActionResult<DocumentDTO>> getDocuments()
        {
            string email = "kshanmukha1501@gmail.com";
            var loanapplicant = await _context.LoanApplicants
                                     .Include(l => l.Documents)
                                     .FirstOrDefaultAsync(l => l.ApplicantEmail == email);

            if (loanapplicant == null)
            {
                return Ok(new { message = "NotFound", data = false });
            }

            var document = loanapplicant.Documents;

            var DocumentDto = new DocumentDTO
            {
                LoanApplicantId = document.LoanApplicantId,
                DocumentType = document.DocumentType,
                DocumentUpload = document.DocumentUpload
            };

            return DocumentDto;
        }
    }
}
