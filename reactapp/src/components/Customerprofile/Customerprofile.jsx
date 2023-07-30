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
    let url = `https://8080-eccfaacddbcfabeedbdebdadabbccceefdfb.project.examly.io/user/getProfile/${email}`
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
    await axios.put(`https://8080-eccfaacddbcfabeedbdebdadabbccceefdfb.project.examly.io/user/editProfile/${email}`, user)
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
      
        <nav className="navbar navbar-expand-lg bg-color mx-auto ">
        
          <Link to="/home" className="navbar-brand">Agriculture Loan</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto mx-auto">
                <li className="nav-item">
                  <Link to="/Applyloan" className="nav-link" id='Applyloan'>Apply Loan</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Loanstatus" className="nav-link" id='loanstatus'>Loan Status</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Profile" className="nav-link text-warning fw-bolder fs-3" id='profile'>Profile</Link>
                </li>
                <li className="nav-item">
                <Link to="/" className="nav-link" id='logout' onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
             
            </div>
          
          <Outlet />
        </nav>
      
      <div className="profile-container p-5">
        <div className='d-flex justify-content-center align-items-center '>
          <h1 className="text-light fs-1 fw-bolder">Profile Information</h1>
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

              <div className="profile-column">
                <div className="profile-value">Phone No: <input type="text" name="Mobile" value={user.Mobile} onChange={handleInputChange} /></div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Loan Id: {user.LoanApplicants[0].LoanId}</div>
              </div>

              <div className="profile-column">
                <div className="profile-value">Email: {user.Email}</div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Monthly EMI: {emi}</div>
              </div>

            </div>
            
            
            
              <button className="edit-button btn btn-primary btn-lg" type="submit">Save</button>
          
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
              <div className="profile-column">
                <div className="profile-value">Phone No: {user.Mobile}</div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Loan Id: {user.LoanApplicants[0].LoanId}</div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Email: {user.Email}</div>
              </div>
              <div className="profile-column">
                <div className="profile-value">Monthly EMI: {emi}</div>
              </div>
           
            </div>
            
              <button type="button" className="edit-button btn btn-primary btn-lg" onClick={() => setEditing(!editing)}>Edit Profile</button>
            
          </>
        }
      </>
      )}
      </div>
  </>
  )
}

export default Customerprofile;