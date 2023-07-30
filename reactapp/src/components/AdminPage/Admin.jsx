import React, { useState, useEffect, useContext } from "react";
import './admin.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { AuthContext } from '../../AuthContext';

function Admin() {

    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false); // clear authentication status
        localStorage.removeItem('email'); // clear user info in local storage
        navigate('/'); // navigate back to home or login page
      }

    return(
        <div className='body'><div><br/></div>
           <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/admin" className="brand-container">
                    Business Loan Management 
                    <br />
                    <span className="brand-subtext">Admin</span>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/Appliedloans">Applied Loans</Nav.Link>
                    <Nav.Link as={Link} to="/LoanDetails">Loan Details</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Button className="logout-btn" variant="outline-light" as={Link} to="/" onClick={handleLogout}>Logout</Button>
                </Nav>
            <Outlet />
            </Navbar>

        </div>
    )
}

export default Admin