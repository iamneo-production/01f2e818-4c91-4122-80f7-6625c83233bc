import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import { Card, Navbar, Nav, Button, Alert } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext';
import './Appliedloans.css'

function Adminappliedloans() {
  const [applicants, setApplicants] = useState([]);
  const [loanStatus, setLoanStatus] = useState({});

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
        axios.get('https://8080-eccfaacddbcfabeedbdebdadabbccceefdfb.project.examly.io/admin/getAllLoans')
            .then(res => {
              setApplicants(res.data)
              console.log(applicants)});
    }, []);

    const approveLoan = (id) => {
      fetch(`https://8080-eccfaacddbcfabeedbdebdadabbccceefdfb.project.examly.io/admin/approve/${id}`, {
        method: 'PUT'
      }).then(() => {
        console.log('Done')
        setLoanStatus({...loanStatus, [id]: "approved"});
        setTimeout(() => {
          setLoanStatus({...loanStatus, [id]: null});
        }, 5000);
      });
    };
  
    const rejectLoan = (id) => {
      fetch(`https://8080-eccfaacddbcfabeedbdebdadabbccceefdfb.project.examly.io/admin/reject/${id}`, {
        method: 'PUT'
      }).then(() => {
        setLoanStatus({...loanStatus, [id]: "rejected"});
        setTimeout(() => {
          setLoanStatus({...loanStatus, [id]: null});
        }, 5000);
      });
    };

    const handleLogout = () => {
      setIsAuthenticated(false); // clear authentication status
      localStorage.removeItem('email'); // clear user info in local storage
      navigate('/'); // navigate back to home or login page
    }

    const FileDownload = (data, filename) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    };

    const handleDownloadDocument = async (loanId) => {
      try {
        const response = await axios.get(`https://8080-eccfaacddbcfabeedbdebdadabbccceefdfb.project.examly.io/user/getLoanApplicantDocument/${loanId}`, { responseType: 'blob' });
  
        const contentDisposition = response.headers['content-disposition'];
        const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
        const fileName = fileNameMatch && fileNameMatch[1] ? fileNameMatch[1] : 'loan_document.pdf';
  
        FileDownload(response.data, fileName);
      } catch (error) {
        console.log('Error downloading document:', error);
        alert('Error downloading document. Please try again later.');
      }
    };

    return (
      <>
      <div className='most'>
      <Navbar className='text-light bg-primary'  >
                <Navbar.Brand as={Link} to="/admin" className="brand-container">
                   <h3> Agriculture Loan Management Application</h3> 
                </Navbar.Brand>
                <Nav className="navbar-nav ml-auto mx-auto nav-types text-light">
                    <Nav.Link as={Link} className='text-warning fw-bolder fs-3' to="/Appliedloans">Applied Loans</Nav.Link>
                    <Nav.Link as={Link} to="/LoanDetails">Loan Details</Nav.Link>
                    <Nav.Link as={Link} to="/">Logout</Nav.Link>
                </Nav>
                
            <Outlet />
            </Navbar>
       
        
        <div className="container mt-4 ">
      {applicants.map(applicant =>
        <div className="card bg-light text-center mt-3" key={applicant.Id} style={{margin: '0 auto', maxWidth: '90%'}}>
          <div className="card-header bg-info fs-3 fw-bold ">
            Loan Information
          </div>
          <div className="card-body " style={{margin: '1cm', paddingBottom:'10px'}}>
            <div className="row">
              <div className="col" style={{textAlign: 'left', paddingLeft: '2.5cm'}}>
              <p className="card-text"><strong>Applicant Name: </strong>{applicant.ApplicantName}</p>
                <p className="card-text"><strong>Applicant Email: </strong>{applicant.ApplicantEmail}</p>
                <p className="card-text"><strong>Applicant Phone: </strong>{applicant.ApplicantPhone}</p>
                <p className="card-text"><strong>Applicant Aadhar: </strong>{applicant.Aadhar}</p>
                <p className="card-text"><strong>Applicant Pan: </strong>{applicant.Pan}</p>
              </div>
              <div className="col" style={{textAlign: 'left', paddingLeft: '4.5cm'}}>
                <p className="card-text"><strong>Applicant Address: </strong>{applicant.ApplicantAddress}</p>
                <p className="card-text"><strong>Loan ID: </strong>{applicant.LoanId}</p>
                <p className="card-text"><strong>Applicant Salary: </strong>{applicant.Salary}</p>
                <p className="card-text"><strong>Loan Amount Required: </strong>{applicant.LoanAmountRequired}</p>
              </div>
            </div>
            {loanStatus[applicant.LoanId] === "approved" && <Alert style={{margin: '20px'}} variant="success">This loan has been approved</Alert>}
            {loanStatus[applicant.LoanId] === "rejected" && <Alert style={{margin: '20px'}} variant="danger">This loan has been rejected</Alert>}
            <div className="d-flex justify-content-center mt-3">
              <Button variant="success" onClick={() => approveLoan(applicant.LoanId)} style={{ marginRight: '10px' }}>Approve</Button>
              <Button variant="danger" onClick={() => rejectLoan(applicant.LoanId)} style={{ marginLeft: '10px' }}>Reject</Button>
            </div>
            <div className="loanStatus-value pt-3">
                  <button className='btn btn-primary ' onClick={() => handleDownloadDocument(applicant.LoanId)}>Download Document</button>
              </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
    );
};

export default Adminappliedloans