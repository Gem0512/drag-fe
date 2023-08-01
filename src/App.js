import React, {useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/main/home";
import HomeRecords from "./components/records/HomeRecords"
import LoginView from "./components/login/LoginView"
import Test from "./pages/Test"
function App() {
 
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('');

  const role= localStorage.getItem('role');


  return (
    <DndProvider backend={HTML5Backend}>
       <Router>
      <Routes>
        <Route path="/home" 
          element={
            <Home 
            role={role}
            />} />
        <Route path="/records" element={<HomeRecords />} />
        <Route  path="/" 
          element={
            <LoginView
            users={users}
            setUsers={setUsers}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            // role={role}
            // setRole={setRole}
            ></LoginView>}></Route>
        <Route  path="/test" element={
         <Test></Test>
        }></Route>
      </Routes>
    </Router>
  </DndProvider>
  );
}

export default App;