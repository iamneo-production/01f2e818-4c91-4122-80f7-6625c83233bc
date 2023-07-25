using Microsoft.AspNetCore.Mvc;
using Moq;
using WebApp.Controllers;
using WebApp.Infrastructure;
using WebApp.Models;
using System.Collections.Generic;
using System.Linq;
using Xunit;
 
namespace WebAppTest
{
    public class LoanControllerTest
    {
        [Fact]
        public void Test_GET_AllLoans()
        {
            // Arrange
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.Loans).Returns(Multiple());
            var controller = new LoanController(mockRepo.Object);
 
            // Act
            var result = controller.Get();
 
            // Assert
            var model = Assert.IsAssignableFrom<IEnumerable<Loan>>(result);
            Assert.Equal(3, model.Count());
        }
 
        private static IEnumerable<Loan> Multiple()
        {
            var r = new List<Loan>();
            r.Add(new Loan()
            {
                loanId = 01,
                loantype = "ABC",
                applicantName = "ABC",
                applicantAddress = "chennai",
                applicantMobile = "9876543210",
                applicantEmail = "abc@gmail.com",
                applicantAadhaar = "356484590214",
                applicantPan = "ABC5657RS",
                applicantSalary = "20000",
                loanAmountRequired = "500000",
                loanRepaymentMonths = "36"
            });
            r.Add(new Loan()
            {
                loanId = 02,
                loantype = "ABC",
                applicantName = "ABC",
                applicantAddress = "chennai",
                applicantMobile = "9876543210",
                applicantEmail = "abc@gmail.com",
                applicantAadhaar = "356484590214",
                applicantPan = "ABC5657RS",
                applicantSalary = "20000",
                loanAmountRequired = "500000",
                loanRepaymentMonths = "36"
            });
            r.Add(new Loan()
            {
                loanId = 03,
                loantype = "ABC",
                applicantName = "ABC",
                applicantAddress = "chennai",
                applicantMobile = "9876543210",
                applicantEmail = "abc@gmail.com",
                applicantAadhaar = "356484590214",
                applicantPan = "ABC5657RS",
                applicantSalary = "20000",
                loanAmountRequired = "500000",
                loanRepaymentMonths = "36"
            });
            return r;
        }

        [Fact]
        public void Test_POST_AddLoan()
        {
            // Arrange
            Loan r = new Loan()
            {
                loanId = 04,
                loantype = "ABC",
                applicantName = "ABC",
                applicantAddress = "chennai",
                applicantMobile = "9876543210",
                applicantEmail = "abc@gmail.com",
                applicantAadhaar = "356484590214",
                applicantPan = "ABC5657RS",
                applicantSalary = "20000",
                loanAmountRequired = "500000",
                loanRepaymentMonths = "36"
            };
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.AddLoan(It.IsAny<Loan>())).Returns(r);
            var controller = new LoanController(mockRepo.Object);
        
            // Act
            var result = controller.Post(r);
        
            // Assert
            var loan = Assert.IsType<Loan>(result);
            Assert.Equal(04, loan.loanId);
            Assert.Equal("prepaid", loan.loantype);
            Assert.Equal("ABC", loan.applicantName);
            Assert.Equal("28", loan.applicantAddress);
            Assert.Equal("XYZ", loan.applicantMobile);
            Assert.Equal("179", loan.applicantEmail);
            Assert.Equal("179", loan.applicantAadhaar);
            Assert.Equal("179", loan.applicantPan);
            Assert.Equal("179", loan.applicantSalary);
            Assert.Equal("179", loan.loanAmountRequired);
            Assert.Equal("179", loan.loanRepaymentMonths);


        }

        [Fact]
        public void Test_PUT_UpdateLoan()
        {
            // Arrange
            Loan r = new Loan()
            {
                loanId = 01,
                loantype = "ABC",
                applicantName = "new ABC",
                applicantAddress = "chennai",
                applicantMobile = "9876543210",
                applicantEmail = "abc@gmail.com",
                applicantAadhaar = "356484590214",
                applicantPan = "ABC5657RS",
                applicantSalary = "20000",
                loanAmountRequired = "500000",
                loanRepaymentMonths = "36"
            };
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.UpdateLoan(It.IsAny<Loan>())).Returns(r);
            var controller = new LoanController(mockRepo.Object);
        
            // Act
            var result = controller.Put(r);
        
            // Assert
            var loan = Assert.IsType<Loan>(result);
            Assert.Equal(01, loan.loanId);
            Assert.Equal("prepaid", loan.loantype);
            Assert.Equal("new ABC", loan.applicantName);
            Assert.Equal("28", loan.applicantAddress);
            Assert.Equal("XYZ", loan.applicantMobile);
            Assert.Equal("179", loan.applicantEmail);
            Assert.Equal("179", loan.applicantAadhaar);
            Assert.Equal("179", loan.applicantPan);
            Assert.Equal("179", loan.applicantSalary);
            Assert.Equal("179", loan.loanAmountRequired);
            Assert.Equal("179", loan.loanRepaymentMonths);
        }

        [Fact]
        public void Test_DELETE_Loan()
        {
            // Arrange
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.DeleteLoan(It.IsAny<int>())).Verifiable();
            var controller = new LoanController(mockRepo.Object);
        
            // Act
            controller.Delete(3);
        
            // Assert
            mockRepo.Verify();
        }
    }
}
