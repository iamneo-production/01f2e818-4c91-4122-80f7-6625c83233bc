import React, {useState} from "react";
import axios from 'axios';
import SignupAuth from "../Auth/SignupAuth";
import { Modal, Button } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup(){

    const [values, setValues] = useState({
        Email: '',
        username:'',
        Password: '',
        mobileNumber:'',
        userRole:'',
        confirmPassword:''
    })
    const navigate = useNavigate()
    const [role, setRole] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setError] = useState('')

    const handleInput = (event)=> {
        if(event.target.name === 'userRole'){
            setRole(event.target.value);
        }
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }    
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = await SignupAuth(values);
    
        if (validationErrors.Email === "" && validationErrors.Password === "" && validationErrors.Username === ""  && validationErrors.Mobile === "" && validationErrors.Role === "") {
            let postPromise;
            console.log(values);
    
            if (values.userRole === "User"){
                postPromise = axios.post('https://8080-cdfbadaabbeabbcfdaafcbdaebccfbaabccd.project.examly.io/user/signup',values);
            }
            if (values.userRole === 'Admin') {
                postPromise = axios.post('https://8080-cdfbadaabbeabbcfdaafcbdaebccfbaabccd.project.examly.io/admin/signup',values);
            }
    
            postPromise.then(res => {
                setShowModal(true);
            })
            .catch(err => {
                console.log(err)
                if (err.response && (err.response.data === 'Username is already in use' || err.response.data === 'Email is already in use')) {
                    setErrorMessage('User is already in use');
                    setShowModal(true);
                }
            });
        } else {
            setError(validationErrors);
        }
    }
    
    return(
        <>
       
        
        <div className='d-flex justify-content-center align-items-center vh-90 SignupPage'>
                <div className='p-1 rounded w-25 signupForm'>
                <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center align-items-center p-4 w-100 '>
        <strong>Register</strong>
        </div>
                        <div className='mb-3'>
                            <select id="admin/user" name='userRole' onChange={handleInput} className='form-control rounded-0'>
                                <option value=''>Select a Role</option>
                                <option value='Admin'>Admin</option>
                                <option value='User'>User</option>
                            </select>
                            {errors.Role && <span className='text-danger'>{errors.Role}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="email" id="email" placeholder='Enter Email' name='Email'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.Email && <span className='text-danger'>{errors.Email}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="username" placeholder='Enter Username' name='username'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off' disabled={role === 'Admin'}/>
                            {errors.Username && <span className='text-danger'>{errors.Username}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="mobileNumber" placeholder='Enter Mobilenumber' name='mobileNumber'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.Mobile && <span className='text-danger'>{errors.Mobile}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="password" id="password" placeholder='Password' name='Password'
                            onChange={handleInput} className='form-control rounded-0' />
                            {errors.Password && <span className='text-danger'>{errors.Password}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="password" id="confirmPassword" placeholder='Confirm Password' name='confirmPassword'
                            onChange={handleInput} className='form-control rounded-0' />
                            {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
                        </div>
                        <div>
                            <div className='col'>
                                <button type='submit' id="loginButton" className='btn btn-success w-100 rounded-0'> Submit</button>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <p>Already an user?</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Link to='/login' type="button" id='signupLink' className="btn btn-primary rounded-0"> Login </Link>
                            </div>
                            <Outlet/>
                        </div> 
                </form>
            </div>
            <Modal show={showModal} onHide={() => {setShowModal(false); setErrorMessage('')}}>
                <Modal.Header closeButton>
                    <Modal.Title>{errorMessage ? 'Registration Failed' : 'Success'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{errorMessage || 'Your registration was successful! Please log in.'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShowModal(false);
                        if (!errorMessage) {
                            navigate("/login");
                        }
                        setErrorMessage('');  // Reset the error message
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

        {/* This is your new modal */}
            
    </>
    )
}

export default Signup