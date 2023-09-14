import  React, {useState,useEffect, useFocus, useRef} from 'react';
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Cookies from 'js-cookie';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Link, useNavigate } from 'react-router-dom';

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
  forms,
  apps, 
  formsNoUser,
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
    setNameApp,
    nameApp,
    renderButton,
    renderButton2,
    setSelectedItem,
    selectedItem,
    fetchItems,
    idRename, 
    setIdRename,
    setOldData,
    mergedItems,
    handleData,
    setBoard,
    setState1
    // handleUpdateApp
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleGoToPage1 = async(id) => {
    await setIdItemsDrop(id);
    localStorage.setItem("board", JSON.stringify(''));
    handleChangePage(null, 0);
    setBoard([]);
    
    localStorage.setItem('idItemsDrop', id);
    // window.location.reload();
    fetchItems();
           handleData();
    // setTimeout(() => {
    //        fetchItems();
    //        handleData();
    //     }, 1000)
    console.log("<<<", idItemsDrop, id);
    navigate(`/home/edit/${id}`);
    
  };
  // console.log(idItemsDrop)
  console.log(">>>>", localStorage.getItem('idItemsDrop'));

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
  
    const handleUpdateApp=(item, index)=>{
      const updatedItems = appAuthors.filter((i) => i !== item);
   
      setListAppAuthor(updatedItems);
      console.log(listAppAuthor)
      // fetchItems1();
      
      // handleGoToPageApp();
      fetchItems();
      // handleClose1(item);
      const newMenuOpenStates = [...menuOpenStates];
    newMenuOpenStates[index] = !newMenuOpenStates[index];
    setMenuOpenStates(newMenuOpenStates);
    handleData();
    fetchItems();
   
    }
    // useEffect (()=>{
    //   handleData();
    //   fetchItems();
    // })

    const access_token = Cookies.get('access_token');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${access_token}`);

  const handleButtonClick =  async() => {
    try{
     await fetch('http://localhost:4000/api/v1/forms/createForm', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          name: inputValue,
        })
        })
     }
     catch (error){
      console.log("Đã có lỗi khi create form:", error)
     }
  
    // axios.post('http://localhost:4000/api/v1/forms/createForm', { name: inputValue})
    //     .then((response) => {
    //       console.log(response.data); // In thông tin về box đã được lưu vào MongoDB
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    fetchItems();
    handleData();
      handleClose();
       
    
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
    fetchItems();
    handleData();
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
    const fetchItems2 = async ()=> {
      try{
        const response = await fetch(`http://localhost:4000/api/v1/users?current=${1}&pageSize=${100}`, {
          method: 'GET',
          headers: myHeaders,
          })
          const responseData = await response.json();
          
          setUsers(responseData.data.result);
     
       }
       catch (error){
        console.error('Lỗi khi lấy danh sách form ủy quyền:', error);
       }
    }
    fetchItems2();
   
    
  }, []);

 

  // console.log(apps);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);



  const [selectedOptions, setSelectedOptions] = useState([]);


  const appWithId = apps.find((app) => app._id === selectedItem);

  // console.log(appWithId?.options);

  const handleOptionChange = (event, value) => {
    setSelectedOptions(value);
  };

  // console.log(selectedOptions, selectedItem);
  // const handleAddOption = async () => {
  //   if (selectedItem) {
  //     // const dataArray = data.map(item => item);

  //     try{
  //       await fetch(`http://localhost:4000/api/v1/forms/options/${selectedItem}`, {
  //         method: 'POST',
  //         headers: myHeaders,
  //         body: {
  //           options: selectedOptions.map(option => option.title) 
  //         }
  //         })
  //      }
  //      catch (error){
  //       console.log("Đã có lỗi khi add options::", error)
  //      }

  //      console.log(selectedOptions.map(option => option.title) )
  //       setOpen2(false);
  //   }
  // };
  const handleAddOption = async () => {
    if (selectedItem) {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/forms/options/${selectedItem}`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            options: selectedOptions.map(option => option._id)
          })
        });
  
        if (response.ok) {
          console.log("Thêm options thành công");
        } else {
          console.log("Đã có lỗi khi thêm options:", response.statusText);
        }
      } catch (error) {
        console.log("Đã có lỗi khi thêm options:", error);
      }
  
      console.log(selectedOptions.map(option => option.title));
      setOpen2(false);
    }
    fetchItems();
    handleData();
  };
  


    // try{
      //   const response = await fetch(`http://localhost:4000/api/v1/forms/options/${selectedItem}`, {
      //     method: 'POST',
      //     headers: myHeaders,
      //     body: {
      //       'options': selectedOptions.map(option => option.title) 
      //     }
      //     })
      //     const responseData = await response.json();
          
      //     setUsers(responseData);
      //     console.log(responseData.data);
      //  }
      //  catch (error){
      //   console.error('Lỗi khi add options:', error);
      //  }

// console.log(selectedOptions.map(option => option.title))
  

  const foundItem = apps.find(app => app._id === idItemsDrop);



  const [adminNewApp, setAdminNewApp]= useState(); 
  const [dataRecord, setDataRecord]= useState([]);

  const handleRecord=async (id)=>{
    try{
            const response = await fetch(`http://localhost:4000/api/v1/forms/getFormById/${id}`, {
              method: 'GET',
              headers: myHeaders,
              })
              const responseData = await response.json();
              setDataRecord(responseData.data?.items);
            
           }
           catch (error){
            console.error('Lỗi khi lấy danh sách form ủy quyền:', error);
           }
           fetchItems();
           handleData();
  }



  const foundNewApp = apps.find(app => app._id === adminNewApp);

  // console.log(foundNewApp);
  const valueSample1= localStorage.getItem("valueSample1");
const valueSample2= localStorage.getItem("valueSample2");
const inputValueFromCheckBox= localStorage.getItem("inputValueFromCheckBox");
  // console.log(isCheckedLocal);
// console.log(inputFinal)

const [isPicked, setIsPicked] = useState(false); 
  const [isPicked1, setIsPicked1] = useState(false); 
const [sample1, setSample1]=  useState();

const [sample2, setSample2]=  useState();

const handleCheckboxPicked = (event) => {
  setIsPicked(event.target.checked);
  if(isPicked===false){
    setSample1(valueSample1);
  }
  else setSample1('');
};


const handleCheckboxPicked1 = (event) => {
  setIsPicked1(event.target.checked); 
  if(isPicked1===false){
    setSample2(valueSample2);
  }
  else setSample2('');
};

  const label = localStorage.getItem("label");
  const textAreaLocal = localStorage.getItem("inputValueFromTextArea");
  // console.log(label);

    const [input, setInput]= useState('');
    const [textArea, setTextArea]= useState('');
    const [dataList, setDataList] = useState([]);


  

    
      const [openModalRename, setOpenModalRename] = React.useState(false);
      const handleOpenRename = () => 
      {
        setOpenModalRename(true);
        fetchItems();
        handleData();
      }
      const handleCloseRename = () => setOpenModalRename(false);
      const [newNameForm, setNewNameForm]=  useState();
      const inputReference = useRef(null);


      
      const handleSaveRename = async() =>{
        try {
          const response = await fetch(`http://localhost:4000/api/v1/forms/update/${idRename}`, {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify({
              name: newNameForm
            })
          });
    
          if (response.ok) {
            console.log("Rename thành công");
          } else {
            console.log("Đã có lỗi khi rename:", response.statusText);
          }
        } catch (error) {
          console.log("Đã có lỗi khi rename:", error);
        }
        fetchItems();
        handleData();
        handleCloseRename();
      }


  // console.log(apps, foundItem.items);


  const [openNew, setOpenNew] = React.useState(false);
  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);


  // const storedUser = localStorage.getItem('email');

  // const appAuthors = apps.filter((app) => app?.author?.includes(storedUser)?? false);

  // console.log(inputValueSave);

  const inputFinal = localStorage.getItem('inputValue');
  const isCheckedLocal= (localStorage.getItem('isChecked'));

  const [inputValues, setInputValues] = useState({}); // Mảng lưu giá trị của từng input

  const handleInputChangeResult = (index, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]:value, 
      3: filteredItems? filteredItems:prevValues[3],
      5: sample1? sample1:prevValues[5],
      6: sample2? sample2:prevValues[6],// Lưu giá trị của input theo chỉ số index
    }));
    fetchItems();
    handleData();
  };
  window.addEventListener("load", function() {
    handleData();
    fetchItems();
});
  const handleInputChangeResult1 = (index, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]:value, 
    }));
    fetchItems();
    handleData();
  };
 
