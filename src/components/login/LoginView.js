import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import axios from 'axios'; 
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { OutlinedInput, Box, Typography,Button } from '@mui/material';
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
  const [toastState, setToastState]= useState();
  // const [isLogin, setIsLogin]= useState(false);
  const handleLogin = async (event) => {
    localStorage.setItem("isLogin", false);
    event.preventDefault(); // Ngăn chặn sự kiện submit mặc định của form
      
      console.log(email, password)
      axios.post('http://localhost:4000/api/login', { email: email, password: password})
      .then((response) => {
        setRegister(true); // In thông tin về box đã được lưu vào MongoDB
        window.location.href = '/home';
        localStorage.setItem("isLogin", true);
        console.log(">>>>",email, password)
        setToastState(true)
        console.log(toastState)
      })
      .catch((error) => {
        setToastState(false)
        console.error("Xảy ra lỗi khi đăng nhập", error);
        localStorage.setItem("isLogin", false);
      });
      console.log(email)


      axios.post('http://localhost:4000/api/create-email', { email: email })
      .then((response) => {
        setRegister(true); // In thông tin về box đã được lưu vào MongoDB
      })
      .catch((error) => {
        console.error(error);
      });

  };

  if(localStorage.getItem("isLogin"))   window.location.href = '/home';



  // useEffect(() => {
  //   // Gửi yêu cầu GET đến API endpoint /users khi component được render
  //   axios.get('http://localhost:4000/users') // Cần chỉnh sửa URL nếu backend chạy ở cổng khác
  //     .then(response => {
  //       // Cập nhật state users với dữ liệu nhận được từ server
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Lỗi khi lấy danh sách người dùng:', error);
  //     });
  // }, []);


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

  const handleRegister=()=>{
    if(emailValue && passWordValue && userNameValue){
      axios.post('http://localhost:4000/api/create-users', { email: emailValue, password: passWordValue, title: userNameValue })
      .then((response) => {
        setRegister(true); // In thông tin về box đã được lưu vào MongoDB
      })
      .catch((error) => {
        console.error(error);
      });

      

    }
    else {
      setRegister(false); 
    }

    
    
   console.log(register);
  }
  
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);

  const notify = () => {
    toast("Đăng nhập thành công!");
  }
  const notify1 = () => {
    toast("Đăng nhập thất bại!");
  }
  const notify2 = () => {
    toast("Đăng kí thành công!");
  }

  const notify3 = () => {
    toast("Đăng kí thất bại!");
  }
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
            value={email}
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
              value={password}
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
        onClick={ toastState?(
          notify
        ):(
          notify1
        )}
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
      <ToastContainer />
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
          emailValue && passWordValue && userNameValue ?(
            notify2()
            ):(
              notify3()
            )

           }}
        
        className="blogin" >Register</Button>

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
