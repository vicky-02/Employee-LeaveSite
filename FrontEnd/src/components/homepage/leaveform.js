import React, { useState, useEffect } from "react";
import "./leaveform.css";
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from "./vk-logo4.jpg";

import { useRef } from 'react';

const LeaveForm = ({ onCloseForm }) => {

  const navigate = useNavigate();
  const location = useLocation();


  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to clear the selected file
  const clearFileInput = () => {
    fileInputRef.current.value = null;
    setFile(null);
  };

  const [popupSuccess, setPopupSuccess] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState(location.state.name || 'Guest');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [manager, setManager] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("");
  // start manger

  const [managersList, setManagersList] = useState([]);


  useEffect(() => {
    // Fetch managers data from your backend API
    axios.get("http://localhost:8080/user/managers")
      .then(response => {
        setManagersList(response.data);
      })
      .catch(error => {
        console.error("Error fetching managers data:", error);
      });
  }, []);



  const [user, setUser] = useState({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    manager: "",
    reason: "",
    leaveType: "",
    status: ""

  });


  useEffect(() => {
    const leaveData = location.state;
    if (leaveData) {
      setId(leaveData.id || "");
      setName(leaveData.name || 'Guest');
      setStartDate(leaveData.startDate || "");
      setEndDate(leaveData.endDate || "");
      setManager(leaveData.manager || "");
      setReason(leaveData.reason || "");
      setLeaveType(leaveData.leaveType || "");
    }
  }, [location.state]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Update the user state with the form data
  //   setUser({
  //     name: name,
  //     startDate: startDate,
  //     endDate: endDate,
  //     manager: manager,
  //     reason: reason,
  //     leaveType: leaveType,
  //     status: "Pending"

  //   });
  // };


  // const leave = () => {
  //   const {name, startDate, endDate, manager , reason, leaveType} = user;
  //   console.log("manager: " + manager);
  //   console.log("User data:", user);
  //   if (name && startDate && endDate && manager && reason && leaveType ) {
  //     axios.post("http://localhost:8080/leave/employee", user)
  //       .then(res => {
  //         // alert("submitted data successfully!!");
  //         setPopupSuccess(true);

  //                   setTimeout(() => {
  //                       setPopupSuccess(false);
  //                   }, 2000);
  //       })
  //       .catch(error => {
  //         console.error("Error submitting data:", error);
  //         alert("Error submitting data. Please try again later.");
  //       });
  //   } else {
  //     alert("invalid input");
  //   }
  // };

  const handleLogout = () => {

    // Navigate to the login page
    navigate('/');

  };

  const handleBack = () => {
    navigate('/homepage', { state: { name: name } }); // Pass name back to Homepage
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // const leaveData = {
  //   //   // id: id,
  //   //   name: name,
  //   //   startDate: startDate,
  //   //   endDate: endDate,
  //   //   manager: manager,
  //   //   reason: reason,
  //   //   leaveType: leaveType,
  //   //   status: "Pending"
  //   // };


  //   const leaveformData = new FormData();
  //   leaveformData.append('file', file); // Append the selected file to FormData

  //   // Append other form data to FormData
  //   // leaveformData.append('name', name);
  //   // leaveformData.append('startDate', startDate);
  //   // leaveformData.append('endDate', endDate);
  //   // leaveformData.append('manager', manager);
  //   // leaveformData.append('reason', reason);
  //   // leaveformData.append('leaveType', leaveType);
  //   // leaveformData.append('status', 'Pending');

  //   leaveformData.append('leaves', JSON.stringify({
  //     name: name,
  //     startDate: startDate,
  //     endDate: endDate,
  //     manager: manager,
  //     reason: reason,
  //     leaveType: leaveType,
  //     status: 'Pending'
  //   }));


  //   const existingLeaveId = id;
  //   console.log(id);
  //   // if (existingLeaveId) {
  //   //   axios.put(`http://localhost:8080/leave/employee/${existingLeaveId}`, leaveformData)
  //   if (existingLeaveId) {
  //     axios.put(`http://localhost:8080/leave/employee/${existingLeaveId}`, leaveformData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', // Set content type to multipart form data
  //       },
  //     })
  //       .then(res => {
  //         console.log("Leave updated successfully:", res.data);
  //         // Clear form fields and show success message
  //         setPopupSuccess(true);
  //         // setName("");
  //         clearFormFields();
  //       })
  //       .catch(error => {
  //         console.error("Error updating leave:", error);
  //         // Handle error (e.g., show error message)
  //       });
  //   } else {
  //     // axios.post("http://localhost:8080/leave/employee", leaveformData)
  //     //   .then(res => {
  //     //     console.log("Leave submitted successfully:", res.data);
  //     //     // Clear form fields and show success message
  //     //     setPopupSuccess(true);
  //     //     // setName("");
  //     //     clearFormFields();

  //     //   })
  //     axios.post("http://localhost:8080/leave/employee", leaveformData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', // Set content type to multipart form data
  //       },
  //     })
  //       .then(res => {
  //         console.log("Leave submitted successfully:", res.data);
  //         // Clear form fields and show success message
  //         setPopupSuccess(true);
  //         // setName("");
  //         clearFormFields();
  //       })
  //       .catch(error => {
  //         console.error("Error submitting leave:", error);
  //         // Handle error (e.g., show error message)
  //       });
  //   }
  // };


  

  const handleSubmit = (e) => {
    e.preventDefault();

   
  
    const leaveformData = new FormData();
    leaveformData.append('file', file); // Append the selected file to FormData
  
    // Append other form data to FormData
    // leaveformData.append('leaves', JSON.stringify({
    //   name: name,
    //   startDate: startDate,
    //   endDate: endDate,
    //   manager: manager,
    //   reason: reason,
    //   leaveType: leaveType,
    //   status: 'Pending'
    // }));

    leaveformData.append('name', name);
    leaveformData.append('startDate', startDate);
    leaveformData.append('endDate', endDate);
    leaveformData.append('manager', manager);
    leaveformData.append('reason', reason);
    leaveformData.append('leaveType', leaveType);
    leaveformData.append('status', 'Pending');
  
    const existingLeaveId = id;
    console.log(id);
    if (existingLeaveId) {
      axios.put(`http://localhost:8080/leave/employee/${existingLeaveId}`, leaveformData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart form data
        },
      })
        .then(res => {
          console.log("Leave updated successfully:", res.data);
          // Clear form fields and show success message
          setPopupSuccess(true);
          // Clear the file input
          setFile(null);
          clearFormFields();
        })
        .catch(error => {
          console.error("Error updating leave:", error);
          // Handle error (e.g., show error message)
        });
    } else {
      
      axios.post("http://localhost:8080/leave/employee", leaveformData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart form data
        },
      })
        .then(res => {
          console.log("Leave submitted successfully:", res.data);
          // Clear form fields and show success message
          setPopupSuccess(true);
          // Clear the file input
          setFile(null);
          clearFormFields();
        })
        .catch(error => {
          console.error("Error submitting leave:", error);
          // Handle error (e.g., show error message)
        });
    }
  };
  


  const clearFormFields = () => {
    setStartDate("");
    setEndDate("");
    setManager("");
    setReason("");
    setLeaveType("");
    setFile("null");
    setTimeout(() => {
      setPopupSuccess(false);
    }, 2000);
  };

  const handleCloseForm = () => {
    navigate('/homepage', { state: { name: name } });

  };

  let footerStyle = {
    position: 'relative',
    top: "11vh",
    width: "100%"

  }




  return (
    <>

      <div className="container">

        <div className="homepage">

          <div className="image">
            <img src={logo} alt="img"></img>
            <h2><em>Hello {name}</em>👋🏼 </h2>
          </div>

          {/* <button className="button" onClick={handleApplyLeave}>
            Apply leave
          </button> */}
          <button className="Apld-btn"
            onClick={handleBack}>

            My leaves
          </button>



        </div>

        <div className="homepage">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="leave-form">
        {console.log("User", user)}

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your name"
          required
        />
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        {/* <label htmlFor="manager">Manager:</label>
        <select
          id="manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          required
        >
          <option value="">Select your Manager</option>
          <option value="Vicky">Vicky</option>
          <option value="Sagar">Sagar</option>
          <option value="Rajwir">Rajwir</option>
          <option value="Puja">Puja</option>


        </select> */}

        <label htmlFor="manager">Manager:</label>
        <select
          id="manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          required
        >
          <option value="">Select your Manager</option>
          {managersList.map(manager => (
            <option key={manager.id} value={manager.name}>{manager.name}</option>
          ))}
        </select>

        <label htmlFor="reason">Reason:</label>
        <input
          type="text"
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter Reason"
          required
        />

        <label htmlFor="leaveType">Leave Type:</label>
        <select
          id="leaveType"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Medical">Medical</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Ragular">Regular</option>
          <option value="CL">CL</option>


        </select>

        {/* File Upload Section */}
        <label htmlFor="file">Upload File:</label>
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx" // Limit file types to PDF and Word documents
        />


        {/* Display selected file name and clear existing file */}
        {/* {file && (
        <div>
          Selected File: {file.name}
          <button onClick={clearFileInput}>Clear</button>
        </div>
      )} */}

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCloseForm}>Close</button>
        </div>


        {popupSuccess && (
          <div className="popup-container">
            <div className="popup-text">
              Leave Apply Successfully!!
            </div>
          </div>
        )}
      </form>

      <footer className="bg-dark text-light py-3" style={footerStyle}>
        <p className="text-center">
          Copyright &copy; MyLeavesPortal.com
        </p>
      </footer>
    </>
  );
};

export default LeaveForm;
