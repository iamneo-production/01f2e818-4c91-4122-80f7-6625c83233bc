import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useContext } from 'react';
import Customerapplyloan from "./components/Customerapplyloan/Customerapplyloan";
import "./components/Signup/Signup.css"
import './components/Login/Login.css'
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Customerloanstatus from "./components/Customerloanstatus/Customerloanstatus";
import Customerprofile from "./components/Customerprofile/Customerprofile";
import Admin from "./components/AdminPage/Admin"
import Adminappliedloans from "./components/Adminappliedloans/Adminappliedloans";
import Loanid from "./components/Loanid/Loanid";
import './components/Loanid/Loanid.css'
import Adminloandetails from "./components/Adminloandetails/Adminloandetails";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);
  
    if(!isAuthenticated) {
      return <Navigate to="/login" />
    }
  
    return (
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/Applyloan' element={<Customerapplyloan />} />
        <Route path='/loanstatus' element={<Customerloanstatus />} />
        <Route path='/profile' element={<Customerprofile />} />
        <Route path='/Appliedloans' element={<Adminappliedloans />} />
        <Route path='/LoanDetails' element={<Adminloandetails />} />
        <Route path='/Loanid' element={<Loanid />} /> 
      </Routes>
    );
}

export default ProtectedRoute;