// const [labelValue, setLabelValue]= useState();
const filteredItems =  dataRecord?dataRecord
  .filter(item => item.id === 3)
  .map(item => item.name||"Label")
  .join():"";
// console.log(filteredItems);
  const handleSubmit = async (event) => {

    setOpen(false);
  try {
    const response = await fetch(`http://localhost:4000/api/v1/results/createResult`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        inputValues,
       
      })
    });

    if (response.ok) {
      console.log("Thêm items thành công");
    } else {
      console.log("Đã có lỗi khi thêm items:", response.statusText);
    }
  } catch (error) {
    console.log("Đã có lỗi khi thêm items:", error);
  }
  fetchItems();
  handleData();
  handleCloseNew();
    };
// const handleLoad=(id, name) =>{
//   setNameApp(name);
//   setIdItemsDrop(id);
//   fetchItems();
//   handleData();
// }


// useEffect(() => {
//   // Khi nameApp hoặc idItemsDrop thay đổi, useEffect này sẽ được gọi
//   // Bạn có thể đặt các logic liên quan đến fetchItems và handleData ở đây

//   // Gọi fetchItems và handleData sau khi cập nhật state
//   fetchItems();
//   handleData();
// }, [idItemsDrop]);

const handleLoad = async (id, name) => {
  try {
    // Cập nhật state nameApp và idItemsDrop
    await setNameApp(name);
    await setIdItemsDrop(id);
    await setState1(false);
  
   
  } catch (error) {
    console.error('Lỗi khi cập nhật state:', error);
  }
  console.log(idItemsDrop)
};


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
            // value={inputValue}
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
        width:"97%"
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
        forms?.length> 0 ? (forms.map((app, index) => (
          <div key={app._id}>
            
              <Button
            
              sx={{
                color: "blue",
                padding: "15px 20px",
                backgroundColor: "#ccc",
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "5px"
              }}
            
                id={`basic-button-${index}`} 
                aria-controls={`basic-menu-${index}`} 
                aria-haspopup="true"
                aria-expanded={menuOpenStates[index] ? "true" : undefined}
                onClick={handleClick1(index)} 
              >
                {app.name}
                <ArrowDropDownIcon />
              </Button>
            
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

              {/* <Link to="/home/editForm"> */}
                <MenuItem onClick={()=> { handleLoad(app._id, app.name);handleGoToPage1(app._id);} }>
               <EditNoteIcon
              sx={{
                marginRight:"5px",
                marginTop:"-5px"
              }}></EditNoteIcon>
              Edit</MenuItem>
              {/* </Link> */}

              <MenuItem onClick={()  => {handleOpenRename();setIdRename(app._id);}}>
              <DriveFileRenameOutlineIcon
              sx={{
                marginRight:"5px",
                marginTop:"-5px"
              }}></DriveFileRenameOutlineIcon>
              Rename</MenuItem>

              <MenuItem onClick={()  => {handleOpenNew(); setAdminNewApp(app._id);handleRecord(app._id)}}>
              <PublishIcon
              sx={{
                marginRight:"5px",
                marginTop:"-5px"
              }}></PublishIcon>
              Record</MenuItem>

              <MenuItem onClick={() => {handleClose1(index); setAppDelete(index); handleDeleteApp(app._id); handleUpdateApp(app._id, index); handleData(); fetchItems();}}>
              <DeleteOutlineIcon
              sx={{
                marginRight:"5px",
                marginTop:"-5px"
              }}></DeleteOutlineIcon>
              Delete</MenuItem>
            </Menu>
          </div>
        ))
      ):(
        <Box
        sx={{
          paddingLeft:"80%"
        }}
        >
          No item
        </Box>
      )
      }
      <Modal
              open={openNew}
              onClose={handleCloseNew}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <h2>Form Submit</h2>
              <hr
              style={{
                marginBottom:"30px"
              }}></hr>
              {
                dataRecord?.length>0 && dataRecord.map((item, index) => (
              <Box
              
              key={index}
              >
              {item.id === 1 && (
              <Box style={{ margin: '10px' }}>
                <Typography>{item.name || 'Input'}</Typography>
                <TextField
                  sx={{
                    width: '100%',
                    marginBottom: '20px',
                  }}
                  id={`outlined-basic-${index}`}
                  onChange={(e) => handleInputChangeResult(index, e.target.value)}
                  value={inputValues[index] || ''}
                  variant="outlined"
                />
              </Box>
            )}
                
                  {item.id === 3 && (
                    <div
                          style={{
                            margin:"10px 0 20px 10px",
                            paddingLeft:"10px"
                          }}>
                          <label
                          style={{
                            fontWeight:"bold",
                            marginLeft:"-10px"
                          }}>Label</label>
                            <p>{item.name ||"Label"}</p>
                          </div>
                    )}
                  {item.id === 4 && (
                    <div
                          style={{
                            margin:"10px 0 20px 10px",

                          }}>
                          <Typography>{item.name ||"Text area"}</Typography>
                           
                          <TextField
                            sx={{
                              width: '100%',
                              marginBottom: '20px',
                            }}
                            id={`outlined-basic-${index}`}
                            onChange={(e) => handleInputChangeResult1(index, e.target.value)}
                            value={inputValues[index] || ''}
                            // label={`inputFinal-${index}`}
                            variant="outlined"
                          />
                          </div>
                  )}
                  {item.id === 5 && (
                    <Box 
                    sx={{
                      paddingLeft:"10px"
                    }}>
                    <Typography
                    sx={{
                      fontWeight:"bold",
                      marginTop:"10px"
                    }}>
                      {item.name|| "Check box"}
                    </Typography>
                    <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox />}
                        label={valueSample1}
                        labelPlacement="end"
                        checked={isPicked} 
                        onChange={handleCheckboxPicked}
                        // readOnly
                      />
                      {renderButton()}
                      <FormControlLabel
                        value="end"
                        control={<Checkbox />}
                        label={valueSample2}
                        labelPlacement="end"
                        checked={isPicked1} 
                        onChange={handleCheckboxPicked1}
                        // disabled
                      />
                      {renderButton2()}
                    </FormGroup>
       
                    </Box>
                  )}
                  
              </Box>
            ))
                }
                <Box
                sx={{
                  display:"flex",
                  marginTop:"30px"
                }}>
                    <Button 
                  sx={{
                    background:"#ccc",
                    padding:"10px 15px",
                    color:"black",
                    // ':hover':{
                    //   backgroundColor:"green"
                    // }
                  }}
                    onClick={handleCloseNew}>Cancel</Button>
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
                     <Typography variant="h5" gutterBottom>Add User</Typography>
                     <hr></hr>
                      <Autocomplete   
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={users}
                        getOptionLabel={(option) => option.title}
                        onChange={handleOptionChange}
                        // defaultValue="admin"
                        renderInput={(params) => (
                            <TextField {...params} label="Add user..." placeholder="Add..." />
                        )}
                        sx={{ width: '400px',
                        marginTop:"35px" }}
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
                              padding:"5px 10px",
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
                            margin:"30px 0px 0px 0px",
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

                <Modal
              open={openModalRename}
              onClose={handleCloseRename}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography 
                sx={{
                  marginBottom:"15px",
                }} variant='h4'>Rename form</Typography>
                <hr></hr>
                <TextField className='input-rename' sx={{
                  width:"100%",
                  marginTop:"15px"
                }} 
                ref={inputReference}
                id="filled-basic" 
                label="New name" 
                variant="filled" 
                onChange={(e)=>{setNewNameForm(e.target.value)}}
                />
                <Box sx={{
                  display:"flex",
                  marginTop:"30px"
                }}>
                  <Box sx={{
                    width:"50%"
                  }}>
                    <Button variant="outlined"  onClick={handleCloseRename}>Close</Button>
                  </Box>
                  <Box sx={{
                    width:"50%",
                    display:"flex",
                    justifyContent:"flex-end"
                  }}>
                    <Button variant="contained" onClick={handleSaveRename}>Save</Button>
                  </Box>
                </Box>
              </Box>
            </Modal>
           
      </div>
      </div>
    </div>
  );
}
