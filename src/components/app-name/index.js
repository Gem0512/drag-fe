import React,{useState, useEffect} from 'react'
import "./style.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Index from "../text-edit/index"
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeRecords from "../records/HomeRecords"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45%',
  // height:auto,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const styleActive = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  // height:auto,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Name({
  currentTime,
  handleClick,
  openActive,
  handleCloseActive
  
}) {

  // // Nếu click lần đầu sẽ chuyển trang click từ lần 2 sẽ update
  // const [clickedOnce, setClickedOnce] = useState(false);
  // const [hasNavigated, setHasNavigated] = useState(false);
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   if (!clickedOnce ) {
  //     navigate('/records'); // Chuyển đến trang mới khi button được click lần đầu
  //     setClickedOnce(true);
  //     setHasNavigated(true);
  //   } else {
  //     if (hasNavigated){
  //       setOpenActive(true);
  //     }
  //   }
  // };

  const [value, setValue] = useState('New app');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handle =(event) => {
    console.log("aa");
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div
   >
        <div className="container"
    style={{
      display:"flex",
      width:"95%",
      padding:"20px 0px 20px 30px",
    }}>
      <div
      style={{
        width:"75%",
      }}>
            <div
            style={{
              padding:"10px",
              marginBottom:"20px",
              color:"#696969	"

            }}>
                Kintone Marketplace
                <ArrowForwardIosIcon
                sx={{
                  color:"#ccc",
                  marginBottom:"-8px",
                  padding:"0 5px 0 5px",
                }}></ArrowForwardIosIcon>
                New App
                <ArrowForwardIosIcon
                 sx={{
                  padding:"0 5px 0 5px",
                  color:"#ccc",
                  marginBottom:"-8px",
                }}></ArrowForwardIosIcon>
                Settings
            </div>
            <div 
            style={{
              display:"flex",
            }}>
                <div
                className="menuIcon"
                style={{
                  height:"50px",
                  width:"50px",
                  backgroundColor:"#50c7c7",
                  borderRadius:"10px",
                  border:"3px solid #ccc",
                  
                  display:"flex",
                  justifyContent:"center",
                  alignItems :"center",
                  marginRight: "20px",
                }}>
                     <MenuIcon></MenuIcon>
                </div>
                <div className="new-app">
                    <div>
                    <TextField
                    sx={{
                      width:"300px",
                      
                    }}
                      label="App Name"
                      value={value}
                      onChange={handleChange}
                    />
                    </div>
                    <div style={{
                      display:"flex",
                      paddingTop:"5px",
                    }}>
                    <EditNoteIcon></EditNoteIcon>
                    <p
                    style={{
                      fontSize:"12px",
                      marginTop:"4px",
                      paddingLeft:"8px",
                      color:"#A9A9A9",
                      fontWeight: 'bold'
                    }}>Notes for app administrators does not exist</p>
                    <button
                    className="create"
                    style={{
                      marginTop:"-5px",
                      fontSize:"12px",
                      border:"none",
                      backgroundColor:"#f0f0f0",
                    
                      color:"blue",
                    }}
                    onClick={handleOpen}>
                      (Create)
                    </button>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                      <div
                          style={{
                            display:"flex",
                            // paddingBottom:"5px",
                            borderBottom:"1px solid #ccc"
                          }}>
                            
                            <p
                            style={{
                              marginTop:"-5px",
                              paddingLeft: "5px",
                              fontSize:"24px",
                              width: "80%"
                            }}>Edit Notes for App Administrators</p>
                              <div
                            
                            style={{
                            width:"20%",
                            marginTop:"-10px",
                          display:"flex",
                          justifyContent:"flex-end",

                            }}>
                              <CloseIcon
                                onClick={handleClose}
                                className="close-modal"
                              sx={{
                                
                              }}></CloseIcon>
                            </div>
                          </div>
                        <div
                         style={{
                          paddingTop:"10px",
                        }}>
                          <div
                          style={{
                            color:"#696969",
                            fontSize:"14px"
                          }}>
                            <p>The feature of Notes for App Administrators allows you to freely make notes of information, such as the purpose of creating the app and designing points.</p>
                            <p>Only users who have the management permission for the app can view the notes.</p>
                          </div>
                        <Index 
                        sx={{
                          height:"400px"
                        }}
                        onTextChange={handle}></Index>
                        </div>
                        <div
                        style={{
                          marginBottom:"10px",
                        }}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox defaultChecked />} label="Include the content of this notes in app template or duplicated app" />
                        </FormGroup>
                        </div>
                        <div
                        style={{
                          paddingTop:"15px",
                          borderTop:"1px solid #ccc"
                        }}>
                        <Stack spacing={2} direction="row">
                          <Button 
                          onClick={handleClose}
                          sx={{
                            height:"45px",
                            marginRight:"70%",
                            marginLeft:"20px"
                          }}variant="outlined">Cancel</Button>
                          <Button 
                          onClick={handleClose}
                          style={{
                            padding:"5 40px"
                          }}variant="contained">Save</Button>
                        </Stack>
                        </div>
                      </Box>
                    </Modal>
                    </div>
                </div>
            </div>
      </div>
      <div
      style={{
        width:"30%",
      }}>
      <div 
        style={{
          paddingTop:"50px",
          display:"flex",
          // position:"relative",
          // paddingTop:"30px",
          justifyContent: 'flex-end',
          width:"100%"
        }}>
          
            <Stack spacing={2} direction="row" sx={{
              // position:"absolute",
              width:"100%"
             
            }}>
                <Button variant="outlined"
              sx={{
                padding:"10px 0px",
                width:"200px"
              }}>Discard creation</Button>
              <Button variant="contained"
              sx={{
                padding:"10px 15px",
                width:"200px"
              }}
              onClick={handleClick}
              > Activate app</Button>

              {open&&
              (
                <Modal
                  open={openActive}
                  onClose={handleCloseActive}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={styleActive}>
                    <div>
                    <div
                          style={{
                            display:"flex",
                            // paddingBottom:"5px",
                            borderBottom:"1px solid #ccc"
                          }}>
                            
                            <p
                            style={{
                              marginTop:"-5px",
                              paddingLeft: "5px",
                              fontSize:"24px",
                              width: "80%"
                            }}>Update App</p>
                              <div
                            
                            style={{
                            width:"20%",
                            marginTop:"-10px",
                          display:"flex",
                          justifyContent:"flex-end",

                            }}>
                              <CloseIcon
                                onClick={handleClose}
                                className="close-modal"
                              sx={{
                                
                              }}></CloseIcon>
                            </div>
                          </div>

                          <div
                          style={{
                            paddingBottom:"50px",
                            paddingTop:"50px"
                          }}>
                            <p
                            style={{
                              paddingBottom:"20px"
                            }}>
                              Apply setting changes to the app?
                            </p>
                            <p>
                              Changes to the settings below will be applied to the app.
                            </p>
                            <li>Notes for App Administrators</li>
                          </div>

                          <div
                          style={{
                            paddingTop:"20px",
                            borderTop:"1px solid #ccc"
                          }}>
                            <Stack spacing={2} direction="row">
                            <Button 
                              onClick={handleCloseActive}
                              sx={{
                                height:"45px",
                                marginRight:"190px",
                                marginLeft:"10px"
                              }}variant="outlined">Cancel</Button>
                            <Button 
                              onClick={handleCloseActive}
                              style={{
                                padding:"5 40px"
                              }}variant="contained">
                              Update App
                            </Button>
                          </Stack>
                          </div>
                    </div>
                  </Box>
                </Modal>
              )}

          
            </Stack>       
        </div>  
        <div
        style={{
          paddingLeft:"10px",
          color:"#696969",
          fontSize:"15px",
          display:"flex"
        }}>
          <p
          style={{
            paddingRight:"5px",
          }}
          >Last Updated: </p>
         
          <p>{email} at</p>
          <p
          style={{
            paddingLeft:"5px",
          }}>
          {currentTime}
          </p>
        </div>

      </div>
    


    </div>
   

      
  </div>
    
  )
}
