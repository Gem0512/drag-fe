import React, { useState, useEffect, useLayoutEffect } from "react";
import PrimarySearchAppBar from "../header/index"
import "../css/home.css";
import Name from "../app-name/index"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import FormPage from "../../pages/FormPage"
import ViewsPage from "../../pages/ViewsPage"
// import Test from "./Test"
// import Test from "../../test/Test"
import Testt from "./Test"
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDrop } from "react-dnd";
import Checkbox from '@mui/material/Checkbox';
import { OutlinedInput } from '@mui/material';
import UserPage from "../../pages/UserPage"
import AdminPage from "../../pages/AdminPage"
import axios from 'axios';
import Resize from "../resize/Resize"
import Cookies from 'js-cookie';


async function fetchData(itemId) {
  // try {
  //   const response = await fetch(`http://localhost:4000/api/getItemById/${itemId}`);
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  //   return null;
  // }
  
}


const ElementList = [
  { id: 1, type: "input", text: "Input" },
  { id: 2, type: "button", text: "Button" },
  { id: 3, type: "label", text: "Label" },
  { id: 4, type: "textarea", text: "Text area" },
  { id: 5, type: "checkbox", text: "Check box" },
  { id: 6, type: "number", text: "Number" },
  { id: 7, type: "calculated", text: "Calculated" },
  { id: 8, type: "radio", text: "Radio button" },
  { id: 9, type: "attachfile", text: "Attach file" },
  { id: 10, type: "link", text: "Link" },
  { id: 11, type: "table", text: "Table" },
  { id: 12, type: "date", text: "Date" },
  { id: 13, type: "time", text: "Time" },
  { id: 14, type: "drop", text: "Drop down" },

];


function CustomTabPanel(props) {
  const { children, value, index,handleChange, ...other } = props;
  const handleButtonClick = (newValue) => {
    handleChange(null, newValue);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
           {/* {index === 3 && (
            <div> */}
              {/* <button onClick={() => handleButtonClick(0)}>Go to Page 1</button>
              <button onClick={() => handleButtonClick(2)}>Go to Page 3</button> */}
              {/* {index === 1 && <AdminPage handleChange={handleChange} />} */}
            {/* </div>
          )} */}
        </Box>
      )}
    </div>
  );
}



CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function Home(
  {role}
) {



  const [clickedOnce, setClickedOnce] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!clickedOnce ) {
      navigate('/records'); // Chuyển đến trang mới khi button được click lần đầu
      setClickedOnce(true);
      setHasNavigated(true);
    } else {
      if (hasNavigated){
        setOpenActive(true);
      }
    }
  };

  
  const [openActive, setOpenActive] = React.useState(false);
  const handleOpenActive = () => setOpenActive(true);
  const handleCloseActive = () => setOpenActive(false);

  const [selectedItem, setSelectedItem] = useState(null);


 const [value, setValue] = React.useState(() => {
    const storedValue = localStorage.getItem('currentTab');
    return storedValue ? parseInt(storedValue, 10) : 0;
    
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // window.location.reload();
    handleData();
    fetchItems();
  };

  const [currentTime, setCurrentTime] = useState('');

  React.useEffect(() => {
    localStorage.setItem('currentTab', value);
    
  }, [value]);

  
  // react-dnd

  const [board, setBoard] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
      accept: ["input", 
              "label",
              "checkbox",
              "textarea",
              "number",
              "calculated",
              "radio",
              "attachfile",
              "link",
              "table",
              "date",
              "time",
              "drop"
            ], // Chấp nhận các loại type mới
      drop: (item, monitor) => addElementToBoard(item, monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
      
      
    }));
    if( board.length>0) localStorage.setItem("board", JSON.stringify(board));

      const [oldData, setOldData]= useState();
   
     const storedObject= [...(JSON.parse(localStorage.getItem('board')|| '[]'))];
  let count=1;
    const addElementToBoard = (item, monitor) => {
      
      const elementList = ElementList.filter((element) => item.id === element.id);
      const newItem = {
        ...elementList[0],
        number: count++,
        position: monitor.getClientOffset(),
      };
      
     
       setBoard((board) => [...board, newItem]);
     
     
      setDroppedItems((prevItems) => [...prevItems, item.id]);
      handleLoadData();
      
    };
   

    

    const [droppedItems, setDroppedItems] = useState([]);
   
    const jsonState = JSON.stringify(droppedItems);
   
