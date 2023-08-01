import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import axios from 'axios'; 
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { OutlinedInput, Box, Typography,Button } from '@mui/material';


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
  console.log(email);

  const handleLogin = async (event) => {
    event.preventDefault(); // Ngăn chặn sự kiện submit mặc định của form
            
      // for (let i = 0; i < users.length; i++) {
      //   const user = users[i];
  
      
      // }

      // setRole('admin'); 
      let a=1;
      console.log(users);
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if(email===user.email && password===user.password){
          window.location.href = '/home';
          alert("Đăng nhập thành công");
          a=0;
        }
      }
      if(a===1) alert("Tài khoản không hợp lê");
  
      // if(localStorage.getItem('role')==="admin" || localStorage.getItem('role')==="user") 
      // {
      //   window.location.href = '/home';
      // alert("Đăng nhập thành công");
      
      // }

  };



  useEffect(() => {
    // Gửi yêu cầu GET đến API endpoint /users khi component được render
    axios.get('http://localhost:4000/users') // Cần chỉnh sửa URL nếu backend chạy ở cổng khác
      .then(response => {
        // Cập nhật state users với dữ liệu nhận được từ server
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
      });
  }, []);


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
  }

  const handleChangePassword=(event)=>{
    setPasswordValue(event.target.value);
  }

  const handleChangeUserName=(event)=>{
    setUserNameValue(event.target.value);
  }
  // console.log(emailValue, passWordValue, userNameValue);

  const handleRegister=()=>{
    axios.post('http://localhost:4000/api/create-users', { email: emailValue, password: passWordValue, title: userNameValue })
        .then((response) => {
          console.log(response.data); // In thông tin về box đã được lưu vào MongoDB
        })
        .catch((error) => {
          console.error(error);
        });
        console.log(emailValue, passWordValue, userNameValue);
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
          <input
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
              backgroundColor:"white",
              paddingRight:"10px",
              width:"355px",
              border:"1px solid #ccc",
              borderRadius:"5px"
            }}>
              <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                border:"none",
                width:"340px"
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
        className="blogin" type="submit">Login</button>
        <Box 
         style={{
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
        style={{
          marginTop:"30px"
        }}
        onClick={handleRegister}
        
        className="blogin" >Register</Button>

        <Box 
         style={{
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
