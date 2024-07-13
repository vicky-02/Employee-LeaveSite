

import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoginUser }) => {
    
    const navigate = useNavigate();

   const [popupSuccess, setPopupSuccess] = useState(false);
   

// const [submissionMessage, setSubmissionMessage] = useState('');

    const [user, setUser] = useState({
        name: "Sagar",
        password: "12345",
        role: "" 
    });

    const handleChange = (event) => {
        // const name=event.target
         // const value=event.target
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = (event) => {
        event.preventDefault();
        const { name, role, password } = user
        if (name &&role  && password && (role === "employee")) {
        axios.post("http://localhost:8080/user/login/employee", user)
            .then(res => {
                const authenticatedEmployee = res.data;
                
            //   console.log('Authenticated Employee:', authenticatedEmployee);
                // alert("login successfull !!");
                setLoginUser(authenticatedEmployee);
                setPopupSuccess(true);

                    setTimeout(() => {
                        setPopupSuccess(false);
                        
                        navigate("/homepage",{ state: { name: name } });
                    }, 2000);

                    
                
                // window.location.href="http://localhost:3000/";
                  console.log('Navigated to employeepage...');
            }) .catch(error => {
                // Handle login error
                if (error.response && error.response.status === 401) {
                    // Unauthorized access
                    alert("Please Enter Correct username or password");
                } else {
                    // Other error, display a generic message
                    alert("An error occurred during login");
                }
            });
            // setSubmissionMessage("Signed Up Successfully")
        }
        else if (name &&role  && password && (role === "manager")) {
            axios.post("http://localhost:8080/user/login/manager", user)
                .then(res => {
                    const authenticatedManager = res.data;
                //   console.log('Authenticated Manager:', authenticatedManager);
                    // alert("login successfull !!");
                    setLoginUser(authenticatedManager);
                    setPopupSuccess(true);

                    setTimeout(() => {
                        setPopupSuccess(false);
                        navigate("/manager",{ state: { name: name } });
                    }, 2000);

                    
                    
                    // window.location.href="http://localhost:3000/";
                      console.log('Navigated to managerpage...');
                }) .catch(error => {
                    // Handle login error
                    if (error.response && error.response.status === 401) {
                        // Unauthorized access
                        alert("Please Enter Correct username or password");
                    } else {
                        // Other error, display a generic message
                        alert("An error occurred during login");
                    }
                });

                // setSubmissionMessage("Signed Up Successfully")
            }
            
        else{
            alert("Please ensure that you provide a name, a strong password, and select a role.");
        }
    };

    return (
        <div className="login-container">
            {console.log("User", user)}
        <div className="login">
            <h1>Login</h1>
            {/* {submissionMessage && <p className="text-blue-600">{submissionMessage}</p>} */}
            <input type="text" name="name" value={user.name} placeholder="Enter Your User Name" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password"></input>
            <select name="role" value={user.role} onChange={handleChange}>
            <option> ChooseRole</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
            </select>
            <div className="button" onClick={login}>LogIn</div>
            <div>or</div>
            <div className="button" onClick={() => navigate('/register')}>Register</div>
        </div>
        {popupSuccess && (
                <div className="popup-container">
                    <div className="popup-text">
                    Login successfully!!
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;