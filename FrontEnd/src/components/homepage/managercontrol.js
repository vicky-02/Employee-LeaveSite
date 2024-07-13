
import React, { useState, useEffect } from "react";
import "./homepage.css";
import LeaveForm from "./leaveform";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import logo from "./vk-logo4.jpg";


const ManagerControl = () => {

    // All States 
    const [data, setData] = useState(false);
    
    const [empldata, setEmplData] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const name = location.state.name;
    console.log(name);


    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [Empllist, setEmpllist] = useState([]);
    const [emplloading, setemplLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5; // Number of leaves per page

    useEffect(() => {
        // Fetch manager's leaves when the component mounts
        fetchManagerLeaves();
    }, [currentPage, totalPages]);


    


    // Fetch manager's leaves from the backend API
    const fetchManagerLeaves = () => {
        console.log("pagination name: " + name);
        axios
            .get(`http://localhost:8080/leave/pagination/${name}?page=${currentPage}&pageSize=${pageSize}`)
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



















    // All handles

    const addEmployee = () => {
        navigate('/register2', { state: { name: name } }); // Pass name 
    };





    const handleLogout = () => {

        // Navigate to the login page
        navigate('/');
    };

    const handleCloseForm = () => {
        navigate('/manager', { state: { name: name } });

    };

    useEffect(() => {
        ManageLeave(name);
    }, []);




    //  Getting leaves from database 

    const EmployeeList = () => {

        console.log("hello Employees:");
        // axios.get("http://localhost:8080/leave/leaves/")
        axios.get("http://localhost:8080/user/empllist")
            .then(res => {
                // alert("Get Data successfully!!");
                console.log(res.data);
                setEmpllist(res.data);
                setemplLoading(false);
                setEmplData(true);
                

            })
            .catch(error => {
                console.error("Error submitting data:", error);
                alert("Error submitting data. Please try again later.");
            });

    }

    useEffect(() => {
        EmployeeList();
    }, []);



    const ManageLeave = (name) => {
        // axios.get("http://localhost:8080/leave/leaves/")
        axios.get(`http://localhost:8080/leave/manager/${name}`)
            .then(res => {
                // alert("Get Data successfully!!");
                console.log(res.data);
                setFormData(res.data);
                setLoading(false);
                setData(true);

            })
            .catch(error => {
                console.error("Error submitting data:", error);
                alert("Error submitting data. Please try again later.");
            });
    }

    

    const deleteEmployee = (employeeId, employeeName) => {
        console.log("enter in delete");
        console.log("Deleting employee with name:", employeeName);
        console.log("Deleting employee with ID:", employeeId);
       
        axios.delete(`http://localhost:8080/user/${employeeId}`)
          .then(employeeResponse => {
            // Handle successful deletion of employee
            console.log('Employee deleted successfully:', employeeResponse.data);
            
            // Delete leaves associated with the employee
            axios.delete(`http://localhost:8080/leave/deleteAll/${employeeName}`)
              .then(leavesResponse => {
                // Handle successful deletion of leaves
                console.log('Leaves deleted successfully:', leavesResponse.data);
    
                
              })
              .catch(leavesError => {
                // Handle error deleting leaves
                console.error('Error deleting leaves:', leavesError);
              });
    
           
              
           
            setEmpllist(prevEmpllist => prevEmpllist.filter(employee => employee.id !== employeeId));
          })
          .catch(employeeError => {
            // Handle error deleting employee
            console.error('Error deleting employee:', employeeError);
          });
    };
    
      


    return (

        <>
            <div className="container">

                <div className="homepage">
                    <div className="image">
                        <img src={logo} alt="rohit"></img>
                        <h2><em>Hello {name}</em>👋🏼 </h2>
                    </div>

                    <button className="button" onClick={handleCloseForm} >
                        Home
                    </button>


                    <button className="button" onClick={EmployeeList} >
                        Employee List
                    </button>
                    {/* <button className="button" onClick={() =>{EmployeeList(name)}}>
                      Employee List
                    </button> */}
                    <button className="Apld-btn" onClick={() => { addEmployee(name) }}>
                        Add Employee
                    </button>



                </div>


                <div className="homepage">
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {data && (<div className="leave-list">
                <h2 className="Myleaves">Manage Employee</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Empllist
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize) // Slice the data array based on current page and page size
                        .map((list, index) => (
                            <tr key={list.id}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td> {/* Calculate the serial number dynamically */}
                                <td>{list.name}</td>
                                    <td>{list.email}</td>
                                    <td>
                                       <button className="Rej-btn" onClick={() => deleteEmployee(list.id, list.name)}>Delete</button> 
                                    </td>
                                    
                                </tr>
                            ))}
                    </tbody>

                </table>
                <div className="pagination">
                    <button className = "prev-btn"onClick={goToPreviousPage} disabled={currentPage === 1}>
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button className= "page-btn"key={index + 1} onClick={() => goToPage(index + 1)} disabled={currentPage === index + 1}>
                            {index + 1}
                        </button>
                    ))}
                    <button className ="prev-btn"onClick={goToNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>

            </div>)}


            <footer className="footer">
                <p className="text-center">
                    Copyright &copy; MyLeavesPortal.com
                </p>
            </footer>

        </>

    );
};

export default ManagerControl;
