import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../components/css/ViewPage.css";
import axios from "axios";
import { OutlinedInput } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TextField from '@mui/material/TextField';
const columns = [
    { field: 'name', headerName: 'Name', width: 500 },
    { field: 'edit', 
      headerName: '', 
      width: "120" ,
      renderCell: (params) => (
        <div>
          <CreateIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
          <span style={{
            color:"#0099CC"
          }}>Edit</span>
        </div>
      ),
    },
    { field: 'duplicate', 
      headerName: '', 
      width: "120" ,
      renderCell: (params) => (
        <div>
          <ContentCopyIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
          <span style={{
            color:"#0099CC"
          }}>Duplicate</span>
        </div>
      ),
    },
    { field: 'delete', 
      headerName: '', 
      width: "120",
      renderCell: (params) => (
        <div>
          <HighlightOffIcon style={{ marginRight: 8, marginBottom: -5, color:"red"}} />
          <span style={{
            color:"red"
          }}>Delete</span>
        </div>
      ),
     },
  ];
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    padding:"20px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const style_ = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #ccc',
    borderRadius:"5px",
    boxShadow: 24,
    p: 4,
  };

export default function ViewsPage({
  inputValueView,
  droppedItems,
  ElementList,
  renderButton,
  renderButton2,
  inputValueSave,
  textAreaValueSave,
  input11,
  input2,
  setError,
  setInput3,
  error,
  checkLabel,
  deleteItem,
  deleteItemText,
  deleteItemLabel,
  inputValues,
  checkboxes,
  valueSample1,
  valueSample2,
  sample1,
  sample2,
  inputValues2,
  roleUser,
  items,
  fetchItems1,
  appAuthors

}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const getTypeById = (id) => {
    const element = ElementList.find((item) => item.id === id);
    return element ? element.type : "";
  };
  // Data
  const [input1, setInput1] = useState('');
  const [textarea, setTextarea]= useState('');


  const handleChangeInput1 = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInput1(value)
   
    handleInput3Change(event);
  }
  const handleChangeTextarea=(event)=>{
    event.preventDefault();
    const value = event.target.value;
    setTextarea(value)
  }

  const [rows, setRows] = useState(items);

  const [sizeText, setSizeText]= useState('');

  const [checkBox1, setCheckBox1]=useState(inputValues||"sample1");
  
  
  const handleClick = (event) => {
   

    axios.post('http://localhost:4000/api/create-item', { name: input1, description: textarea, label: label })
        .then((response) => {
          console.log(response.data); // In thông tin về box đã được lưu vào MongoDB
        })
        .catch((error) => {
          console.error(error);
        });
    
      const newData = {
        name: input1,
        description: textarea, 
        label: label
      };

      
   
      // Kiểm tra nếu box có cùng tên đã tồn tại trong danh sách
    
      setRows([...items, newData]);
      setModalData({ id: '', name: '', text: '', label:'' });
      
      console.log(rows,"/", input1,"/",textarea,"/",label ,"/");
      console.log(droppedItems);

    const test= checkboxes?.checked;
    const newRow = {
      id: rows.length +1,
      email: email,
      name: input1,
      text: textarea,
      label: label,
      // valueSample1:sample1,
      value: checkBox1,
      // valueSample2:sample2,
      value2:inputValues2
    };

   
  
    const updatedRows = [...rows, newRow];
    // localStorage.setItem('input1', newRow.name);
    // localStorage.setItem('textarea', newRow.text);
    event.preventDefault();
   
    
      localStorage.removeItem('input1');
      if(inputValue1.length >=1 && inputValue2.length >=1){
        if ( checkValue.length >= parseInt(inputValue1) && checkValue.length <=parseInt(inputValue2)  ){
          console.log("thành công!");
          localStorage.setItem('rows', JSON.stringify(updatedRows));
          setRows(updatedRows);
          handleClose();
        }
        else{
          alert("Số kí tự của "+ inputValueSave+" phải từ "+ inputValue1+ " đến "+inputValue2);
        }
      }
      else{
        console.log("thành công!");
          localStorage.setItem('rows', JSON.stringify(updatedRows));
          setRows(updatedRows);
          handleClose();
      }
    
    // console.log(localStorage.getItem('change1'));
    console.log(inputValue1, inputValue2);
    console.log(sample1, sample2);
  };


  console.log(rows);



  // useEffect(() => {

  //   // Lấy dữ liệu từ localStorage
  //   const storedData = JSON.parse(localStorage.getItem('rows'));
  //   setRows(storedData);
  // }, []);

  


  const [label, setLabel]= useState("");
  useEffect(() => {
    
    const labelValue = localStorage.getItem('label');
    const input1Value = localStorage.getItem('input1');
    const TextareaValue = localStorage.getItem('textarea');

    if (input1Value) {
      setInput1(input1Value);
    }
    if (TextareaValue && TextareaValue !=='null') {
      setTextarea(TextareaValue);
    }
    if (labelValue && checkLabel) {
      setLabel(labelValue);
    }
  }, []);





  const handleDeleteRow = (itemId) => {
   

    axios.delete(`http://localhost:4000/api/delete-try/${itemId}`)
      .then(response => {
        console.log(response.data.message); // Hiển thị thông báo từ backend
        // Cập nhật state items để loại bỏ item đã bị xóa
        setRows(prevItems => prevItems.filter(item => item._id !== itemId));
      })
      .catch(error => console.error('Error deleting item:', error));
    console.log(itemId);
    fetchItems1();
    window.location.reload();
   
    // const updatedRows = rows.filter(row => row.id !== itemId);
    // setRows(updatedRows);
  
    // Xóa object tương ứng trong local storage
    // const storedData = JSON.parse(localStorage.getItem('rows')) || [];
    // const updatedData = storedData.filter(data => data.id !== itemId);
    // localStorage.setItem('rows', JSON.stringify(updatedData));
  };


  // Duplication object
  const handleDuplicateRow = (item) => {
    axios.post('http://localhost:4000/api/create-item', { name: item.name, description: item.description, label: item.label, inside: item.inside  })
    .then((response) => {
      console.log(response.data); // In thông tin về box đã được lưu vào MongoDB
      fetchItems1();
    })
    .catch((error) => {
      console.error(error);
    });

    window.location.reload();
  
  };



  // show user
  
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);


  const [checkValue, setCheckValue]= useState('');

  const handleInput3Change = (event) => {
    setCheckValue(event.target.value);
  }



  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  useEffect(() => {
    const storedValue1 = localStorage.getItem('inputValue1');
    const storedValue2 = localStorage.getItem('inputValue2');

    if (storedValue1) {
      setInputValue1(storedValue1);
    }

    if (storedValue2) {
      setInputValue2(storedValue2);
    }
  }, []);



  const [editingRow, setEditingRow] = useState(null);
  const [modalData, setModalData] = useState({ id: '', name: '', text: '', label:'' });


  const [nameState, setNameState]= useState('');
  const [textState, setTextState]= useState('');
  const [labelState, setLabelState]= useState('');

  const handleInputEdit =(event)=>{
    setNameState(event.target.value);
    console.log(nameState);
  }

  const handleTextEdit =(event)=>{
    setTextState(event.target.value);
  }
  const handleLabelEdit =(event)=>{
    setLabelState(event.target.value);
  }
  
 const [item_, setItem_]= useState();

  const handleEditClick = (item) => {
    handleOpen_();
    setItem_(item);
    if(item.name){
      setNameState(item.name);
    }
    if(item.description){
      setTextState(item.description);
    }
    if(item.label){
      setLabelState(item.label);
    }
    const pick =item._id;

   console.log(nameState)
    
    };
  
    const handleSaveItemEdit =() =>{

    
          console.log(nameState)

          axios.post('http://localhost:4000/api/create-item', {name: nameState, description: textState, label: labelState, inside: item_.inside  })
          .then((response) => {
            console.log(response.data); // In thông tin về box đã được lưu vào MongoDB
            fetchItems1();
          })
          .catch((error) => {
            console.error(error);
          });
          // window.location.reload();

          axios.delete(`http://localhost:4000/api/delete-try/${item_._id}`)
      .then(response => {
        console.log(response.data.message); // Hiển thị thông báo từ backend
        // Cập nhật state items để loại bỏ item đã bị xóa
        setRows(prevItems => prevItems.filter(item => item._id !== item_._id));
        console.log(item_._id);
      })
      .catch(error => console.error('Error deleting item:', error));

      window.location.reload();

    }

  const handleModalInputChange = (event) => {
    const { name, value } = event.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(event.target, "/", name,"/", value);
  };

  const handleModalInputChange1 = (event) => {
    const { name, value } = event.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalInputChange2 = (event) => {
    const { name, value } = event.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSave = () => {
    setRows((prevData) =>
      prevData.map((row) => (row.id === editingRow ? { ...modalData } : row))
    );

    const objectIndex = rows.findIndex(obj => obj.id === editingRow);
    if (objectIndex !== -1) {
      rows[objectIndex] = modalData;
      localStorage.setItem('rows', JSON.stringify(rows));
    setRows(rows);

    }

    setEditingRow(null);
    console.log(modalData);
    handleClose1(true);
    console.log(rows);
  };


  const [roleTest, setRoleTest] = useState('');

  useEffect(() => {
    const value = localStorage.getItem('role');
    if (value) {
      setRoleTest(value);
    }
  }, []);


  // Edit Item
  const [open_, setOpen_] = React.useState(false);
  const handleOpen_ = () => setOpen_(true);
  const handleClose_ = () => setOpen_(false);

  

  console.log(nameState);


  return (
    <div
    style={{
      width: '100%',
      paddingBottom:"30px"
    }}>
          
    <div style={{
      marginLeft:"30px"
    }}>
      {
        appAuthors.map((app, index) => (
          <div key={app._id}>
             <Button sx={{
                display:"flex",
                marginTop:"30px",
                marginBottom:"20px",
             }}>
             <PostAddIcon
             sx={{
              marginTop:"-2px",
              marginRight:"5px"
             }}></PostAddIcon>
             <Typography>
             {app.name}
             </Typography>
              </Button>
             
             {items.filter((row)=> row?.inside === app._id).map((item)=>(
                <div key={item.id}
                style={{
                  display:"flex"
                }}>
                  <tr
                  style={{
                    border:"1px solid #ccc",
                    width:"100%",
                    marginRight:"100px",
                    padding:"5px",
                    marginTop:"5px",
                    listStyle:"none",
                    display:"flex"
                  }}> {Object.values(item).map((value, index) => (
                <td 
                style={{
                padding:"5px 20px",
                // width:"90%",
                width:"60%",
              }}
                key={index}>{value}</td>
                
              ))}
                <div
                style={{
                  display:"flex",
                  width:"30%",
                  justifyContent:"flex-end"
                }}>
                  <div
             className="actionHover"
             
             onClick={() => handleEditClick(item)}
             style={{
              paddingRight:"10px",
            
             }}>
                <CreateIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
                <span style={{
                  color:"#0099CC"
                }}>Edit</span>
              
              </div>
            
              <div
                className="actionHover"
              onClick={() => handleDuplicateRow(item)}
               style={{
              paddingRight:"10px"
              
             }}>
                <ContentCopyIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
                <span style={{
                  color:"#0099CC"
                }}>Duplicate</span>
              </div>
              
              <div
                className="actionHover"
               style={{
              paddingRight:"10px"
             }}
             onClick={() => handleDeleteRow(item._id)}>
              
                <HighlightOffIcon style={{ marginRight: 8, marginBottom: -5, color:"red"}} />
                <span style={{
                  color:"red"
                }}>Delete</span>
              </div>

                </div>
              </tr>
                </div>
                  
             ))
             }
          </div>
        ))
      }

      <Modal
              open={open_}
              onClose={handleClose_}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style_}>
              <Typography variant='h5'>Edit form</Typography>
              <hr></hr>
              {
                nameState && (
                  
                  <Box
                  sx={{
                    margin:"40px 0 30px 0"
                  }}>
                    <TextField 
                    sx={{
                      width:"100%"
                    }}id="standard-basic" 
                    onChange={handleInputEdit}
                    label="Input" 
                    value={nameState}  />
                  </Box>

                )
              }
                {
                  textState &&(
                    <Box
                  sx={{
                    margin:"30px 0"
                  }}>
                    <TextField 
                    sx={{
                      width:"100%"
                    }}id="standard-basic" 
                    onChange={handleTextEdit}
                    label="Textarea" 
                    value={textState}  />
                  </Box>
                  )
                }
               {
                labelState && (
                  <Box
                  sx={{
                    margin:"20px 0"
                  }}>
                    <TextField 
                    sx={{
                      width:"100%"
                    }}id="standard-basic" 
                    onChange={handleLabelEdit} 
                    label="Label" 
                    value={labelState}  />
                  </Box>
                )
               }

                <Box
                sx={{
                  display:"flex",
                  justifyContent:"flex-end",
                  width:"100%",
                  // backgroundColor:"#ccc"
                }}>
                    <Button 
                    sx={{
                      padding:"10px 20px"
                    }}
                    onClick={handleSaveItemEdit} variant="contained">Save</Button>
                </Box>
              
              </Box>
            </Modal>
    </div>
    </div>
  );
  
}
