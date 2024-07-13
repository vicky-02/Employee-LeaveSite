import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from "./vk-logo4.jpg";



const Register2 = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const Mname = location.state.name;
    console.log(Mname);

    const [popupSuccess, setPopupSuccess] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        // const name=event.target
        // const value=event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, role, password, reEnterPassword } = user
        if (name && email && (role === "employee") && password && (password === reEnterPassword)) {
            axios.post("http://localhost:8080/user/register/employee", user)
                .then(res => {
                    // alert("submitted data successfully!!, Please Login")
                    setPopupSuccess(true);

                    setTimeout(() => {
                        setPopupSuccess(false);
                        // navigate("/managercontrol")
                        navigate('/managercontrol', { state: { name: Mname } });
                    }, 2000);

                })
        }
        else if (name && email && (role === "manager") && password && (password === reEnterPassword)) {
            axios.post("http://localhost:8080/user/register/manager", user)
                .then(res => {
                    // alert("submitted data successfully!!, Please Login")
                    setPopupSuccess(true);
                    setTimeout(() => {
                        setPopupSuccess(false);
                    }, 2000);

                })
        }
        else {
            alert("invlid input")
        }

    }

    const handleLogout = () => {

        // Navigate to the login page
        navigate('/');
    };

    const handleCloseForm = () => {
        navigate('/manager', { state: { name: Mname } });

    };



    return (
        <>
            <div className="container">

                <div className="homepage">
                    <div className="image">
                        <img src={logo} alt="img"></img>
                        <h2><em>Hello {Mname}</em>👋🏼 </h2>
                    </div>

                    <button className="button" onClick={handleCloseForm} >
                        Home
                    </button>



                </div>


                <div className="homepage">
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="register-container">
                <div className="register">
                    {console.log("User", user)}
                    <h1>Register</h1>

                    <input type="text" name="name" value={user.name} placeholder="Your User Name" onChange={handleChange}></input>
                    <input type="text" name="email" value={user.email} placeholder=" Your Email" onChange={handleChange}></input>
                    <select name="role" value={user.role} onChange={handleChange}>
                        <option>Choose Role</option>
                        <option value="employee">Employee</option>
                        {/* <option value="manager">Manager</option> */}
                    </select>
                    <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
                    <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
                    <div className="button" onClick={register} >Register</div>
                </div>
                {popupSuccess && (
                    <div className="popup-container">
                        <div className="popup-text">
                            submitted data successfully!!
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Register2