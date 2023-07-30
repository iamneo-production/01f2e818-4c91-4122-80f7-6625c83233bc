import React, { useContext } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Loanid.css'
import { AuthContext } from '../../AuthContext';

function Loanid() {

    const location = useLocation();
    const loanId = location.state && location.state.loanId;

    const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated)
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false); // clear authentication status
        localStorage.removeItem('email'); // clear user info in local storage
        navigate('/'); // navigate back to home or login page
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-color mx-auto ApplyloanHead">
                    
                    <Link to="/home" className="navbar-brand">Agriculture Loan</Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto mx-auto">
                                <li className="nav-item">
                                    <Link to="/Applyloan" className="nav-link" id='Applyloan'><h4>Apply Loan</h4></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Loanstatus" className="nav-link" id='loanstatus'>Loan Status</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Profile" className="nav-link" id='profile'>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" id='logout' onClick={handleLogout}>Logout</Link>
                                </li>
                            </ul>
                            
                        </div>
                    
                    <Outlet />
                </nav>
            

            <div className='d-flex justify-content-center align-items-center vh-120 ApplyloanPage'>
            <div className='p-1 rounded w-40 ApplyloanForm'>
                <h1 className='text-light'>Thank You For Applying The Loan </h1>
                <h1 className='text-light'>We Will Get Back To You Soon!..</h1>
                <h4 className='text-light pt-3'>Your Loan ID: <strong>{loanId}</strong></h4>
            </div>
            </div>

       </>
    )
}

export default Loanid