import React,{useState} from 'react';
import { useContext } from 'react';
import { Link, Outlet,useNavigate} from 'react-router-dom';
import LoginAuth from '../Auth/LoginAuth';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import './Login.css';
import './modal.css';

function Login() {

    const [values, setValues] = useState({
        Username: '',
        Password: '',
        userType: 'User' 
    })

    const navigate = useNavigate()

    const { setIsAuthenticated } = useContext(AuthContext);
    const { isAuthenticated } = useContext(AuthContext);
    
    const [errors, setError] = useState('')
    
    const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]:event.target.value}))
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = LoginAuth(values);
    
        const url = values.userType === 'Admin' ? 'https://8080-dadefbdfbeaeecfabeedbdebdadabbccceefdfb.project.examly.io/admin/login' : 'https://8080-dadefbdfbeaeecfabeedbdebdadabbccceefdfb.project.examly.io/user/login';
        if(validationErrors.Username === '' && validationErrors.Password === '' ){
            axios.post(url, values)
            .then(res => {
                if(res.data === true) {
                    console.log(res);
                    setIsAuthenticated(true);
                    if(values.userType === 'Admin') {
                        navigate('/admin');
                    }else{
                        navigate('/home');
                    }
                    localStorage.setItem("email",values.Username)
                    let e = localStorage.getItem('email');
                    console.log(e);
                }
            })
            .catch((err) => {
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data);
                    alert(err.response.data.Message);
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                    alert('Internal server error!')
                }
            });
        } else {
            setError(validationErrors);
        }
    };
    

    return (
    <>
        <div  className='d-flex justify-content-center align-items-center p-4 w-100 loginHead'>
        <strong>Login</strong>
        </div>
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
                <div className='p-4 rounded w-25 loginForm'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <input type="text" id="email" placeholder='Enter Email' name='Username'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.Username && <span className='text-danger'>{errors.Username}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="password" id="password" placeholder='Enter Password' name='Password'
                            onChange={handleInput} className='form-control rounded-0' />
                            {errors.Password && <span className='text-danger'>{errors.Password}</span>}
                        </div>
                        <div class='mb-3' style={{textAlign: 'center'}}>
                            <label style={{marginRight: '20px'}}><input type="radio" value="User" name="userType" checked={values.userType === 'User'} onChange={handleInput} /> User</label>
                            <label><input type="radio" value="Admin" name="userType" checked={values.userType === 'Admin'} onChange={handleInput} /> Admin</label>
                        </div>

                        <div className='row'>
                            <div className='col-12' style={{marginBottom: '20px'}}>
                                <button type='submit' id="loginButton" className='btn btn-success w-100 rounded-0'> Log in</button>
                            </div>
                            <div className='col-12'>
                                <div className=" text-center">
                                    <p>New User/admin?</p>
                                </div>
                                <Link to='/signup' type="button" id='signupLink' className="btn btn-primary w-100 rounded-0"> Sign up </Link>
                            </div>
                           
                                
                            
                            <Outlet/>
                        </div>
                    </form>
                </div>
        </div>
    </>
    )
  }

export default Login;