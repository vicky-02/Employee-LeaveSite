 
// import './App.css';
// import Homepage from "./components/homepage/homepage"
// import Register from './components/register/register';
// import Login from "./components/login/login"
// import Manager from './components/homepage/manager';
// import LeaveForm from './components/homepage/leaveform';
// import ManagerLeaveForm from './components/homepage/managerleaveform';
// import { MemoryRouter } from 'react-router'

// import { Route, Navigate, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import Managerleave from './components/homepage/managerleave';

// function App() {
//   const [user, setLoginUser] = useState({});

//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           {/* <Route
//              exact path="/"
//             element={user && user.name ? <Homepage/> : <Login setLoginUser={setLoginUser}/>}
//           /> */}
//           {/* <Route
//              path="/"
//             element={user && user.name ? <Homepage/> : <Navigate to="/login" />}
//           /> */}
//           <Route path="/" element={<Login  setLoginUser={setLoginUser}/>} />
//           <Route path="/homepage" element={<Homepage/>} />
//           <Route path="/manager" element={<Manager/>} />
      
         
          
//           <Route path="/apply-leave" element={<LeaveForm />} />

//           <Route path="/ManagerApplyleave" element={<ManagerLeaveForm />} />

//           <Route path="/managerleave" element={<Managerleave />} />
          
//           <Route path="/register" element={<Register/>} />
          
//         </Routes>
      
//       </Router>

      

//       {/* <Manager/> */}
//       {/* <Manager/> */}

//       {/* <Homepage/> */}
//       {/* <Register/> */}
//       {/* <Login/> */}
//     </div>
//   );
// }

// export default App;


// Memory Router For hide Host End points 

import './App.css';
import Homepage from "./components/homepage/homepage"
import Register from './components/register/register';
import Login from "./components/login/login"
import Manager from './components/homepage/manager';
import LeaveForm from './components/homepage/leaveform';
import ManagerLeaveForm from './components/homepage/managerleaveform';
import { MemoryRouter } from 'react-router-dom'; // Changed import statement
import { useState } from 'react';
import ManagerControl from './components/homepage/managercontrol';
import Register2 from './components/register/register2';

import { Route, Routes } from 'react-router-dom'; // Removed unnecessary BrowserRouter and useState
import Managerleave from './components/homepage/managerleave';
import UpdatePassword from './components/homepage/updatePswd';
import ManagerUpdatePassword from './components/homepage/managerPswUpdate';


function App() {

  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <MemoryRouter> {/* Use MemoryRouter instead of BrowserRouter */}
        <Routes>
          <Route path="/" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/apply-leave" element={<LeaveForm />} />
          <Route path="/ManagerApplyleave" element={<ManagerLeaveForm />} />
          <Route path="/managerleave" element={<Managerleave />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register2" element={<Register2 />} />
          <Route path="/managercontrol" element={<ManagerControl />} />
          <Route path="/updatePswd" element={<UpdatePassword />} />
          <Route path="/managerPswUpdate" element={<ManagerUpdatePassword />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
}

export default App;
