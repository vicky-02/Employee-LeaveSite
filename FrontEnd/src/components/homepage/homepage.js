import React, { useState, useEffect } from "react";
import "./homepage.css";
import LeaveForm from "./leaveform";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import logo from "./vk-logo4.jpg";


import jsPDF from 'jspdf';
import 'jspdf-autotable';



const Homepage = () => {
  const [data, setData] = useState(false);

  const [leaves, setLeaves] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const name = location.state.name;
  console.log(name);

  // start pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // Number of leaves per page


  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // Fetch manager's leaves when the component mounts
    fetchManagerLeaves();
  }, [currentPage, totalPages]);


  // Fetch employee's leaves from the backend API
  const fetchManagerLeaves = () => {
    console.log("pagination name: " + name);
    axios
      .get(`http://localhost:8080/leave/empl/pagination/${name}?page=${currentPage}&pageSize=${pageSize}`)
      .then((response) => {
        // setpageLeaves(response.data.leaves); // Update leaves state with fetched data
        setFormData(response.data.leaves);
        console.log("total table : " + response.data.totalCount);
        setTotalPages(Math.ceil(response.data.totalCount / pageSize));
        console.log("total page : " + totalPages);
        setFormData(response.data.leaves);
      })
      .catch((error) => {
        console.error("Error fetching leaves:", error);
      });
  };


  // Function to handle pagination
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchManagerLeaves(); // Fetch leaves for the selected page
  };

  // Function to navigate to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchManagerLeaves(); // Fetch leaves for the previous page
    }
  };

  // Function to navigate to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchManagerLeaves(); // Fetch leaves for the next page
    }
  };

  useEffect(() => {
    AppliedLeave(name);
  }, []); // Empty dependency array to execute only once when component mounts




  // const handleApplyLeave = () => {
  //   setShowForm(true);
  // };

  //   const handleApplyLeave = () => {
  //     navigate('/apply-leave'); 
  // };

  const handleApplyLeave = () => {
    navigate('/apply-leave', { state: { name: name } }); // Pass name to LeaveForm
  };



  const handleEdit = (index) => {

    const leaveToEdit = leaves[index];

    const { id, startDate, endDate, manager, reason, leaveType } = leaveToEdit;

    // Navigate to the edit form and pass the leave data as state
    navigate('/apply-leave', {
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

  const handleLogout = () => {

    // Navigate to the login page
    navigate('/');
  };

  const AppliedLeave = (name, leaveId) => {
    // console.log(name);
    axios.get(`http://localhost:8080/leave/employee/${name}`)
      .then(res => {
        // alert("Get Data successfully!!");
        console.log(res.data);

        // const authenticatedleaves = res.data;

        setFormData(res.data);
        setLoading(false);
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
    doc.text("Leaves List", 80, y);
    y += 10;

    const tableHeaders = ['Serial No', 'Start Date', 'End Date', 'Manager', 'Reason', 'Leave Type', 'Status'];
    const tableData = formData.map((leave, index) => {
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

    doc.save("Empleaves.pdf");
  };

  const updatePassword = () => {
    console.log("handlePassword")
    navigate('/updatePswd', { state: { name: name } });

  }







  return (

    <>
      <div className="container">

        <div className="homepage">

          <div className="image">
            <img src={logo} alt="rohit"></img>
            <h2><em>Hello {name}</em>👋🏼 </h2>
          </div>

          <button className="button" onClick={handleApplyLeave}>
            Apply leave
          </button>
          <button className="button" onClick={() => { AppliedLeave(name) }}>

            My leaves
          </button>

          <button className="button" onClick={printLeavesToPDF}>
            Print Leaves
          </button>

        </div>
        <div className="btn-container">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

          {/* <button className="setting" onClick={updatePassword}>
            ⚙️
          </button> */}
          <button className="setting" onClick={updatePassword} title="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
              <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" fill="#ffffff" />
            </svg>
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
            {filteredLeaves
              .slice((currentPage - 1) * pageSize, currentPage * pageSize) // Slice the data array based on current page and page size
              .map((leave, index) => (
                <tr key={leave.id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td> {/* Calculate the serial number dynamically */}
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

        <div className="pagination">
          <button className="prev-btn" onClick={goToPreviousPage} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button className="page-btn" key={index + 1} onClick={() => goToPage(index + 1)} disabled={currentPage === index + 1}>
              {index + 1}
            </button>
          ))}
          <button className="prev-btn" onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

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





export default Homepage;