// Lưu mảng state vào localStorage
    localStorage.setItem("dropItem", jsonState);
    
   
   
    const handleDrop = (id, rowIndex, colIndex) => {
 
    };





    const showToastMessage = () => {
        toast.success('Form saved !', {
            position: toast.POSITION.TOP_RIGHT
        },
        {
            toastClassName: 'my-toast',
        }
        );
    };
    
    const handleLoadData = async() =>{
      try {
        const response = await fetch(`http://localhost:4000/api/v1/forms/items/${idItemsDrop}`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            items: mergedItems,
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
    
    }



    const handleClick1 = async() => {
      // setCheck(false);
      setBoard([]);
   
  
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
        showToastMessage();
        
        // handleAddItemDropItemDrop();

        handleLoadData();
        handleData();
        fetchItems();
      
        // window.location.reload();
    //   localStorage.setItem("inputValue", "");
    // localStorage.setItem("inputValueFromTextArea", "");
    //  localStorage.setItem("label", "");
    // localStorage.setItem("inputValueFromCheckBox", "");
        
      };

      // CheckBox
      const [isChecked, setIsChecked] = useState(false);
      
      const handleCheckboxChange = (event) => {
       
        setIsChecked(event.target.checked);
       
        if (event.target.checked) {
          
          const paragraphElement = event.target.parentNode.querySelector('p');
          if (paragraphElement) {
            const paragraphValue = paragraphElement.textContent;
            setInputValueView(paragraphValue);
          }
        } 
      };

      localStorage.setItem('isChecked', isChecked);
   
           
  
      const [checkboxes2, setCheckboxes2] = useState([]);
      const [inputValues2, setInputValues2] = useState([]);

      const handleCheckboxChangee2 = (index) => {
          setCheckboxes2((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
          return updatedCheckboxes;
          });
      };

      const handleDeleteButton2 = (index) => {
          setCheckboxes2((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes.splice(index, 1);
          return updatedCheckboxes;
          });
          setInputValues2((prevInputValues) => {
          const updatedInputValues = [...prevInputValues];
          updatedInputValues.splice(index, 1);
          return updatedInputValues;
          });
      };

      const addButton4 = () => {
          setCheckboxes2((prevCheckboxes) => [...prevCheckboxes, { checked: false }]);
          setInputValues2((prevInputValues) => [...prevInputValues, '']);
      };

      const handleInputChange12 = (index, value) => {
          setInputValues2((prevInputValues) => {
          const updatedInputValues = [...prevInputValues];
          updatedInputValues[index] = value;
          return updatedInputValues;
          });
      };

      const renderButton32 = () => {
          return checkboxes2.map((checkbox, index) => (
          <div
              style={{
              display: 'flex',
              marginRight: '5px',
              }}
              key={index}
          >
              <Checkbox
              sx={{
                  marginTop: '-8px',
              }}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChangee2(index)}
              />
              <OutlinedInput
              style={{
                  height: '30px',
                  marginBottom: '10px',
              }}
              value={inputValues2[index] || ''}
              onChange={(e) => handleInputChange12(index, e.target.value)}
              />
              <button
              style={{
                  height: '25px',
                  margin: '2px 5px 0px 5px',
                  
              }}
              
              onClick={addButton4}
              >
              +
              </button>

              <button
              style={{
                  height: '25px',
                  marginTop: '2px',
                  width: '23px',
              }}
              onClick={() => handleDeleteButton2(index)}
              >
              -
              </button>
          </div>
          ));
      };

      const renderButton2 = () => {
          return checkboxes2.map((checkbox, index) => (
          <div
              style={{
              display: 'flex',
              marginRight: '5px',
              }}
              key={index}
          >
              <Checkbox
              sx={{
                  marginRight: '-8px',
              }}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChangee2(index)}
              />
              <p>{inputValues2[index] || ''} test</p>
          </div>
          ));
      };

      // Checkbox_next

      const [checkboxes, setCheckboxes] = useState([]);
      const [inputValues, setInputValues] = useState([]);

      const handleCheckboxChangee = (index) => {
          setCheckboxes((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
          return updatedCheckboxes;
          });
      };

      const handleDeleteButton = (index) => {
          setCheckboxes((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes.splice(index, 1);
          return updatedCheckboxes;
          });
          setInputValues((prevInputValues) => {
          const updatedInputValues = [...prevInputValues];
          updatedInputValues.splice(index, 1);
          return updatedInputValues;
          });
      };

      const addButton3 = () => {
          setCheckboxes((prevCheckboxes) => [...prevCheckboxes, { checked: false }]);
          setInputValues((prevInputValues) => [...prevInputValues, '']);
      };

      const handleInputChange1 = (index, value) => {
          setInputValues((prevInputValues) => {
          const updatedInputValues = [...prevInputValues];
          updatedInputValues[index] = value;
          return updatedInputValues;
          });
      };

      const renderButton3 = () => {
          return checkboxes.map((checkbox, index) => (
          <div
              style={{
              display: 'flex',
              marginRight: '5px',
              }}
              key={index}
          >
              <Checkbox
              sx={{
                  marginTop: '-8px',
              }}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChangee(index)}
              />
              <OutlinedInput
              style={{
                  height: '30px',
                  marginBottom: '10px',
              }}
              value={inputValues[index] || ''}
              onChange={(e) => handleInputChange1(index, e.target.value)}
              />
              <button
              style={{
                  height: '25px',
                  margin: '2px 5px 0px 5px',
                  
              }}
              
              onClick={addButton3}
              >
              +
              </button>

              <button
              style={{
                  height: '25px',
                  marginTop: '2px',
                  width: '23px',
              }}
              onClick={() => handleDeleteButton(index)}
              >
              -
              </button>
          </div>
          ));
      };

      const renderButton = () => {
          return checkboxes.map((checkbox, index) => (
          <div
              style={{
              display: 'flex',
              marginRight: '5px',
              }}
              key={index}
          >
              <Checkbox
              sx={{
                  marginRight: '-8px',
              }}
              checked={checkbox.checked}
              onChange={() => handleCheckboxChange(index)}
              />
              <p>{inputValues[index] || ''} </p>
          </div>
          ));
      };


      const [inputValueView, setInputValueView] = useState('');
    


      // Value title
      const [inputValueSave, setInputValueSave] = useState('Input');
      const [textAreaValueSave, setTextAreaValueSave] = useState('');
    
   
      // Size input
      const handleSaveInputValues = (value1, value2) => {
        localStorage.setItem('inputValue1', value1);
        localStorage.setItem('inputValue2', value2);
      };

      // Check Label
      const [checkLabel, setCheckLabel]= useState();


      // Delete item in View
      const [deleteItem,setDeleteItem]= useState("delete");
      const [deleteItemText,setDeleteItemText]= useState("delete");
      const [deleteItemLabel,setDeleteItemLabel]= useState("delete");

      // CheckBox value
      const [valueSample1, setValueSample1] = useState("sample1");
      const [sample1, setSample1] = useState(valueSample1);
    
    
      
      const [valueSample2, setValueSample2] = useState("sample2");
      const [sample2, setSample2] = useState(valueSample2);

      const [apps, setApps]= useState([]);
      const access_token = Cookies.get('access_token');
     
      const [idUser, setIdUser]= useState();

      useEffect(() => {
        fetchItems1();
        
      }, []);


      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${access_token}`);
  
      
      const fetchItems1 = async ()=> {
        // try{
        //   const response = await fetch('http://localhost:4000/api/v1/forms/getForm', {
        //     method: 'GET',
        //     headers: myHeaders,
        //     })
        //     const responseData = await response.json();
        //     setTest(responseData);
        //  }
        //  catch (error){
        //   console.error('Lỗi khi lấy danh sách người dùng:', error);
        //  }
      }
      
      const [forms, setForms]= useState();
      const [formsNoUser, setFormsNoUser]= useState();
      const fetchItems = async ()=> {
        try{
          // eslint-disable-next-line no-template-curly-in-string
        
          const response = await fetch(`http://localhost:4000/api/v1/forms/byUser/${idUser}`, {
            method: 'GET',
            headers: myHeaders,
            })
            const responseData = await response.json();
            
            setForms(responseData.data);
        
         }
         catch (error){
          console.error('Lỗi khi lấy danh sách form ủy quyền:', error);
         }
      }

      const fetchItems2 = async ()=> {
        try{
     
          const response = await fetch(`http://localhost:4000/api/v1/forms/getItemsByUserId/${idUser}`, {
            method: 'GET',
            headers: myHeaders,
            })
            const responseData = await response.json();
            
            setFormsNoUser(responseData.data);
         
         }
         catch (error){
          console.error('Lỗi khi lấy danh sách form ủy quyền:', error);
         }
      }
      useEffect(() => {
        setIdUser(JSON.parse(Cookies.get('user'))._id)  
        // fetchItems(); 
        fetchItems2();
      }, [idUser]);

     

      



      const [items, setItems]= useState([]);


      const [idItemsDrop, setIdItemsDrop]=useState(localStorage.getItem('idItemsDrop'));
   


      const handleAddItemDropItemDrop = () => {  
      };

      const [idItemUser, setIdItemUser]= useState();

      const [appDelete, setAppDelete]= useState();

  

      const handleDeleteApp = (itemId) => {

        try{
          fetch(`http://localhost:4000/api/v1/forms/delete/${itemId}`, {
            method: 'DELETE',
            headers: myHeaders,
            })
         }
         catch (error){
          console.log("Đã có lỗi khi delete form:", error)
         }
    
        fetchItems();
   
      };

    const storedUser = localStorage.getItem('email');
  const appAuthors = apps.filter((app) => app?.author?.includes(storedUser)?? false);
   
    // Delete State

    const [deleteState, setDeleteState]= useState('');
    const [clickedIndexes, setClickedIndexes] = useState([]);


    const [nameApp, setNameApp]= useState('');


    const [item, setItem] = useState(null);

    useEffect(() => {
      fetchData(idItemsDrop)
        .then(data => setItem(data));
        
    }, [idItemsDrop]);



    const [state1, setState1]= useState(true);

  
    const idItemSave =item?.items;
    if(idItemSave)localStorage.setItem("listItemOld", JSON.stringify(idItemSave||[]));
    const [idRename, setIdRename]= useState();
   

    const idOleData= (localStorage.getItem('oldData'));  
    const handleData = async()=>{
      try{
        const response = await fetch(`http://localhost:4000/api/v1/forms/getFormById/${idOleData}`, {
          method: 'GET',
          headers: myHeaders,
          })
          const responseData = await response.json();
         
        
          setOldData(responseData.data);
          
       }
       catch (error){
        console.error('Lỗi khi lấy danh sách form ủy quyền:', error);
       }
    }
    useEffect(()=> {  
      // window.location.reload();
      }, [idItemsDrop])

      useEffect(()=>{
        handleData();
      },[idItemsDrop])
   

  //  const mergedItems=[...oldData?.items,...board];
