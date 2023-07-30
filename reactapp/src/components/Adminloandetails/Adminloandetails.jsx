import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import { Card, Navbar, Nav, Button, Alert, Modal } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext';
import './LoanDetails.css'

function Adminloandetails() {
    const [loans, setLoans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loanToDelete, setLoanToDelete] = useState(null);

    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const fetchLoans = async () => {
         axios.get('https://8080-dadefbdfbeaeecfabeedbdebdadabbccceefdfb.project.examly.io/admin/getAllLoans')
        .then(response => {
            var res = response.data
            setLoans(res.filter(loan => loan.IsApproved !== null))})
    }

    useEffect(() => {
        fetchLoans();
    }, []);

    const handleDelete = () => {
        console.log('active1')
        deleteLoan(loanToDelete);
        setShowModal(false);
    };

    const deleteLoan = async (id) => {
        console.log(id,'active2')
        axios.delete(`https://8080-dadefbdfbeaeecfabeedbdebdadabbccceefdfb.project.examly.io/admin/deleteLoan/${id}`)
        .then(res => {
            if(res.status === 200){
                fetchLoans();
            }
            else {alert('Failed to Delete Loan!')}
        }).catch(e => {
            console.log(e)
        })     
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
            {loans.map(loan =>
                <Card className="my-3 shadow" key={loan.Id}>
                    <Card.Body style={{textAlign: 'left'}}>
                        <div className="row">
                            <div className="col-sm-6">
                                <p className="card-text"><strong>Applicant Name: </strong>{loan.ApplicantName}</p>
                                <p className="card-text"><strong>Email: </strong>{loan.ApplicantEmail}</p>
                                <p className="card-text"><strong>Phone: </strong>{loan.ApplicantPhone}</p>
                                <p className="card-text"><strong>Aadhar: </strong>{loan.Aadhar}</p>
                                <p className="card-text"><strong>Salary: </strong>{loan.Salary}</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="card-text"><strong>Address: </strong>{loan.ApplicantAddress}</p>
                                <p className="card-text"><strong>Loan ID: </strong>{loan.LoanId}</p>
                                <p className="card-text"><strong>Pan: </strong>{loan.Pan}</p>
                                <p className="card-text"><strong>Loan Amount Required: </strong>{loan.LoanAmountRequired}</p>
                                <p className="card-text"><strong>Status: </strong>{loan.IsApproved ? "Approved" : "Rejected"}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-3 mr-2">
                            <Button variant="danger" onClick={() => { setShowModal(true); setLoanToDelete(loan.LoanId); }} className="mr-4" data-backdrop="false">Delete Loan</Button>
                        </div>
                    </Card.Body>

                </Card>
            )}
            
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Loan</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this loan?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default Adminloandetails