import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import ApplyloanAuth from "../Auth/ApplyloanAuth";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import './Applyloan.css'

function Customerapplyloan(){

    const [values, setValues] = useState({
        ApplicantAddress: '',
        ApplicantEmail:'',
        ApplicantPhone:'',
        ApplicantName:'',
        LoanRepaymentMonths:'',
        Salary:'',
        Aadhar:'',
        Pan:'',
        LoanAmountRequired:'',
        UserEmail: localStorage.getItem('email'),
        DocumentType: '',
        DocumentUpload: null
    })
    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [touched, setTouched] = useState(false); // Add this line

    const [errors, setError] = useState('')

    const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]: event.target.value}))
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0];
    
        if (file.size > 2000000) { // 2mb in bytes
          alert("File size should be 2mb or less");
        } else if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
          alert("File format should be JPEG, PNG, or PDF");
        } else {
          setValues(prev => ({ ...prev, DocumentUpload: file }));
        }
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        setTouched(true);
        const validationErrors = ApplyloanAuth(values);
        setError(validationErrors);
        if(validationErrors.ApplicantAddress === "" && validationErrors.ApplicantEmail === ""  && validationErrors.ApplicantPhone === "" && validationErrors.ApplicantName === "" && validationErrors.LoanRepaymentMonths === ""){
             // Create a FormData instance to hold the form values
        const formData = new FormData();

        // Append each property of the values object into the FormData
        Object.keys(values).forEach((key) => {
            if (key !== "DocumentUpload") {
                formData.append(key, values[key]);
            }
        });

        // Append file separately
        if (values.DocumentUpload) {
            formData.append("DocumentUpload", values.DocumentUpload);
        }
        console.log(values)
        axios.post('https://8080-cdfbadaabbeabbcfdaafcbdaebccfbaabccd.project.examly.io/user/addLoan', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
            alert('Success');
            const loanId = res.data; // Assuming the API response contains the loan ID
            navigate('/Loanid', { state: { loanId } }); // Navigate to the success page with the loan ID as state
        })
        .catch(err=> {
            console.log(err);
            if (err.response.status === 409) {
                alert('An application from this email has already been submitted.');
            } 
            else {
                console.error('Error:', err.response.status, err.response.statusText);
            }
        });
        }
    }

    const handleNext = (event) => {
        event.preventDefault();
        setTouched(true);
        const validationErrors = ApplyloanAuth(values);
        setError(validationErrors);
        if(validationErrors.ApplicantAddress === "" && validationErrors.ApplicantEmail === ""  && validationErrors.ApplicantPhone === "" && validationErrors.ApplicantName === "" && validationErrors.LoanRepaymentMonths === ""){
            setCurrentPage(2);
        }
    }

    const handlePageChange = (page) => {
        // this prevents users from going to the next page if there are any errors
        if (page > currentPage && Object.values(errors).some(error => error !== "")) {
          alert('Please correct the errors before proceeding.');
        } else {
          setCurrentPage(page);
        }
      };

    const handleLogout = () => {
    setIsAuthenticated(false); // clear authentication status
    localStorage.removeItem('email'); // clear user info in local storage
    navigate('/'); // navigate back to home or login page
    }
      
    useEffect(() => {
        setError('');
        setTouched(false);
    }, [currentPage]);
    
    
    return(
        <>
        <div className='body'><div><br /></div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto ApplyloanHead">
                    <div className="container-fluid">
                        <a className="navbar-brand">Bussines Loan</a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link to="/Applyloan" className="nav-link" id='Applyloan'><h4>Apply Loan</h4></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Loanstatus" className="nav-link" id='loanstatus'>Loan Status</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Profile" className="nav-link" id='profile'>Profile</Link>
                                </li>
                            </ul>
                            <Link to="/" className="nav-link" id='logout' onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                    <Outlet />
                </nav>
            </div>
        <br/>
        <div className='d-flex justify-content-center align-items-center vh-90 ApplyloanPage'>
            <div className='p-1 rounded w-25 ApplyloanForm' style={{ maxHeight: '93vh', overflowY: 'auto' }}>
                   <form onSubmit={currentPage === 1 ? handleNext : handleSubmit}>
                      {currentPage === 1 ? (
                        <>
                            <div className='mb-3'>
                                <input type="text" id="enterName" placeholder='Enter Applicant Name' name='ApplicantName'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.ApplicantName && <span className='text-danger'>{errors.ApplicantName}</span>}
                            </div>
                            <div className='mb-3'>
                                <input type="text" id="enterAddress" placeholder='Enter Applicant Address' name='ApplicantAddress'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.ApplicantAddress && <span className='text-danger'>{errors.ApplicantAddress}</span>}
                            </div>
                            <div className='mb-3'>
                                <input type="text" id="enterMobile" placeholder='Enter Mobilenumber' name='ApplicantPhone'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.ApplicantPhone && <span className='text-danger'>{errors.ApplicantPhone}</span>}
                            </div>
                            <div className='mb-3'>
                                <input type="email" id="enterEmail" placeholder='Enter Email' name='ApplicantEmail'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.ApplicantEmail && <span className='text-danger'>{errors.ApplicantEmail}</span>}
                            </div>
                            <div className='mb-3'>
                                <input type="text" id="enterAadharNo" placeholder='Enter Applicant Aadhar Number' name='Aadhar'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.Aadhar && <span className='text-danger'>{errors.Aadhar}</span>}
                            </div>
                            <div className='mb-3'>
                                <input type="text" id="enterPanNo" placeholder='Enter Applicant Pan Number' name='Pan'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.Pan && <span className='text-danger'>{errors.Pan}</span>}
                            </div>
                            <div className='mb-3'>
                                <input type="text" id="enterSalary" placeholder='Enter Salary' name='Salary'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.Salary && <span className='text-danger'>{errors.Salary}</span>}
                            </div>
                            <div className='mb-3'>
                                <input type="text" id="enterAmount" placeholder='Enter Amount Required' name='LoanAmountRequired'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.LoanAmountRequired && <span className='text-danger'>{errors.LoanAmountRequired}</span>}
                            </div>
                            <div className='mb-3'>
                                <input type="text" id="enterMonths" placeholder='Enter Months Required' name='LoanRepaymentMonths'
                                onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                                {touched && errors.LoanRepaymentMonths && <span className='text-danger'>{errors.LoanRepaymentMonths}</span>}
                            </div>
                            <div>
                                <button type='submit' className='btn btn-success w-100 rounded-0'>Next</button>
                            </div>
                        </>
                    ) : ( 
                        <>
                        <div className='mb-3'>
                            <label htmlFor="selectDocumentType" className="form-label">Upload Documents(Mandatory *)</label>
                            <select id="selectDocumentType" name="DocumentType" onChange={handleInput} className='form-control'>
                                <option value="">Select document type</option>
                                <option value="Images">Images (JPEG or PNG)</option>
                                <option value="Document">Document (PDF)</option>
                            </select>
                            </div>
                            <div className='mb-3'>
                            <label htmlFor="chooseFile" className="form-label">Images or Documents (Upload below 2mb)</label>
                            <input type="file" id="chooseFile" name="DocumentUpload" onChange={handleFileInput} accept=".jpeg,.png,.jpg,.pdf" className='form-control' />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-success w-100 rounded-0'>Apply for Loan</button>
                            </div>
                        </>
                      )}   
                      <nav aria-label="Page navigation example" className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                            </li>
                            <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handleNext}>2</button>
                            </li>
                        </ul>
                    </nav>
                      <Outlet />
                    </form>
                </div>
        </div>
    </>
    )
}

export default Customerapplyloan