// const [check, setCheck]= useState(true);

  let itemsToMerge = [];

  if (Array.isArray(oldData?.items)) {
    itemsToMerge = oldData.items;
   
  } else if (oldData?.items) {
    console.error("oldData.items is not an array.");
  }

  if (Array.isArray(board) ) {
   
      itemsToMerge = [...itemsToMerge, ...board];
    
    // setCheck(true);
   
  } else {
    console.error("board is not an array.");
  }



  // console.log(check);


  // Sử dụng mảng đã kiểm tra để tạo mergedItems
  let mergedItems = itemsToMerge;


   const [indexDelete, setIndexDelete] = useState(localStorage.getItem("indexDelete"))

  const handleDeleteItem =() =>{
    try{
      fetch(`http://localhost:4000/api/v1/forms/${idItemsDrop}/items/${indexDelete}`, {
        method: 'DELETE',
        headers: myHeaders,
        })
     }
     catch (error){
      console.log("Đã có lỗi khi delete form:", error)
     }
     console.log(idItemsDrop, indexDelete);
     console.log(".>>>>")
     handleData();
     fetchItems();
  }
  useEffect(() =>{
    if(idItemsDrop){
      localStorage.setItem("oldData", idItemsDrop)
    }
  })
  useLayoutEffect(()=>{
    handleData();
    fetchItems();
  },[idItemsDrop])

  
  return (

    <div className="home-all">
     
      <div>
        <PrimarySearchAppBar></PrimarySearchAppBar>
      </div>
      <div>
        <Name
       
          currentTime={currentTime}
          handleClick={handleClick}
        openActive={openActive}
        handleCloseActive={handleCloseActive}
        nameApp={nameApp}
        ></Name>
      </div>

      <Box sx={{ width: '100%' }}>
      <Box >
        <Tabs
          sx={{
            // backgroundColor:"white",
            paddingLeft:"24px",          
            
          }}
         value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{
          
          border: "1px solid #ccc",
          padding:"10px 50px",
          backgroundColor: value === 'one' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        }}
        onClick={()=>{navigate("/home/edit");}}
         label="Form" {...a11yProps(0)} />
         {/* <Link to="/home/view">  */}
         <Tab sx={{
          border: "1px solid #ccc",
          padding:"10px 50px",
          backgroundColor: value === 'two' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        }}
        onClick={()=>{navigate('/home/view');}}
        label="Views data" {...a11yProps(1)} />
        {/* </Link> */}
          <Tab sx={{
          padding:"10px 50px",
          border: "1px solid #ccc",
          backgroundColor: value === 'three' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        }}
        onClick={()=>{navigate("/home/graphs");}}
         label="Graphs" {...a11yProps(2)} />
        
        <Tab sx={{
          padding:"10px 50px",
          border: "1px solid #ccc",
          backgroundColor: value === 'three' ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        }}
         onClick={()=> {
          
          handleData();
      fetchItems();
        // window.location.reload();
        navigate("/home/app");
       }}
         label="App" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}  handleChange={handleChange}>
          <FormPage
            currentTime={currentTime} 
            setCurrentTime={setCurrentTime}
            ElementList={ElementList}
            handleClick1={handleClick1}
            drop={drop}
            board={board}
            handleDrop={handleDrop}
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
            addButton3={addButton3}
            renderButton3={renderButton3}
            addButton4={addButton4}
            renderButton32={renderButton32}
            renderButton={renderButton}
            renderButton2={renderButton2}
            setInputValueView={setInputValueView}
            setInputValueSave={setInputValueSave}
            setTextAreaValueSave={setTextAreaValueSave}
            textAreaValueSave={textAreaValueSave}
            inputValueSave={inputValueSave}
            onSave={handleSaveInputValues}
            setCheckLabel={setCheckLabel}
            setDeleteItem={setDeleteItem}
            setDeleteItemText={setDeleteItemText}
            setDeleteItemLabel={setDeleteItemLabel}
            valueSample1={valueSample1}
            valueSample2={valueSample2}
            setSample1={setSample1}
            setSample2={setSample2}
            setValueSample1={setValueSample1}
            setValueSample2={setValueSample2}
            handleAddItemDropItemDrop={handleAddItemDropItemDrop}
            fetchItems1={fetchItems1}
            deleteItem={deleteItem}
            setDeleteState={setDeleteState}
            deleteState={deleteState}
            clickedIndexes={clickedIndexes}
            idItemsDrop={idItemsDrop}
            setBoard={setBoard}
            storedObject={storedObject}
            selectedItem={selectedItem}
            item={item}
            // itemsWithId={itemsWithId}
            mergedItems={mergedItems}
            setIndexDelete={setIndexDelete}
            handleDeleteItem={handleDeleteItem}
            oldData={oldData}
            handleData={handleData}
            fetchItems={fetchItems}
          ></FormPage>
      </CustomTabPanel>
      
      <CustomTabPanel value={value} index={1}  handleChange={handleChange}>
      <div className="home">
      
        <ViewsPage
        droppedItems={droppedItems}
        ElementList={ElementList}
        renderButton={renderButton}
        renderButton2={renderButton2}
        inputValueView={inputValueView}
        inputValueSave={inputValueSave}
        textAreaValueSave={textAreaValueSave}
        checkLabel={checkLabel}
        deleteItem={deleteItem}
        deleteItemText={deleteItemText}
        deleteItemLabel={deleteItemLabel}
        inputValues={inputValues}
        checkboxes={checkboxes}
        sample1={sample1}
        sample2={sample2}
        inputValues2={inputValues2}
        items={items}
        fetchItems1={fetchItems1}
        appAuthors={appAuthors}
        
        ></ViewsPage>
      </div>
      </CustomTabPanel>
      <CustomTabPanel
       handleChange={handleChange} 
      // className="home"
      style={{
        margin:"0 25px",
        backgroundColor: "white",
        boxShadow: "5px 5px 6px rgba(0, 0, 0, 0.4)",
        display:"flex",
      }}
      value={value} index={2}>
        {/* <Test></Test> */}
       {/* <Testt></Testt> */}
       {/* <Resize></Resize> */}
       {
        !deleteItem &&(
          <Resize
         deleteItem={deleteItem}
         >
       </Resize>
        )
       }
       
      
      </CustomTabPanel>
      <CustomTabPanel 
       handleChange={handleChange}
      
      
      style={{
        margin:"0 25px",
        backgroundColor: "white",
        boxShadow: "5px 5px 6px rgba(0, 0, 0, 0.4)",
        display:"flex",
        padding:"20px 0"
      }}
      value={value} 
      index={3}>

      {/* {
        role==='admin'? ( */}
          <AdminPage
          forms={forms}
          formsNoUser={formsNoUser}
          apps={apps}
          idItemsDrop={idItemsDrop}
          setIdItemsDrop={setIdItemsDrop}
          handleChangePage={handleChange}
          inputValueSave={inputValueSave}
          textAreaValueSave={textAreaValueSave}
          fetchItems1={fetchItems1}
          setAppDelete={setAppDelete}
          handleDeleteApp={handleDeleteApp}
          // listAppAuthor={listAppAuthor}
          // setListAppAuthor={setListAppAuthor}
          storedUser={storedUser}
          appAuthors={appAuthors}
          // handleUpdateApp={handleUpdateApp}
          isChecked={isChecked}
          setNameApp={setNameApp}
          renderButton={renderButton}
          renderButton2={renderButton2}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          fetchItems={fetchItems}
          idRename= {idRename}
          setIdRename={setIdRename}
          setOldData={setOldData}
          mergedItems={mergedItems}
          handleData={handleData}
          setBoard={setBoard}
          nameApp={nameApp}
          setState1={setState1}
          sx={{
            width:"100%",
            
          }}></AdminPage>
        {/* ):
        ( */}
          <UserPage
          formsNoUser={formsNoUser}
        inputValueSave={inputValueSave}
        textAreaValueSave={textAreaValueSave}
        apps={apps}
        idItemsDrop={idItemsDrop}
        setIdItemUser={setIdItemUser}
        idItemUser={idItemUser}
        ></UserPage>
        {/* )
      } */}
        
      </CustomTabPanel>
      </Box>
    {/* </Box> */}

      
    </div>
    
  );
}
