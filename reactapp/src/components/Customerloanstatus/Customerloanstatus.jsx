import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import './LoanStatus.css';

function Customerloanstatus(){

    const [loans, setLoans] = useState(null);
    const [loanId, setLoanId] = useState("");
    const [loanDetails, setLoanDetails] = useState(null);
    const email = localStorage.getItem("email");

    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();


    const fetchLoanStatus = async () => {
        await axios.get(`https://8080-cdfbadaabbeabbcfdaafcbdaebccfbaabccd.project.examly.io/user/viewLoan/${email}`)
        .then(res => {
            console.log("Server response:", res)
            if (res.status === 200) {
            setLoans(res.data);
            } 
            else {
            alert("Error fetching Loan status!");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchLoanStatus();
    }, []);

    const trackLoan = () => {
        axios.get(`https://8080-cdfbadaabbeabbcfdaafcbdaebccfbaabccd.project.examly.io/getLoanById/${loanId}`)
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                setLoanDetails(res.data);
            }
            else {
                alert("Error fetching Loan Details!")
            }
        }).catch((err) => {
            console.log(err);
        });
        console.log("Tracking loan with ID: ", loanId);
    }

    const handleInputChange = (event) => {
        setLoanId(event.target.value);
    }

    const handleLogout = () => {
      setIsAuthenticated(false); // clear authentication status
      localStorage.removeItem('email'); // clear user info in local storage
      navigate('/'); // navigate back to home or login page
    }

    return(
        <>
            <div className='body'>
            <div><br /></div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto LoanidHead">
                <div className="container-fluid">
                <a className="navbar-brand">Bussines Loan</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                        <Link to="/Applyloan" className="nav-link" id='Applyloan'>Apply Loan</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/Loanstatus" className="nav-link" id='loanstatus'><h4>Loan Status</h4></Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/Profile" className="nav-link" id='profile'>Profile</Link>
                        </li>
                    </ul>
                    <Link to="/" className="nav-link" id='logout' onClick={handleLogout}>Logout</Link>
                    </div>
                </div>
                <Outlet />
                </nav>
            </div>
            <div className='loanStatus-container'>
              <div className="track-bar">
                <h3>Track your Loan Application</h3>
                <div>
                </div>    
                <input type="text" value={loanId} onChange={(e) => setLoanId(e.target.value)} placeholder="Enter Loan ID"/>
                <button onClick={trackLoan}>Track</button>
              </div>
            {loanDetails && (
                <div className="loanStatus-card">
                    <span onClick={() => setLoanDetails(null)} className="loanStatus-exit">Exit</span> {/* Exit symbol to close the loan details card */}
                    {/* Display loan details */}
                    <div className="loanStatus-row">
              <div className="loanStatus-column">
                <div className="loanStatus-value">Applicant Name: {loanDetails.ApplicantName}</div>
                <div className="loanStatus-value">Applicant Phone No: {loanDetails.ApplicantPhone}</div>
                <div className="loanStatus-value">Applicant Email: {loanDetails.ApplicantEmail}</div>
                <div className="loanStatus-value">Applicant Address: {loanDetails.ApplicantAddress}</div>
              </div>
              <div className="loanStatus-column">
                <div className="loanStatus-value">Applicant Aadhar No: {loanDetails.Aadhar}</div>
                <div className="loanStatus-value">Applicant Pan No: {loanDetails.Pan}</div>
                <div className="loanStatus-value">Applicant Salary: {loanDetails.Salary}</div>
                <div className="loanStatus-value">Applicant LoanId: {loanDetails.LoanId}</div>
                <div className={`loanStatus-status ${loanDetails.IsApproved === null ? "pending" : (loanDetails.IsApproved ? "approved" : "rejected")}`}>
                                Status: {loanDetails.IsApproved === null ? "Approval Pending" : (loanDetails.IsApproved ? "Approved" : "Rejected")}
                </div>
              </div>
            </div>
                </div>
            )}
        {loans && loans.map((loan, index) => (
          <div className="loanStatus-card" key={index}>
            <h3>Loan Application {index + 1}</h3>
            <div className="loanStatus-row">
              <div className="loanStatus-column">
                <div className="loanStatus-value">Applicant Name: {loan.ApplicantName}</div>
                <div className="loanStatus-value">Applicant Phone No: {loan.ApplicantPhone}</div>
                <div className="loanStatus-value">Applicant Email: {loan.ApplicantEmail}</div>
                <div className="loanStatus-value">Applicant Address: {loan.ApplicantAddress}</div>
              </div>
              <div className="loanStatus-column">
                <div className="loanStatus-value">Applicant Aadhar No: {loan.Aadhar}</div>
                <div className="loanStatus-value">Applicant Pan No: {loan.Pan}</div>
                <div className="loanStatus-value">Applicant Salary: {loan.Salary}</div>
                <div className="loanStatus-value">Applicant LoanId: {loan.LoanId}</div>
                <div className={`loanStatus-value ${loan.IsApproved === null ? "pending" : (loan.IsApproved ? "approved" : "rejected")}`}>Status: {loan.IsApproved === null ? "Approval Pending" : (loan.IsApproved ? "Approved" : "Rejected")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
        </>
    )
}

export default Customerloanstatus