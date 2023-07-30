import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Loanid.css'

function Loanid() {

    const location = useLocation();
    const loanId = location.state && location.state.loanId;


    return (
        <>
            <div className='body'><div><br /></div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto LoanidHead">
                    <div className="container-fluid">
                        <a className="navbar-brand">Bussines Loan</a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link to="/Applyloan" className="nav-link" id='Applyloan'><h4>Apply Loan</h4></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/loanstatus" className="nav-link" id='loanstatus'>Loan Status</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link" id='profile'>Profile</Link>
                                </li>
                            </ul>
                            <Link to="/" className="nav-link" id='logout'>Logout</Link>
                        </div>
                    </div>
                    <Outlet />
                </nav>
            </div>

            <div className='d-flex justify-content-center align-items-center vh-120 ApplyloanPage'>
            <div className='p-1 rounded w-40 ApplyloanForm'>
                <h3>You have applied for a loan successfully!</h3>
                <p>Your Loan ID: <strong>{loanId}</strong></p>
            </div>
            </div>

       </>
    )
}

export default Loanid