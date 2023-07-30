
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Interfaces.Services;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly ProductDBContext _context;
        public AdminController(ProductDBContext context)
        {
            _context = context;
        }

        [HttpGet("admin/getAllLoans")]
        public async Task<ActionResult<IEnumerable<LoanApplicantDTO>>> getAllLoans()
        {
            List<LoanApplicant> loanApplicants = await _context.LoanApplicants.ToListAsync();

            List<LoanApplicantDTO> loanApplicantDTOs = new List<LoanApplicantDTO>();

            foreach (var loanApplicant in loanApplicants)
            {
                var dto = new LoanApplicantDTO
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
                loanApplicantDTOs.Add(dto);
            }

            return Ok(loanApplicantDTOs);

        }

        
        [HttpPut("admin/approve/{loanId}")]
        public async Task<IActionResult> ApproveLoan(string loanId)
        {
            var loanApplicant = await _context.LoanApplicants.FirstOrDefaultAsync(l => l.LoanId == loanId);
            if (loanApplicant == null)
            {
                return NotFound();
            }

            loanApplicant.IsApproved = true;

            _context.Entry(loanApplicant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanApplicantExists(loanId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }
        //Request
        
        //Respone


        [HttpPut("admin/reject/{loanId}")]
        public async Task<IActionResult> RejectLoan(string loanId)
        {
            var loanApplicant = await _context.LoanApplicants.FirstOrDefaultAsync(l => l.LoanId == loanId);
            if (loanApplicant == null)
            {
                return NotFound();
            }

            loanApplicant.IsApproved = false;

            _context.Entry(loanApplicant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanApplicantExists(loanId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpDelete("admin/deleteLoan/{loanId}")]
        public async Task<IActionResult> DeleteLoanApplicant(string loanId)
        {
            if (_context.LoanApplicants == null)
            {
                return NotFound();
            }
            var loanApplicant = await _context.LoanApplicants.FirstOrDefaultAsync(l => l.LoanId == loanId);
            if (loanApplicant == null)
            {
                return NotFound();
            }

            _context.LoanApplicants.Remove(loanApplicant);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("admin/generateSchedule")]
        public async Task<IActionResult> generateSchedule()
        {
            
            return Ok("Done");
        }

        private bool LoanApplicantExists(string id)
        {
            return _context.LoanApplicants.Any(e => e.LoanId == id);
        }
    }
}
