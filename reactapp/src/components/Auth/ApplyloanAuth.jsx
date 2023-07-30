function ApplyloanAuth(values) {
    let error={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobilenumber_pattern = /^[0-9]{10}$/
    const aadhar_pattern = /^[0-9]{12}$/
    const pan_pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    const salary_pattern= /^[0-9]*$/
    const amount_pattern= /^[0-9]*$/
    const repay_pattern= /^[0-9]*$/
  
    if (!values.ApplicantPhone) {
        error.ApplicantPhone= "Mobile number can't be empty";
    } else if (!mobilenumber_pattern.test(values.ApplicantPhone)) {
        error.ApplicantPhone = "Invalid mobile number format";
    } else {
        error.ApplicantPhone="";
    }
  
    if(!values.ApplicantName) {
        error.ApplicantName="Name can't be empty";
    } else {
        error.ApplicantName="";
    }
  
    if(!values.ApplicantEmail) {
        error.ApplicantEmail="Email can't be empty";
    } else if(!email_pattern.test(values.ApplicantEmail)) {
        error.ApplicantEmail="Invalid ApplicantEmail format";
    } else {
        error.ApplicantEmail="";
    }
  
    if(!values.Aadhar) {
        error.Aadhar="Aadhar number can't be empty";
    } else if(!aadhar_pattern.test(values.Aadhar)) {
        error.Aadhar="Invalid aadhar number format";
    } else {
        error.Aadhar="";
    }
  
    if(!values.Pan) {
        error.Pan="PAN number can't be empty";
    } else if(!pan_pattern.test(values.Pan)) {
        error.Pan="Invalid PAN number format";
    } else {
        error.Pan="";
    }
  
    if (!values.ApplicantAddress) {
        error.ApplicantAddress="Address can't be empty";
    } else {
        error.ApplicantAddress="";
    }
  
    if (!values.Salary) {
        error.Salary="Salary can't be empty";
    } else if(!salary_pattern.test(values.Salary)) {
        error.Salary="Invalid Salary format";
    } 
    else {
        error.Salary="";
    }
  
    if (!values.LoanAmountRequired) {
        error.LoanAmountRequired="Amount can't be empty";
    } else if(!amount_pattern.test(values.LoanAmountRequired)) {
        error.LoanAmountRequired="Invalid amount format";
    }
    else {
        error.LoanAmountRequired="";
    }
  
    if (!values.LoanRepaymentMonths) {
        error.LoanRepaymentMonths="Number of LoanRepaymentMonths can't be empty";
    } else if(!repay_pattern.test(values.LoanRepaymentMonths)) {
        error.LoanRepaymentMonths="Invalid month format";
    }
    else {
        error.LoanRepaymentMonths="";
    }
    return error;
  }

  
  export default ApplyloanAuth;