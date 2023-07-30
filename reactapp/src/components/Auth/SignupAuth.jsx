function SignupAuth(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^[a-zA-Z0-9]{8,}$/
    const username_pattern = /^[a-zA-Z0-9]{3,}$/ //alpha numeric character
    const mobilenumber_pattern = /^[0-9]{10}$/
  
    if (!values.Email) {
      error.Email = "Email should not be empty";
    } else if (!email_pattern.test(values.Email)) {
      error.Email = "Invalid email format";
    } else {
        error.Email= "";
    }
  
    if (!values.Password) {
      error.Password = "Password should not be empty";
    } else if (!password_pattern.test(values.Password)) {
      error.Password =
        "Password must be at least 8 characters long";
    } else {
        error.Password="";
    }
  
    if (!values.confirmPassword) {
      error.confirmPassword = "Confirm Password should not be empty";
    } else if (String(values.confirmPassword) !== String(values.Password)) {
      error.confirmPassword = "Confirm Password didn't match";
    } else {
        error.confirmPassword = "";
    }
  
    if (!values.username && values.userRole === 'User') {
      error.Username = "Username should not be empty";
    } else if (!username_pattern.test(values.username) && values.userRole == "User") {
      error.Username =
        "Username must be at least 3 characters long and can only contain alphanumeric characters";
    } else {
        error.Username="";
    }
  
    if (!values.mobileNumber) {
      error.Mobile = "Mobile Number should not be empty";
    } else if (!mobilenumber_pattern.test(values.mobileNumber)) {
      error.Mobile = "Invalid Mobile Number format";
    } else {
        error.Mobile="";
    }
  
    if (!values.userRole) {
      error.Role = "admin/user should be selected";
    } else {
        error.Role="";
    }
  
    return error;
  }
  
  export default SignupAuth;  