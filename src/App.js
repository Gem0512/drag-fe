import React, {useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./components/main/home";
import HomeRecords from "./components/records/HomeRecords"
import LoginView from "./components/login/LoginView"
import Test from "./pages/Test"
import axios from "axios";
import Cookies from 'js-cookie';
import FormPage from "./pages/FormPage"
import AdminPage from "./pages/AdminPage"
import ViewsPage from "./pages/ViewsPage"
// import Test from "./pages/Test"
function App() {
 
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('');

  const role= localStorage.getItem('role');
 
  const myCookieValue = Cookies.get('access_token');

  return (
    
    <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
       {/* <Router> */}
      <Routes>
      <Route path="/home" 
          element={
            myCookieValue? 
            <Home 
            />:
            <LoginView
            users={users}
            setUsers={setUsers}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            // role={role}
            // setRole={setRole}
            ></LoginView>
            } >
             <Route path="app" exact element={<AdminPage />} />
            <Route path="edit" element={<FormPage />} >
              <Route path=":id" element={<FormPage />} />
            </Route>
            <Route path="view" element={<ViewsPage />} />
            <Route path="graphs" element={<Test />} />
            </Route>
        {/* <Route path="/home/editForm" element={<FormPage/>} />
        <Route path="/home/viewPage" element={<ViewsPage/>} /> */}

        <Route  path="/login" 
          element={
            myCookieValue? 
            <Home 
            // role={role}
            />:
            <LoginView
            users={users}
            setUsers={setUsers}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            // role={role}
            // setRole={setRole}
            ></LoginView>}>
              
            </Route>
        <Route  path="/test" element={
         <Test></Test>
        }></Route>
      </Routes>
    {/* </Router> */}
    </BrowserRouter>
  </DndProvider>
  );
}

export default App;


