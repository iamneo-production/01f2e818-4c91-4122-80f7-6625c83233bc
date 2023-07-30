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
using Microsoft.AspNetCore.Http;
using System.IO;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class loanController : ControllerBase
    {
        private readonly ProductDBContext _context;
        public loanController(ProductDBContext context)
        {
            _context = context;
        }

        [HttpPost("user/addLoan")]
        public async Task<ActionResult<LoanApplicant>> PostLoanApplicant([FromForm] LoanApplicantDTO loanApplicantDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loanApplicantDTO.UserEmail);

            if (user == null)
            {
                return BadRequest("No user found with the provided email.");
            }

            var existingApplication = await _context.LoanApplicants.AnyAsync(l => l.ApplicantEmail == loanApplicantDTO.ApplicantEmail && l.UserId == user.Id);
            if (existingApplication)
            {
                return Conflict("An application from this email has already been submitted by the same user.");
            }

            var loanApplicant = new LoanApplicant
            {
                // Map other properties
                UserId = user.Id,
                ApplicantName = loanApplicantDTO.ApplicantName,
                ApplicantAddress = loanApplicantDTO.ApplicantAddress,
                ApplicantEmail = loanApplicantDTO.ApplicantEmail,
                ApplicantPhone = loanApplicantDTO.ApplicantPhone,
                Aadhar = loanApplicantDTO.Aadhar,
                Pan = loanApplicantDTO.Pan,
                Salary = loanApplicantDTO.Salary,
                LoanAmountRequired = loanApplicantDTO.LoanAmountRequired,
                LoanRepaymentMonths = loanApplicantDTO.LoanRepaymentMonths,
                LoanId = GenerateLoanId(),
                Users = user
            };

            if (loanApplicantDTO.DocumentUpload != null)
            {
                using (var ms = new MemoryStream())
                {
                    await loanApplicantDTO.DocumentUpload.CopyToAsync(ms);
                    var fileBytes = ms.ToArray();
                    var document = new Document
                    {
                        LoanApplicantId = loanApplicant.Id,
                        DocumentType = loanApplicantDTO.DocumentUpload.ContentType,
                        DocumentUpload = fileBytes,
                        LoanApplicants = loanApplicant
                    };
                    loanApplicant.Documents = document;
                }
            }

            _context.LoanApplicants.Add(loanApplicant);
            await _context.SaveChangesAsync();

            return Created("", loanApplicant.LoanId);
        } 


        // GET: api/loan/{email}
        [HttpGet("user/viewLoan/{email}")]
        public async Task<ActionResult<IEnumerable<LoanApplicantDTO>>> GetLoanApplicants(string email)
        {
            // Get the user
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            // If no user is found, return a NotFound response
            if (user == null)
            {
                return NotFound();
            }

            // Get the loan applications for this user that also have the same email
            var loanApplications = await _context.LoanApplicants
                .Where(l => l.UserId == user.Id)
                .ToListAsync();

            // Calls a method to convert LoanApplicants to LoanApplicantDTOs
            var loanApplicationDto = loanApplications.Select(l => LoanApplicantToDTO(l)).ToList();

            return loanApplicationDto;
        }


        [HttpGet("getLoan/{id}")]
        public async Task<ActionResult<LoanApplicant>> GetLoanApplicant(int id)
        {
            var loanApplicant = await _context.LoanApplicants.Include(l => l.Users).FirstOrDefaultAsync(l => l.Id == id);

            if (loanApplicant == null)
            {
                return NotFound();
            }

            return loanApplicant;
        }

        [HttpGet("getLoanById/{loanId}")]
        public async Task<ActionResult<LoanApplicantDTO>> getLoanbyId(string loanId)
        {
            var loanApplicant = await _context.LoanApplicants.FirstOrDefaultAsync(l => l.LoanId == loanId);

            if (loanApplicant == null)
            {
                return NotFound();
            }
            var loanApplicantDto = new LoanApplicantDTO
            {

                ApplicantName = loanApplicant.ApplicantName,
                ApplicantEmail = loanApplicant.ApplicantEmail,
                ApplicantPhone = loanApplicant.ApplicantPhone,
                ApplicantAddress = loanApplicant.ApplicantAddress,
                Aadhar = loanApplicant.Aadhar,
                Pan = loanApplicant.Pan,
                Salary = loanApplicant.Salary,
                LoanId = loanApplicant.LoanId,
                LoanAmountRequired = loanApplicant.LoanAmountRequired,
                LoanRepaymentMonths = loanApplicant.LoanRepaymentMonths,
                IsApproved = loanApplicant.IsApproved

            };

            return loanApplicantDto;
        }

        private LoanApplicantDTO LoanApplicantToDTO(LoanApplicant loanApplicant)
        {
            return new LoanApplicantDTO
            {
                ApplicantName = loanApplicant.ApplicantName,
                ApplicantEmail = loanApplicant.ApplicantEmail,
                ApplicantPhone = loanApplicant.ApplicantPhone,
                ApplicantAddress = loanApplicant.ApplicantAddress,
                Aadhar = loanApplicant.Aadhar,
                Pan = loanApplicant.Pan,
                Salary = loanApplicant.Salary,
                LoanId = loanApplicant.LoanId,
                LoanAmountRequired = loanApplicant.LoanAmountRequired,
                LoanRepaymentMonths = loanApplicant.LoanRepaymentMonths,
                UserEmail = loanApplicant.Users.Email,
                IsApproved = loanApplicant.IsApproved
            };
        }

        [HttpGet("user/getLoanApplicantDocument/{loanId}")]
        public async Task<IActionResult> GetLoanApplicantDocument(string loanId)
        {
            // Find the loan applicant with the given loan ID
            var loanApplicant = await _context.LoanApplicants
                .Include(l => l.Documents) // Include the 'Documents' navigation property to load the associated document
                .FirstOrDefaultAsync(l => l.LoanId == loanId);

            // If the loan applicant does not exist, return a NotFound response
            if (loanApplicant == null)
            {
                return NotFound();
            }

            // If the loan applicant has a document associated, return the document
            if (loanApplicant.Documents != null)
            {
                // Create a memory stream to read the document data
                var documentStream = new MemoryStream(loanApplicant.Documents.DocumentUpload);

                // Return the document as a file with its content type and a suggested file name
                // The 'loan_document' will be the suggested file name when the user downloads the document
                return File(documentStream, loanApplicant.Documents.DocumentType, "loan_document");
            }

            // If no document is associated with the loan applicant, return a NotFound response
            return NotFound();
        }


        [HttpGet("user/viewLoan")]
        public async Task<ActionResult<IEnumerable<LoanApplicantDTO>>> GetLoanApplicants()
        {
            var email = "kshanmukha1501@gmail.com";
            // Get the user
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            // If no user is found, return a NotFound response
            if (user == null)
            {
                return Ok(new { message = "NotFound", data = false });
            }

            // Get the loan applications for this user that also have the same email
            var loanApplications = await _context.LoanApplicants
                .Where(l => l.UserId == user.Id)
                .ToListAsync();

            // Calls a method to convert LoanApplicants to LoanApplicantDTOs
            var loanApplicationDto = loanApplications.Select(l => LoanApplicantToDTO(l)).ToList();

            return loanApplicationDto;
        }


        private string GenerateLoanId()
        {
            var random = new Random();
            string loanId;
            do
            {
                loanId = string.Join("", Enumerable.Range(0, 8).Select(number => random.Next(0, 9).ToString()));
            } while (_context.LoanApplicants.Any(applicant => applicant.LoanId == loanId));

            return loanId;
        }
    }

}