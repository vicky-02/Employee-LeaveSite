import React, { useState } from "react";
import "./homepage.css";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import logo from "./vk-logo4.jpg";

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const name = location.state.name;

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleUpdatePassword = () => {
        console.log('Entering handle Password');
        console.log(name); // Log name value
        console.log(newPassword); // Log newPassword value
        axios.put(`http://localhost:8080/user/updateEmployeePwd/${name}`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        })
            .then(response => {
                // Password updated successfully
                console.log('Password updated successfully');
                alert('Password Updated Successfully!');
                setOldPassword('');
                setNewPassword('');
            })
            .catch(error => {
                // Error updating password
                alert('Old Password Incorrect!');
                console.error('Error updating password:', error);
            });
    };



    const employeehome = () => {
        navigate('/homepage', { state: { name: name } });
    };

    return (
        <>
            <div className="container">
                <div className="homepage">
                    <div className="image">
                        <img src={logo} alt="rohit"></img>
                        <h2><em>Hello {name}</em>👋🏼 </h2>
                    </div>
                    <button className="Apld-btn" onClick={employeehome}>
                        Home
                    </button>
                </div>
                <div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="register-container">
                <div className="register">
                    <h2>Update Password</h2>
                    <input type="password" name="oldPassword" placeholder="Your Old Password" value={oldPassword} onChange={handleOldPasswordChange}></input>
                    <input type="password" name="newPassword" value={newPassword} onChange={handleNewPasswordChange} placeholder="Enter New Password"></input>
                    <div className="button" onClick={handleUpdatePassword}>Update</div>
                </div>
            </div>
            <footer className="footer">
                <p className="text-center">
                    Copyright &copy; MyLeavesPortal.com
                </p>
            </footer>
        </>
    );
}

export default UpdatePassword;
