import React, { useContext } from 'react'
import './HomePage.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext';

function HomePage() {

    const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated)
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false); // clear authentication status
        localStorage.removeItem('email'); // clear user info in local storage
        navigate('/'); // navigate back to home or login page
    }

    return(
        <div className='body'>

           <nav className="navbar navbar-expand-lg bg-color mx-auto text-light">
           
                <Link to="/home" className="navbar-brand text-warning fw-bolder fs-1">Agriculture Loan</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto ml-auto text-light ">
                            <li className="nav-item text-light">
                                <Link to="/Applyloan" className="nav-link" id='Applyloan'>Apply Loan</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Loanstatus" className="nav-link" id='loanstatus'>Loan Status</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Profile" className="nav-link" id='profile'>Profile</Link>
                        
                        </li>
                            <li>
                        <Link to="/" className="nav-link" id='logout' onClick={handleLogout}>Logout</Link>    
                        </li>
                        </ul>
                        
                    </div>                
            
            <Outlet />
            </nav>

            <main>
        <div className="album py-5 ">
          <div className="container container-top">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 ">

              <div className="col">
                <div className="card bg-warning shadow-lg">
                  <div className="card-body">
                    <h1>APPLY LOAN</h1>
                    <hr className="bg-dark"/>
                      <p className="card-text">Apply loan to get money and submit necessary documents for approval.</p>
                      <hr className="bg-dark"/>
                        <div className="d-flex justify-content-between align-items-center">
                          <Link to="/Applyloan" type="button" className="btn btn-lg btn-dark">GO</Link >
                          <small className="text-dark">Lets go</small>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="col">
                  <div className="card bg-primary shadow-lg">
                    <div className="card-body text-light">
                      <h1>LOAN STATUS</h1>
                      <hr className="bg-dark"/>
                        <p className="card-text text-">Enter your Loan ID and get the details of your loan Application .</p>
                        <hr className="bg-light"/>
                          <div className="d-flex justify-content-between align-items-center">
                            <Link to="/Loanstatus" type="button" className="btn btn-lg btn-light">GO </Link>
                            <small className="text-light">Lets go</small>
                          </div>
                        </div>
                      </div>
                  </div>

                  <div className="col">
                    <div className="card bg-secondary shadow-lg">
                      <div className="card-body text-warning">
                        <h1>VIEW PROFILE</h1>
                        <hr className="bg-dark"/>
                          <p className="card-text">View Profile is to know about your Personal information .</p>
                          <hr className="bg-warning"/>
                            <div className="d-flex justify-content-between align-items-center">
                              <Link to="/Profile" type="button" className="btn btn-lg btn-warning">GO</Link>
                              <small className="text-warning">Lets go</small>
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
export default HomePage