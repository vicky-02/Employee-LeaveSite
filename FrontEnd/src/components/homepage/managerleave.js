import React, { useState, useEffect } from "react";
import "./homepage.css";
import LeaveForm from "./leaveform";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import logo from "./vk-logo4.jpg";

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Managerleave = () => {



    const [data, setData] = useState(false);

    const [leaves, setLeaves] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const name = location.state.name;
    console.log(name);


    // Search
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("Search Query:", e.target.value);
  };


  const filteredLeaves = leaves.filter(leave =>
    leave.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.endDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leave.status.toLowerCase().includes(searchQuery.toLowerCase())
  );



    useEffect(() => {
        AppliedLeave(name);
    }, []); // Empty dependency array to execute only once when component mounts


    const [formData, setFormData] = useState([]);



    // const [disabledButtons, setDisabledButtons] = useState(() => {
    //   const storedDisabledButtons = JSON.parse(localStorage.getItem('disabledButtons')) || [];
    //   return storedDisabledButtons;
    // });

    // const handleApplyLeave = () => {
    //   setShowForm(true);
    // };

    //   const handleApplyLeave = () => {
    //     navigate('/apply-leave'); 
    // };


    // All Handles

    const managerhome = () => {
        navigate('/manager', { state: { name: name } }); // Pass name to LeaveForm
    };

    const handleApplyLeave = () => {
        navigate('/ManagerApplyleave', { state: { name: name } }); // Pass name to LeaveForm
    };

    const handleLogout = () => {

        // Navigate to the login page
        navigate('/');
    };

    const handleEdit = (index) => {

        const leaveToEdit = leaves[index];

        const { id, startDate, endDate, manager, reason, leaveType } = leaveToEdit;

        // Navigate to the edit form and pass the leave data as state
        navigate('/ManagerApplyleave', {
            state: {
                id: id,
                name: name,
                startDate: startDate,
                endDate: endDate,
                manager: manager,
                reason: reason,
                leaveType: leaveType
            }

        });
        console.log(id);
    }


    const deleteLeave = (leaveId) => {
        console.log("enter in delete")
        console.log("Deleting leave with ID:", leaveId);

        axios.delete(`http://localhost:8080/leave/${leaveId}`)
            .then(response => {
                // Handle successful deletion
                console.log('Leave deleted successfully:', response.data);

                // alert("Leave Deleted successfull !! ");
                // window.location.reload();
                setLeaves(prevLeaves => prevLeaves.filter(leave => leave.id !== leaveId));



            })
            .catch(error => {
                // Handle error
                console.error('Error deleting leave:', error);
            });
    };



    const AppliedLeave = (name, leaveId) => {
        // console.log(name);
        axios.get(`http://localhost:8080/leave/employee/${name}`)
            .then(res => {
                // alert("Get Data successfully!!");
                console.log(res.data);

                // const authenticatedleaves = res.data;

                const authenticatedLeaves = res.data.map(leave => ({
                    id: leave.id,
                    startDate: leave.startDate,
                    endDate: leave.endDate,
                    manager: leave.manager,
                    reason: leave.reason,
                    leaveType: leave.leaveType,
                    status: leave.status,
                    fileId: leave.fileId
                }));
                console.log("manager: " + res.data.manager);
                console.log('Authenticated Leaves:', authenticatedLeaves);
                setLeaves(authenticatedLeaves);
                setData(true);


            })
            .catch(error => {
                console.error("Error submitting data:", error);
                alert("Error submitting data. Please try again later.");
            });
    }


    // Function to print leaves in PDF format
    const printLeavesToPDF = () => {
        const doc = new jsPDF();
        let y = 10; // Initial y position
        doc.text("Manager Leaves List", 75, y);
        y += 10;

        const tableHeaders = ['Serial No', 'Start Date', 'End Date', 'Manager', 'Reason', 'Leave Type', 'Status'];
        const tableData = leaves.map((leave, index) => {
            return [
                index + 1,
                leave.startDate,
                leave.endDate,
                leave.manager,
                leave.reason,
                leave.leaveType,
                leave.status
            ];
        });

        doc.autoTable({
            startY: y,
            head: [tableHeaders],
            body: tableData
        });

        doc.save("Managerleaves.pdf");
    };



    return (

        <>
            <div className="container">

                <div className="homepage">

                    <div className="image">
                        <img src={logo} alt="rohit"></img>
                        <h2><em>Hello {name}</em>👋🏼 </h2>
                    </div>



                    <button className="Apld-btn" onClick={() => { managerhome(name) }}>

                        Home
                    </button>
                    <button className="Apld-btn" onClick={() => { AppliedLeave(name) }}>

                        My leaves
                    </button>

                    <button className="button" onClick={handleApplyLeave}>
                        Apply leave
                    </button>

                    <button className="button" onClick={printLeavesToPDF}>
                        Print Leaves
                    </button>


                </div>
                <div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>





            </div>


            {data && (<div className="leave-list">
                <h2>Leaves List</h2>

                <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
                <table>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Manager</th>
                            <th>Reason</th>
                            <th>Leave Type</th>
                            <th>Status</th>
                            <th>Document</th>
                            <th>Action</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.map((leave, index) => (
                            <tr key={leave.id}>
                                <td>{index + 1}</td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                                <td>{leave.manager}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.leaveType}</td>
                                {/* <td>{leave.status}</td> */}
                                <td className={leave.status === 'Pending' ? 'pending-status' : leave.status === 'Accepted' ? 'accept-status' : 'reject-status'}>
                                    {leave.status}
                                </td>
                                <td>
                                    <a href={`http://localhost:8080/leave/getFile/${leave.fileId}`} target="_balank">Download</a>
                                </td>

                                <td>
                                    <button className="del-button" onClick={() => deleteLeave(leave.id)} disabled={leave.status === 'Accepted' || leave.status === 'Rejected'}>Delete</button>
                                </td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(index)} disabled={leave.status === 'Accepted' || leave.status === 'Rejected'}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>)}



            <footer className="footer">
                <p className="text-center">
                    Copyright &copy; MyLeavesPortal.com
                </p>
            </footer>


            {/* {showForm && <LeaveForm onCloseForm={handleCloseForm} />} */}
        </>

    );
};


export default Managerleave;