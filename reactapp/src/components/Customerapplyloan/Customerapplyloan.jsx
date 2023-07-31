import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ApplyloanAuth from "../Auth/ApplyloanAuth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./Applyloan.css";

function Customerapplyloan() {
  const [values, setValues] = useState({
    ApplicantAddress: "",
    ApplicantEmail: "",
    ApplicantPhone: "",
    ApplicantName: "",
    LoanRepaymentMonths: "",
    Salary: "",
    Aadhar: "",
    Pan: "",
    LoanAmountRequired: "",
    UserEmail: localStorage.getItem("email"),
    DocumentType: "",
    DocumentUpload: null,
    AppliedTime:""
  });
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [touched, setTouched] = useState(false); // Add this line

  const [errors, setError] = useState("");

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];

    if (file.size > 2000000) {
      // 2mb in bytes
      alert("File size should be 2mb or less");
    } else if (
      !["image/jpeg", "image/png", "application/pdf"].includes(file.type)
    ) {
      alert("File format should be JPEG, PNG, or PDF");
    } else {
      setValues((prev) => ({ ...prev, DocumentUpload: file }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);
    const validationErrors = ApplyloanAuth(values);
    setError(validationErrors);
    if (
      validationErrors.ApplicantAddress === "" &&
      validationErrors.ApplicantEmail === "" &&
      validationErrors.ApplicantPhone === "" &&
      validationErrors.ApplicantName === "" &&
      validationErrors.LoanRepaymentMonths === ""
    ) {
      // Create a FormData instance to hold the form values
      const formData = new FormData();

      // Append each property of the values object into the FormData
      Object.keys(values).forEach((key) => {
        if (key !== "DocumentUpload") {
          formData.append(key, values[key]);
        }
      });

      // Append file separately
      if (values.DocumentUpload) {
        formData.append("DocumentUpload", values.DocumentUpload);
      }

      formData.append("AppliedTime", new Date().toISOString());
      console.log(values);
      axios
        .post(
          "https://8080-eccfaacddbcfabeedbdebdadabbccceefdfb.project.examly.io/user/addLoan",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("Success");
          const loanId = res.data; // Assuming the API response contains the loan ID
          navigate("/Loanid", { state: { loanId } }); // Navigate to the success page with the loan ID as state
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 409) {
            alert("An application from this email has already been submitted.");
          } else {
            console.error(
              "Error:",
              err.response.status,
              err.response.statusText
            );
          }
        });
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    setTouched(true);
    const validationErrors = ApplyloanAuth(values);
    setError(validationErrors);
    if (
      validationErrors.ApplicantAddress === "" &&
      validationErrors.ApplicantEmail === "" &&
      validationErrors.ApplicantPhone === "" &&
      validationErrors.ApplicantName === "" &&
      validationErrors.LoanRepaymentMonths === ""
    ) {
      setCurrentPage(2);
    }
  };

  const handlePageChange = (page) => {
    // this prevents users from going to the next page if there are any errors
    if (
      page > currentPage &&
      Object.values(errors).some((error) => error !== "")
    ) {
      alert("Please correct the errors before proceeding.");
    } else {
      setCurrentPage(page);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // clear authentication status
    localStorage.removeItem("email"); // clear user info in local storage
    navigate("/"); // navigate back to home or login page
  };

  useEffect(() => {
    setError("");
    setTouched(false);
  }, [currentPage]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-color mx-auto  ">
        <Link to="/home" className="navbar-brand">
          Agriculture Loan
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mx-auto">
            <li className="nav-item">
              <Link
                to="/Applyloan"
                className="nav-link text-warning fw-bolder fs-3"
                id="Applyloan"
              >
                Apply Loan
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Loanstatus" className="nav-link" id="loanstatus">
                Loan Status
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Profile" className="nav-link" id="profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                id="logout"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>

        <Outlet />
      </nav>

      <div className="ApplyloanPage">
       
          <form className="orientation" onSubmit={currentPage === 1 ? handleNext : handleSubmit}>
            {currentPage === 1 ? (
              <>

                <div class="row  g-3">
                  <div className=" col  ">
                  <label for="formGroupExampleInput" className="form-label text-light">Applicant Name :</label>
                    <input
                      type="text"
                      id="enterName"
                      placeholder="Enter Applicant Name"
                      name="ApplicantName"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.ApplicantName && (
                      <label className="text-danger">
                        {errors.ApplicantName}
                      </label>
                    )}
                  </div>
                  <div className="col ">
                  <label for="formGroupExampleInput" className="form-label text-light">Applicant Address :</label>
                    <input
                      type="text"
                      id="enterAddress"
                      placeholder="Enter Applicant Address"
                      name="ApplicantAddress"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.ApplicantAddress && (
                      <label className="text-danger">
                        {errors.ApplicantAddress}
                      </label>
                    )}
                  </div>
                  <div className="col ">
                  <label for="formGroupExampleInput" className="form-label text-light">Applicant Mobilenumber :</label>
                    <input
                      type="text"
                      id="enterMobile"
                      placeholder="Enter Applicant Mobilenumber"
                      name="ApplicantPhone"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.ApplicantPhone && (
                      <label className="text-danger">
                        {errors.ApplicantPhone}
                      </label>
                    )}
                  </div>
                </div>

                <div class="row g-3 mt-3">
                  <div className="col mr-5">
                  <label for="formGroupExampleInput" className="form-label text-light">Applicant Email ID :</label>
                    <input
                      type="email"
                      id="enterEmail"
                      placeholder="Enter Applicant Email"
                      name="ApplicantEmail"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.ApplicantEmail && (
                      <label className="text-danger">
                        {errors.ApplicantEmail}
                      </label>
                    )}
                  </div>
                  <div className="col ">
                  <label for="formGroupExampleInput" className="form-label text-light">Applicant Aadhar Number :</label>
                    <input
                      type="text"
                      id="enterAadharNo"
                      placeholder="Enter Applicant Aadhar Number"
                      name="Aadhar"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.Aadhar && (
                      <label className="text-danger">{errors.Aadhar}</label>
                    )}
                  </div>
                  <div className="col ">
                  <label for="formGroupExampleInput" className="form-label text-light">Applicant PAN Number :</label>
                    <input
                      type="text"
                      id="enterPanNo"
                      placeholder="Enter Applicant Pan Number"
                      name="Pan"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.Pan && (
                      <label className="text-danger">{errors.Pan}</label>
                    )}
                  </div>
                </div>

                <div class="row g-3 mt-3">
                  <div className="col mr-3">
                  <label for="formGroupExampleInput" className="form-label text-light">Applicant Salary :</label>
                    <input
                      type="text"
                      id="enterSalary"
                      placeholder="Enter Applicant Salary"
                      name="Salary"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.Salary && (
                      <label className="text-danger">{errors.Salary}</label>
                    )}
                  </div>
                  <div className="col ">
                  <label for="formGroupExampleInput" className="form-label text-light">Loan Amount Required :</label>
                    <input
                      type="text"
                      id="enterAmount"
                      placeholder="Enter Loan Amount"
                      name="LoanAmountRequired"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.LoanAmountRequired && (
                      <label className="text-danger">
                        {errors.LoanAmountRequired}
                      </label>
                    )}
                  </div>
                  <div className="col ">
                  <label for="formGroupExampleInput" className="form-label text-light">Repayment Months :</label>
                    <input
                      type="text"
                      id="enterMonths"
                      placeholder="Enter Repayment Months"
                      name="LoanRepaymentMonths"
                      onChange={handleInput}
                      className="form-control rounded-3"
                      autoComplete="off"
                    />
                    {touched && errors.LoanRepaymentMonths && (
                      <label className="text-danger">
                        {errors.LoanRepaymentMonths}
                      </label>
                    )}
                  </div>
                </div>

              

                <div>
                  <button
                    type="submit"
                    className="btn btn-success w-100 rounded-0 mt-4"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label
                    htmlFor="selectDocumentType"
                    className="form-label text-light"
                  >
                    Upload Documents(Mandatory *)
                  </label>
                  <select
                    id="selectDocumentType"
                    name="DocumentType"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select document type</option>
                    <option value="Images">Images (JPEG or PNG)</option>
                    <option value="Document">Document (PDF)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="chooseFile" className="form-label text-light">
                    Images or Documents (Upload upto 2MB)
                  </label>
                  <input
                    type="file"
                    id="chooseFile"
                    name="DocumentUpload"
                    onChange={handleFileInput}
                    accept=".jpeg,.png,.jpg,.pdf"
                    className="form-control"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-success w-100 rounded-0"
                  >
                    Apply for Loan
                  </button>
                </div>
              </>
            )}
            <nav aria-label="Page navigation example" className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(1)}
                  >
                    Previous
                  </button>
                </li>
                <li
                  className={`page-item ${currentPage === 2 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => handleNext}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
            
            <Outlet />
          </form>
       
      </div>
    </>
  );
}

export default Customerapplyloan;
