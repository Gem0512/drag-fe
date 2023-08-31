import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import axios from 'axios'; 
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { OutlinedInput, Box, Typography,Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginView = ({
  users,
  setUsers,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
}) => {
  // console.log(email);
  const notify = () => toast("Đăng ký thành công!");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    
    event.preventDefault(); // Ngăn chặn sự kiện submit mặc định của form
      
      
      axios.post('http://localhost:4000/api/v1/auth/login', { username: email, password: password})
      .then((response) => {
        console.log(response.data.data.user);
        Cookies.set('access_token', response.data.data.access_token, { expires: 7 }); // Ví dụ: hết hạn sau 7 ngày
        Cookies.set('refresh_token', response.data.data.refresh_token, { expires: 14 });
        Cookies.set('user', JSON.stringify(response.data.data.user), { expires: 14 }); 
        // window.location.href = '/home';
        navigate('/home');
      })
      .catch((error) => {
       
        console.error("Xảy ra lỗi khi đăng nhập", error);
      
      });
      console.log(email)
  };

  if(localStorage.getItem("isLogin")==="true")   window.location.href = '/home';

  const [showPassword, setShowPassword] = useState(true);

  const handleToggleShowPassword = () => {
    setShowPassword(false);
  };
  const handleToggleHidePassword = () => {
    setShowPassword(true);
  };

  const [login, setLogin]= useState('true');
  
  const handleClickLogin =()=>{
    setLogin(false);
  }
  const handleRegisterLogin =()=>{
    setLogin(true);
  }


  // Register
  const [emailValue, setEmailValue]= useState('');
  const [passWordValue, setPasswordValue]= useState('');
  const [userNameValue, setUserNameValue]= useState('');

  const handleChangeEmail=(event)=>{
    setEmailValue(event.target.value);
    if(emailValue && passWordValue && userNameValue){
      setRegister(true);
    }
    else{
      setRegister(false); 
    }
  }

  const handleChangePassword=(event)=>{
    setPasswordValue(event.target.value);
    if(emailValue && passWordValue && userNameValue){
      setRegister(true);
    }
    else{
      setRegister(false); 
    }
  }

  const handleChangeUserName=(event)=>{
    setUserNameValue(event.target.value);
    if(emailValue && passWordValue && userNameValue){
      setRegister(true);
    }
    else{
      setRegister(false); 
    }
  }
  // console.log(emailValue, passWordValue, userNameValue);
 const [register,setRegister]= useState(false);
 const access_token = Cookies.get('access_token');

 const myHeaders = new Headers();
 myHeaders.append('Content-Type', 'application/json');
 myHeaders.append('Authorization', `Bearer ${access_token}`);

  const handleRegister= async()=>{
    if(emailValue && passWordValue && userNameValue){
      try {
        const response = await fetch(`http://localhost:4000/api/v1/auth/register`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            email: emailValue,
            password:passWordValue,
            title: userNameValue
          })
        });
    
        if (response.ok) {
          console.log("Đăng ký thành công ");
          notify();
          // setLogin(true);

        } else {
          console.log("Đã có lỗi khi đăng kí:", response.statusText);
        }
      } catch (error) {
        console.log("Đã có lỗi khi đăng ký:", error);
      }
    }
    else {
      setRegister(false); 
    }
   console.log(register);
  }
  
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  return (
    <div className="css-fix">
        {
          login? (
            <div className="login-form">
      <h2>Login</h2>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <OutlinedInput
          sx={{
            backgroundColor:"white",
            width:"100%"
          }}
            type="email"
            id="email"
            
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
            <div
            style={{
              display:"flex",
              
              // paddingRight:"10px",
              // width:"355px",
              // border:"1px solid #ccc",
              // borderRadius:"5px"
            }}>
              <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              id="password"
              
              onChange={e => setPassword(e.target.value)}
              required
              sx={{
                // border:"none",
                height:"40px",
                marginRight:"5px",
                backgroundColor:"white",
                width:"100%"
              }}
            />
            <div
            style={{
              paddingTop:"5px",

            }}>
              {
                !showPassword? (
                  <RemoveRedEyeIcon
                  style={{
                    color:"#ccc"
                  }}
                  onClick={handleToggleHidePassword}
                  ></RemoveRedEyeIcon>
                ):(
                  <VisibilityOffIcon
                  style={{
                    color:"#ccc"
                  }}
                  onClick={handleToggleShowPassword}
                  ></VisibilityOffIcon>
                )
              }
            </div>
            

            </div>
        </div>
        <button 
        style={{
          marginTop:"30px"
        }}
        className="blogin" type="submit"
     
        >Login</button>
        {/* <ToastContainer /> */}
        <Box 
         style={{
          marginTop:"10px",
          display:"flex",
          justifyContent:"flex-end",
          width:"100%",
          ':hover':{
            cursor:"pointer"
          }
        }}>
          <Button
            onClick={handleClickLogin}
          >Register</Button>
        </Box>
        
      </form>
    </div>
          ):(
              <div>
              <div className="login-form">
      <h2>Register</h2>

      <form >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <OutlinedInput
            type="email"
            id="email"
            value={emailValue}
            onChange={handleChangeEmail}
            required
            sx={{
              width:"100%",
              backgroundColor:"white",
              
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
            <div
            style={{
              display:"flex",
              // backgroundColor:"white",
              // paddingRight:"10px",
              // width:"355px",
              // border:"1px solid #ccc",
              borderRadius:"5px"
            }}>
              <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={passWordValue}
              onChange={handleChangePassword}
              required
              sx={{
                height:"40px",
                border:"none",
                width:"100%",
              backgroundColor:"white",
              marginRight:"5px"
              }}
            />
            <div
            style={{
              paddingTop:"5px",

            }}>
              {
                !showPassword? (
                  <RemoveRedEyeIcon
                  style={{
                    color:"#ccc"
                  }}
                  onClick={handleToggleHidePassword}
                  ></RemoveRedEyeIcon>
                ):(
                  <VisibilityOffIcon
                  style={{
                    color:"#ccc"
                  }}
                  onClick={handleToggleShowPassword}
                  ></VisibilityOffIcon>
                )
              }
            </div>

            </div>
            <div className="form-group">
          <label htmlFor="email"
          style={{
            marginTop:"10px"
          }}>UserName</label>
          <OutlinedInput
            type="text"
            id="email"
            value={userNameValue}
            onChange={handleChangeUserName}
            required
            sx={{
              width:"100%",
              height:'40px',
              backgroundColor:"white"
            }}
          />
        </div>
        </div>

        <Button 
        variant="contained" color="success"
        style={{
          marginTop:"30px",
          
        }}
        onClick={() =>{
          handleRegister();

           }}
        
        className="blogin" >Register</Button>
        <ToastContainer />

        <Box 
         style={{
          marginTop:"10px",
          display:"flex",
          justifyContent:"flex-end",
          width:"100%",
          ':hover':{
            cursor:"pointer"
          }
        }}>
          <Button

             onClick={handleRegisterLogin}
          >Login</Button>
        </Box>
      
      </form>
    </div>
   <Box>
    
   </Box>
              </div>
          )
        }


    {/* <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>Role: {user.role}</p> 
      			<p> Email: {user.email}</p>
      			<p> Email: {user.password}</p>
          </li>
       ))}
   </ul> */}
   
    </div>
  );
};

export default LoginView;
