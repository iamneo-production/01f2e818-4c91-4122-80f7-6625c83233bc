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
        <div className='body'>
           <Navbar className='text-light bg-primary'  >
                <Navbar.Brand as={Link} to="/admin" className="brand-container">
                   <h3 className="text-warning fw-bolder"> Agriculture Loan Management Application</h3> 
                </Navbar.Brand>
                <Nav className="navbar-nav ml-auto mx-auto nav-types text-light">
                    <Nav.Link as={Link} to="/Appliedloans">Applied Loans</Nav.Link>
                    <Nav.Link as={Link} to="/LoanDetails">Loan Details</Nav.Link>
                    <Nav.Link as={Link} to="/">Logout</Nav.Link>
                </Nav>
                
            <Outlet />
            </Navbar>
            <main>
        <div className="album py-5 ">
          <div className="container container-top">
            <div className="row row-cols-5 row-cols-sm-2 row-cols-md-3 ">
              <div className="col">
                <div className="card bg-warning shadow-lg">
                  <div className="card-body">
                    <h1>Applied Loans</h1>
                    <hr className="bg-dark"/>
                      <p className="card-text">The Loans which are applied by customer can be able to view or edit .</p>
                      <hr className="bg-dark"/>
                        <div className="d-flex justify-content-between align-items-center">
                          <Link to="/Appliedloans" type="button" className="btn btn-lg btn-dark">GO</Link >
                          <small className="text-dark">Lets go</small>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="col">
                  <div className="card bg-primary shadow-lg">
                    <div className="card-body text-light">
                      <h1>Loan Details</h1>
                      <hr className="bg-dark"/>
                        <p className="card-text text-">The Loans which are applied by customer can be able to view or edit .</p>
                        <hr className="bg-light"/>
                          <div className="d-flex justify-content-between align-items-center">
                            <Link to="/LoanDetails" type="button" className="btn btn-lg btn-light">GO </Link>
                            <small className="text-light">Lets go</small>
                          </div>
                        </div>
                      </div>
                  </div>

                 

                  </div>
                </div>
              </div>
            </main>
        </div>
    )
}

export default Admin