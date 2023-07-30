import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import './Profile.css';

function Customerprofile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [emi, setEmi] = useState(0);
  const email = localStorage.getItem("email");

  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    let url = `https://8080-cdfbadaabbeabbcfdaafcbdaebccfbaabccd.project.examly.io/user/getProfile/${email}`
    await axios.get(url)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            setUser(res.data);
            const enterAmount = res.data.LoanApplicants[0]?.LoanAmountRequired;
            const months = res.data.LoanApplicants[0]?.LoanRepaymentMonths;         
            const interestRate = 0.05;
            const salary = res.data.LoanApplicants[0]?.Salary;
            const emiValue = calculateEMI(enterAmount, interestRate, months, salary);
            setEmi(emiValue);
          } 
        }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchUserProfile();
    console.log('Refetched');
  }, []);

  function calculateEMI(enterAmount, interestRate, months, salary) {
    const monthlyInterestRate = (interestRate / 100) / 12;
    const monthly = months * 12;
    const emi =
      (enterAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthly)) /
      (Math.pow(1 + monthlyInterestRate, monthly) - 1);
    return emi.toFixed(2);
  }

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
    console.log('input changed');
  }

  const editUserProfile = async (event) => {
    event.preventDefault();
    console.log(user,'Edited');
    await axios.put(`https://8080-cdfbadaabbeabbcfdaafcbdaebccfbaabccd.project.examly.io/user/editProfile/${email}`, user)
        .then(res => {
          if (res.status === 200) {
            setEditing(false);
            alert('Profile saved!!');
          } 
        }).catch((err) => {
        console.log(err);
      });
  }

  const handleLogout = () => {
    setIsAuthenticated(false); // clear authentication status
    localStorage.removeItem('email'); // clear user info in local storage
    navigate('/'); // navigate back to home or login page
  }

  return (
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
                  <Link to="/Loanstatus" className="nav-link" id='loanstatus'>Loan Status</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Profile" className="nav-link" id='profile'><h4>Profile</h4></Link>
                </li>
              </ul>
              <Link to="/" className="nav-link" id='logout' onClick={handleLogout}>Logout</Link>
            </div>
          </div>
          <Outlet />
        </nav>
      </div>
      <div className="profile-container">
        <div className='d-flex justify-content-center align-items-center vh-90'>
          <h3>Profile Information</h3>
        </div>
        {user && (
      <>
        {editing ? 
          <form className="profile-form" key={user.Id} onSubmit={editUserProfile}>
            <div className="profile-row">
              <div className="profile-column">
                <div className="profile-value">Name: <input type="text" name="Name" value={user.Name} onChange={handleInputChange} /></div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Address: <input type="text" name="City" value={user.City} onChange={handleInputChange} /></div>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <div className="profile-value">Phone No: <input type="text" name="Mobile" value={user.Mobile} onChange={handleInputChange} /></div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Loan Id: {user.LoanApplicants[0].LoanId}</div>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <div className="profile-value">Email: {user.Email}</div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Monthly EMI: {emi}</div>
              </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <button type="submit">Save</button>
            </div>
          </form>
          :
          <>
            <div className="profile-row">
              <div className="profile-column">
                <div className="profile-value">Name: {user.Name}</div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Address: {user.City}</div>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <div className="profile-value">Phone No: {user.Mobile}</div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Loan Id: {user.LoanApplicants[0].LoanId}</div>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-column">
                <div className="profile-value">Email: {user.Email}</div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Monthly EMI: {emi}</div>
              </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <button type="button" onClick={() => setEditing(!editing)}>Edit Profile</button>
            </div>
          </>
        }
      </>
      )}
      </div>
  </>
  )
}

export default Customerprofile;