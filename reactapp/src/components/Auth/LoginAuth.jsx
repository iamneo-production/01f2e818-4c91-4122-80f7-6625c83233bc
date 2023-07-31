function LoginAuth(values){
    let error = {}
    const password_pattern = /^[a-zA-Z0-9]{2,}$/
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.Username === "") {
        error.Username="Email should not be empty"
    }
     else {
        error.Username=""
    }

    if(values.Password === ""){
        error.Password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.Password)) {
        error.Password = "Password should be 2 letters long."
    } else {
        error.Password=""
    }

    return error;
}

export default LoginAuth