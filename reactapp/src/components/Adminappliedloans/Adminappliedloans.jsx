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
        axios.get('https://8080-dadefbdfbeaeecfabeedbdebdadabbccceefdfb.project.examly.io/admin/getAllLoans')
            .then(res => {
              setApplicants(res.data)
              console.log(applicants)});
    }, []);

    const approveLoan = (id) => {
      fetch(`https://8080-dadefbdfbeaeecfabeedbdebdadabbccceefdfb.project.examly.io/admin/approve/${id}`, {
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
      fetch(`https://8080-dadefbdfbeaeecfabeedbdebdadabbccceefdfb.project.examly.io/admin/reject/${id}`, {
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

    return (
      <>
      <div className='body'><div><br/></div>
      <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/admin" className="brand-container">
                    Business Loan Management 
                    <br />
                    <span className="brand-subtext">Admin</span>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/AppliedLoans">Applied Loans</Nav.Link>
                    <Nav.Link as={Link} to="/LoanDetails">Loan Details</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Button className="logout-btn" variant="outline-light" as={Link} to="/" onClick={handleLogout}>Logout</Button>
                </Nav>
            <Outlet />
            </Navbar>
        </div>
        <div className="container mt-4">
      {applicants.map(applicant =>
        <div className="card text-center" key={applicant.Id} style={{margin: '0 auto', maxWidth: '90%'}}>
          <div className="card-header">
            Loan Information
          </div>
          <div className="card-body" style={{margin: '1cm', paddingBottom:'10px'}}>
            <div className="row">
              <div className="col-sm-6" style={{textAlign: 'left', paddingLeft: '2.5cm'}}>
              <p className="card-text"><strong>Applicant Name: </strong>{applicant.ApplicantName}</p>
                <p className="card-text"><strong>Applicant Email: </strong>{applicant.ApplicantEmail}</p>
                <p className="card-text"><strong>Applicant Phone: </strong>{applicant.ApplicantPhone}</p>
                <p className="card-text"><strong>Applicant Aadhar: </strong>{applicant.Aadhar}</p>
                <p className="card-text"><strong>Applicant Pan: </strong>{applicant.Pan}</p>
              </div>
              <div className="col-sm-6" style={{textAlign: 'left', paddingLeft: '4.5cm'}}>
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
          </div>
        </div>
      )}
    </div>
    </>
    );
};

export default Adminappliedloans