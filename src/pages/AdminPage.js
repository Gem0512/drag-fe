import  React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { OutlinedInput } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  borderRadius:"10px",
  boxShadow: 24,
  p: 4,
};

export default function AdminPage({
  apps, 
  setIdItemsDrop, 
  handleChangePage, 
  idItemsDrop,
  inputValueSave,
    textAreaValueSave,
    fetchItems1,
    setAppDelete,
    handleDeleteApp,
    // listAppAuthor,
    // setListAppAuthor,
    storedUser,
    appAuthors,
    isChecked,
    setNameApp
    // handleUpdateApp
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGoToPage1 = () => {
    handleChangePage(null, 0);
  };
  const handleGoToPageApp = () => {
    handleChangePage(null, 3);
  };
  const [inputValue, setInputValue] = useState('');
  const [boxes, setBoxes] = useState(apps);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  
     const [listAppAuthor, setListAppAuthor]=useState(appAuthors);


    //  console.log(listAppAuthor,"---", appAuthors)

   
      // setListAppAuthor(appAuthorsNew);
  
    const handleUpdateApp=(item)=>{
      const updatedItems = appAuthors.filter((i) => i !== item);
      window.location.reload();
      setListAppAuthor(updatedItems);
      console.log(listAppAuthor)
      // fetchItems1();
      
      // handleGoToPageApp();
    }



  const handleButtonClick = () => {

    axios.post('http://localhost:4000/api/create-box', { name: inputValue, author: storedUser })
        .then((response) => {
          console.log(response.data); // In thông tin về box đã được lưu vào MongoDB
        })
        .catch((error) => {
          console.error(error);
        });
      setInputValue('');
      const newData = {
        name: inputValue,
        author: storedUser
        // Các trường dữ liệu khác tùy ý
      };
      fetchItems1();
      setListAppAuthor([...appAuthors, newData]);
    
   
      // Kiểm tra nếu box có cùng tên đã tồn tại trong danh sách
    
      setBoxes([...apps, newData]);
   
      setInputValue('');
      console.log(boxes);
      handleClose();
      window.location.reload();

    
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  
  const [menuOpenStates, setMenuOpenStates] = useState(apps.map(() => false));

  const handleClick1 = (index) => (event) => {
    // Tạo một bản sao của mảng state và đặt trạng thái mở/đóng của menu tại vị trí tương ứng
    const newMenuOpenStates = [...menuOpenStates];
    newMenuOpenStates[index] = !newMenuOpenStates[index];
    setMenuOpenStates(newMenuOpenStates);
  
    // Đặt anchorEl cho menu hiện tại
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose1 = (index) => () => {
    // Tạo một bản sao của mảng state và đặt trạng thái đóng của menu tại vị trí tương ứng
    const newMenuOpenStates = [...menuOpenStates];
    newMenuOpenStates[index] = false;
    setMenuOpenStates(newMenuOpenStates);
  
    // Đặt anchorEl là null để đóng menu
    setAnchorEl(null);
  };

  const [users, setUsers]= useState('');


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

 

  // console.log(apps);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);



  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const appWithId = apps.find((app) => app._id === selectedItem);

  // console.log(appWithId?.options);

  const handleOptionChange = (event, value) => {
    setSelectedOptions(value);
  };

  const handleAddOption = () => {
    if (selectedItem) {
      // Gửi các giá trị đã chọn lên backend
      axios.post('http://localhost:4000/api/saveData', { itemId: selectedItem, options: selectedOptions.map(option => option.title) })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });

        setOpen2(false);
    }

    window.location.reload();
    
  };

  

  const foundItem = apps.find(app => app._id === idItemsDrop);



  const [adminNewApp, setAdminNewApp]= useState(); 

  const foundNewApp = apps.find(app => app._id === adminNewApp);

  // console.log(foundNewApp);


  const label = localStorage.getItem("label");

    const [input, setInput]= useState('');
    const [textArea, setTextArea]= useState('');
    const [dataList, setDataList] = useState([]);


    const handleSubmit = async (event) => {
      setOpen(false);
      axios.post('http://localhost:4000/api/create-item', { name: input, description: textArea, label: label, inside: adminNewApp  })
      .then((response) => {
        console.log(response.data); // In thông tin về box đã được lưu vào MongoDB
        fetchItems1();
      })
      .catch((error) => {
        console.error(error);
      });
  
 
    
    // console.log( input,"/",textArea,"/",label );
    handleCloseNew();

       
      };


  // console.log(apps, foundItem.items);


  const [openNew, setOpenNew] = React.useState(false);
  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);


  // const storedUser = localStorage.getItem('email');

  // const appAuthors = apps.filter((app) => app?.author?.includes(storedUser)?? false);

  // console.log(inputValueSave);

  const inputFinal = localStorage.getItem('inputValue');
  const isCheckedLocal= (localStorage.getItem('isChecked'));
  // console.log(isCheckedLocal);
// console.log(inputFinal)
  return (

    <div
     style={{
        marginLeft:"20px",
        width:"100%"
     }}>
     <div style={{
      // display:"flex",
      // justifyContent:"flex-end",
      // width:"100%",
      // paddingLeft:"100px"
     }}>
     <Button 
      sx={{
        backgroundColor:"#75C2F6",
        color:"white",
        padding:"0px 10px",
        ':hover':{
            backgroundColor:"green",

        }
      }} onClick={handleOpen}>
        <h3>Create App</h3>
       
      </Button>
     </div>

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <h4>APP NAME</h4>
           <OutlinedInput
            onChange={handleInputChange}
            value={inputValue}
            type="text"
           sx={{
            marginTop:"10px",
            display:"block"
           }}></OutlinedInput>

           <div
           style={{
            display:"flex",
            width:"100%"
           }}>
              <div
              style={{
               
                width:"50%",
                marginTop:"10px"
              }}>
              <Button
              onClick={handleClose}
              sx={{
                padding:"10px",
                backgroundColor:"#ccc",
                color:"Black",
                
              }}> CLOSE</Button>
              </div>
              <div
              style={{
                display:"flex",
                justifyContent:"flex-end",
                width:"50%",
                marginTop:"10px"
              }}>
              <Button
              onClick={handleButtonClick}
              sx={{
                padding:"10px",
                backgroundColor:"green",
                color:"white",
                ':hover':{
                    color:"white",
                    backgroundColor:"blue"
                }
              }}> CREATE</Button>
              </div>
           </div>
        </Box>
      </Modal>

      <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding:"20px",
        marginLeft:"-20px",
        borderRadius:"10px",
        marginTop:"20px",
        width:"100%"
      }}>
      <div style={{
        display:"block",
        paddingLeft:"15px"
        
      }}>
        <h2>My app</h2>
      </div>

      <div
      style={{
        display:"flex",
        flexWrap: "wrap",
      }}>
     {/* {
      appAuthors.map((app,index)=>(
        <div>
          {app.name}
        </div>
      ))
     } */}
     
      {
        appAuthors.map((app, index) => (
          <div key={app._id}>
            <p
              style={{
                color: "blue",
                padding: "10px 15px",
                backgroundColor: "#ccc",
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "5px"
              }}
            >
              <Button
                id={`basic-button-${index}`} 
                aria-controls={`basic-menu-${index}`} 
                aria-haspopup="true"
                aria-expanded={menuOpenStates[index] ? "true" : undefined}
                onClick={handleClick1(index)} 
              >
                {app.name}
                <ArrowDropDownIcon />
              </Button>
            </p>
            <Menu
              id={`basic-menu-${index}`} 
              anchorEl={anchorEl}
              open={menuOpenStates[index]} 
              onClose={handleClose1(index)} 
              MenuListProps={{
                "aria-labelledby": `basic-button-${index}` // Đặt id duy nhất cho mỗi Button
              }}
            >
            {/* onClick={() => handleChangePage(0)} */}
              <MenuItem onClick={() => { setSelectedItem(app._id); setOpen2(true); }}>
              <PersonAddAltIcon
              sx={{
                marginRight:"5px",
                marginTop:"-5px"
              }}></PersonAddAltIcon>
              Add user</MenuItem>
              <MenuItem onClick={()=> {setNameApp(app.name);setIdItemsDrop(app._id); handleGoToPage1()} }>
              <EditNoteIcon
              sx={{
                marginRight:"5px",
                marginTop:"-5px"
              }}></EditNoteIcon>
              Edit</MenuItem>
              <MenuItem onClick={()  => {handleOpenNew(); setAdminNewApp(app._id);}}>
              <PublishIcon
              sx={{
                marginRight:"5px",
                marginTop:"-5px"
              }}></PublishIcon>
              Record</MenuItem>
              <MenuItem onClick={() => {handleClose1(index); setAppDelete(index); handleDeleteApp(app._id); handleUpdateApp(app._id);}}>
              <DeleteOutlineIcon
              sx={{
                marginRight:"5px",
                marginTop:"-5px"
              }}></DeleteOutlineIcon>
              Delete</MenuItem>
            </Menu>
          </div>
        ))
      }
      <Modal
              open={openNew}
              onClose={handleCloseNew}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <h2>Form Submit</h2>
              <hr></hr>
              {
                foundNewApp?.items.map((item, index) => (
              <div key={index}>
              {item === '1' && (
                    <div
                          style={{
                            margin:"10px",
                          }}>

                          {
                            isCheckedLocal &&(
                              <label name="input"
                                style={{
                                fontWeight:"bold",
                                marginLeft:"-10px",
                                display:"block"
                            }}>{inputFinal}</label>
                            )
                          }
                           
                            <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                              padding: "10px"
                            }}
                            for="input"></input>
                            {/* <p>Số kí tự{}</p> */}
                          </div>
                  )}
                  {item === '3' && (
                    <div
                          style={{
                            margin:"10px 0 20px 10px",
                          }}>
                          <label
                          style={{
                            fontWeight:"bold",
                            marginLeft:"-10px"
                          }}>Label</label>
                            <p>{label}</p>
                          </div>
                    )}
                  {item === '4' && (
                    <div
                          style={{
                            margin:"10px 0 20px 10px",

                          }}>
                            <label 
                            style={{
                            fontWeight:"bold",
                            marginLeft:"-10px",
                            display:"block"
                          }}
                          name="textarea">{textAreaValueSave||"Text area"}</label>
                            <textarea 
                            style={{
                              width:"300px",
                              padding:"10px 0 0 5px"
                            }}
                            value={textArea}
                            onChange={(e) => setTextArea(e.target.value)}
                            for="textarea"></textarea>
                          </div>
                  )}
                  
              </div>
            ))
                }
                <div
                style={{
                  display:"flex",
                  justifyContent:"flex-end",
                  width:"100%"
                }}>
                  <Button 
                  sx={{
                    background:"#0A6EBD",
                    padding:"10px 15px",
                    color:"white",
                    ':hover':{
                      backgroundColor:"green"
                    }
                  }}
                    onClick={handleSubmit}>Submit</Button>
                </div>
                
              </Box>
            </Modal>
        {/* {apps.map(app => (
              <div key={app._id}>
              <p
                    style={{
                    color:"blue",
                    padding:"10px 15px",
                    backgroundColor:"#ccc",
                    margin:"10px",
                    display:"flex",
                    justifyContent:"center",
                    borderRadius:"5px"
                }}>
                   <Button
                    id="basic-button"
                  aria-controls={open1 ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? 'true' : undefined}
                  onClick={handleClick1}
                    >
                       {app.name}
                       <ArrowDropDownIcon></ArrowDropDownIcon>
                    </Button>
                </p>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open1}
                    onClose={handleClose1}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => { setSelectedItem(app._id); setOpen2(true); }}>Add user</MenuItem>
                    <MenuItem onClick={handleClose1}>Rename</MenuItem>
                    <MenuItem onClick={handleClose1}>Delete</MenuItem>
                </Menu>                      
              </div>
          ))} */}
                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                      <Autocomplete   
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={users}
                        getOptionLabel={(option) => option.title}
                        onChange={handleOptionChange}
                        // defaultValue="admin"
                        renderInput={(params) => (
                            <TextField {...params} label="Add user..." placeholder="Favorites" />
                        )}
                        sx={{ width: '400px' }}
                        />

                        <h3>Các User đã được add</h3>

                        <div 
                        style={{
                          marginBottom:"50px",

                        }}>
                          {appWithId?.options.map((option,index)=>(
                            <p
                            style={{
                              backgroundColor:"white",
                              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                              borderRadius:"5px",
                              padding:"5px",
                              width:"70px",
                              display:"flex",
                              justifyContent:"center"
                            }}>
                              {option}
                            </p>
                          ))}
                        </div>
                       
                        <div
                        style={{
                            display:"flex",
                            margin:"20px 0px 0px 0px",
                            justifyContent:"flex-end",
                            width:"100%"
                        }}>

                            <div style={{width:"100%",
                            marginLeft:"20px"}}>
                            <Button
                                sx={{
                                    padding:"10px",
                                    backgroundColor:"#ccc",
                                    color:"black",
                                    
                                }}
                                onClick={handleClose2}
                            >Close</Button>
                            </div>
                           <div 
                           style={{
                            width:"50%",
                                    display:"flex",
                                    justifyContent:"center"
                           }}>
                           <Button
                                sx={{
                                    padding:"10px",
                                    backgroundColor:"#1D5D9B",
                                    color:"white",
                                    ':hover':{
                                      backgroundColor:"green"
                                    }
                                }}
                                onClick={handleAddOption}
                            >Add</Button>
                           </div>
                        </div>
                    </Box>
                </Modal>
           
      </div>
      </div>
    </div>
  );
}
