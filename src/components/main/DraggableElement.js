import React, { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import "../css/DraggableElement.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { OutlinedInput } from '@mui/material';
import AbcIcon from '@mui/icons-material/Abc';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Index from "../text-edit/index"
import TextArea from "../modal/TextArea";
import CheckBox from "../modal/CheckBox"
library.add(fas);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DraggableElement({ 
  id, 
  type, 
  text, 
  position, 
  handleDrop, 
  isChecked,
  handleCheckboxChange,
  addButton3,
  renderButton3,
  addButton4,
  renderButton32,
  renderButton,
  renderButton2,
  setInputValueView,
  setInputValueSave,
  setTextAreaValueSave,
  textAreaValueSave,
  inputValueSave,
  onSave,
  setCheckLabel,
  setDeleteItem,
  setDeleteItemText,
  setDeleteItemLabel,
  valueSample1,
  valueSample2,
  setSample1,
  setSample2,
  setValueSample1,
  setValueSample2,
  deleteItem,
  setDeleteState,
  handleChangeState
  }) {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isHovered, setIsHovered] = useState(false);
  const [size, setSize] = useState({ width: 250, height: 35 });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
 const handleState =()=>{
  handleChangeState(id);
   console.log(id);
 }


  const handleDelete = (event) => {
    // const element = document.querySelector(".item-drag");
    // element.parentNode.removeChild(element);
    const button = event.target;
    const parentElement = button.closest('.item-drag'); // Sử dụng closest để tìm thẻ cha có class là 'test'
    if (parentElement) {
      parentElement.remove();
    }
    setDeleteItem("");
    setDeleteItemText("");
    setDeleteItemLabel("");
    
   

  };

const handleEither=(event) => {
  handleDelete(event);
  handleState();
}
  // console.log()
  

  const [open, setOpen] = React.useState(false);
  const [type1, setType] = React.useState('');


   const handleOpen = (modalType) => {
    setType(modalType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setType('');
    setIsHovered(false);
  };
  const dropRef = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: type,
    drop: (item, monitor) => {
      const dropOffset = dropRef.current.getBoundingClientRect();
      const dragOffset = monitor.getSourceClientOffset();
      const dropX = dragOffset.x - dropOffset.x;
      const dropY = dragOffset.y - dropOffset.y;
      const colWidth = 100; // Kích thước của mỗi ô cột
      const rowHeight = 50; // Kích thước của mỗi ô hàng
      const colIndex = Math.floor(dropX / colWidth);
      const rowIndex = Math.floor(dropY / rowHeight);

      handleDrop(id, rowIndex, colIndex);
    },
  }));

  drag(drop(dropRef));



  const [text1, setText] = useState('Input');
  const [buttonClicked, setButtonClicked] = useState(false);




  const handleNameChange = (event) => {
    // setText(event.target.value);
    setInputValueSave(event.target.value);
  };


  const [editorText, setEditorText] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleEditorChange = (text) => {
    setEditorText(text);
    localStorage.setItem('label', text);
  };



  const [textValue, setTextValue] = useState(text);
  const [textValueDefault, setTextValueDefault] = useState();


  const [inputValueFromTextArea, setInputValueFromTextArea] = useState('');
  const [valueDefault, setValueFromTextArea] = useState('');

  const [hideFieldName, setHideFieldName] = useState(false);
  const [requiredName, setRequiredName] = useState(false);


  const [textValueCheckBox, setTextValueCheckBox] = useState(text);
  const [inputValueFromCheckBox, setInputValueFromCheckBox] = useState('');


  // const [hideFieldNameCheckBox, setHideFieldNameCheckBox] = useState(false);



  const [formValue, setFormValue] = useState(false);
  const [formValue1, setFormValue1] = useState(false);

  const [textArea, setTextArea]=  useState();

  const handleFormChange = (event) => {
    setFormValue(event.target.checked);
    localStorage.setItem('textarea', textAreaValueSave);
  };
  const handleFormChange1 = (event) => {
    setFormValue1(event.target.checked);
  };


  const handleButtonClick = () => {
    setTextValueCheckBox(inputValueFromCheckBox || text)
    setSample1(valueSample1 || "sample1")
    setSample2(valueSample2 || "sample2")
    setTextValue(inputValueFromTextArea || text);
    setButtonClicked(true);
    handleClose();
    setIsHovered(false);
    setDisplayText(editorText);
    setTextValueDefault(textValueDefault);
    // setText(inputValueSave);
    // setInputValueSave(text1 || "Input");
    // setTextAreaValueSave(inputValueFromTextArea || "Text Area" );
    onSave(inputValue1, inputValue2);
   console.log(text1);
 
      
  };

  
  const [text2, setText2] = useState('');


  const handleNameChange2 = (event) => {
  
    setText2(event.target.value);
  };

  // const handleButtonClick2 = () => {
  //   setButtonClicked(true);
  //   handleClose();
  //   setIsHovered(false);
  // };


  const [isChecked1, setIsChecked1] = useState(false);

  const handleCheckboxChange1 = (event) => {
    const inputFinal = localStorage.getItem('inputValue');
    if (!isChecked1) {
      localStorage.setItem("inputValue", `${inputFinal}*`);
    }
    console.log(localStorage.getItem('inputValue'))
    setIsChecked1(event.target.checked);
  };

  const [isPicked, setIsPicked] = useState(false); 
  const [isPicked1, setIsPicked1] = useState(false); 


  const handleCheckboxPicked = (event) => {
    setIsPicked(event.target.checked); // Cập nhật trạng thái khi checkbox thay đổi
  };
  const handleCheckboxPicked1 = (event) => {
    setIsPicked1(event.target.checked); // Cập nhật trạng thái khi checkbox thay đổi
  };

  const [fieldInput, setFieldInput]=useState("");

  const handleFieldInput =(event) =>{
      setFieldInput(event.target.value);
  }

  const [field, setField]=useState("");

  const handleField =(event) =>{
      setField(event.target.value);
  }

  const [fieldCheckBox, setFieldCheckBox]=useState("");

  const handleFieldCheckBox =(event) =>{
    setFieldCheckBox(event.target.value);
  }
  // Size input
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const [labelValue, setValueLabel] = useState('');

  useEffect(() => {
    const value = localStorage.getItem('label');
    if (value) {
      setValueLabel(value);
      setEditorText(value);
    }
  }, []);

  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    const value = localStorage.getItem('textarea');
    if (value) {
      setTextAreaValue(value);
      setTextAreaValueSave(value);
    }
  }, []);

  // console.log(text1, inputValueSave);
  localStorage.setItem('inputValue', inputValueSave);
  const inputFinal =localStorage.getItem('inputValue');
console.log(inputFinal);

  return (
    <div className="item-drag" ref={dropRef}
     style={{
          // border:"1px solid #ccc",
          margin:"5px",
        }}>
      <div 
      style={{
        display:"flex",
        height:"50px",
        width:"100%"
      }}>


      {type==="input" &&
      <div
      style={{
        width:"55%"
      }}>
      {
        isChecked &&isChecked1 ?(
          <div style={{
          width:"55%"
        }}>
          <p></p>
        </div>
        ) : isChecked ?(
          <div style={{
          width:"55%"
        }}>
          <p></p>
        </div>
        ) : isChecked1 ? (
          <div
      style={{
        // marginLeft:"30px",
        width:"55%",
        // paddingRight:"30%",
      }}>      
        <p>{buttonClicked && text1 ? (
          <div>
            {inputFinal ||"Input"}*
          </div>
        ) : 
        (
          <div>
            {inputFinal || "Input"}*
          </div>
        )
        }</p>
      </div>
        ) :
        (
          <div
      style={{
        // marginLeft:"30px",
        width:"55%",
        // paddingRight:"30%",
      }}>      
        <p>
        {buttonClicked && text1 ? (
          <div>
            {inputFinal || "Input"}
          </div>
        ) : 
        (
          <div>
            {inputFinal||"Input"}
          </div>
        )
        }
        </p>
      </div>
        )
      }
      </div>
      }
      {
        type==="label" && 
          <div
          style={{
         
          width:"55%",

        }}>      
          <p>{text}</p>
        </div>
      }


      {type === "textarea" && 
          <div  style={{
          // marginLeft:"30px",
          width:"55%",
          // paddingRight:"30%",
          height:"40px"
        }}>

              {
            hideFieldName &&requiredName ?(
              <div style={{
              width:"55%"
            }}>
              <p></p>
            </div>
            ) : hideFieldName ?(
              <div style={{
              width:"55%"
            }}>
              <p></p>
            </div>
            ) : requiredName ? (
              <div
          style={{
            width:"60%",
          }}>      
            {/* <p>{buttonClicked ? textAreaValueSave : text}*</p> */}
            <p>{textAreaValueSave  || "Text Area"}</p>
          </div>
            ) :
            (
              <div
          style={{
            width:"60%",
          }}>      
            {/* <p>{buttonClicked ? textAreaValueSave : text}</p> */}
            <p>{textAreaValueSave || "Text Area"}</p>
          </div>
        )
      }
          </div>
        }


        {
          type==="checkbox" && (
            <div  style={{
              width:"55%",
              height:"30px"
            }}>
              {
            hideFieldName &&requiredName ?(
              <div style={{
              width:"55%"
            }}>
              <p></p>
            </div>
            ) : hideFieldName ?(
              <div style={{
              width:"55%"
            }}>
              <p></p>
            </div>
            ) : requiredName ? (
              <div
          style={{
            width:"65%",
          }}>      
            <p>{buttonClicked ? textValueCheckBox : text}*</p>
          </div>
            ) :
            (
              <div
          style={{
            width:"65%",
          }}>      
            <p>{buttonClicked ? textValueCheckBox : text}</p>
          </div>
        )
      }

            </div>
          )
        }
        {
          type==="number" && (
            <div style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }
        {
          type==="radio" &&(
            <div
            style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }
        {
          type==="attachfile" &&(
            <div
            style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }
        {
          type==="link" &&(
            <div
            style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }
        {
          type==="table" &&(
            <div
            style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }
        {
          type==="date" &&(
            <div
            style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }
        {
          type==="time" &&(
            <div
            style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }
        {
          type==="calculated" &&(
            <div
            style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }
        {
          type==="drop" &&(
            <div
            style={{
              width:"55%"
            }}>
              <p>{text}</p>
            </div>
          )
        }




      <div
        style={{
          width:"50%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop:"8px"
        }}
        className="image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
       
        <div
        style={{
          // width:"50%",
          // display:"flex",
          // justifyContent:"flex-end",
        }}>
          <img
          className="more-option"
          style={{
            height: "25px",
            display: "flex",
            float: "left",
            marginRight: "20px",
           
          }}
          src="https://icon-library.com/images/more-icon/more-icon-1.jpg"
          alt=""
        ></img>
        </div>
        {isHovered && (
          <div className="hover-options">
        
            <Button onClick={() => handleOpen('input')}
            sx={{
              textTransform: 'none' ,
              fontSize:"13px",
              padding:"5px 20px 5px 5px",
              // marginBottom:"-10px"
            }}>
            <img
                style={{
                  height: "15px",
                  // marginBottom: "-2px",
                
                }}
                src="https://simpleicon.com/wp-content/uploads/setting.png"
                alt=""
              ></img>
              Settings
            </Button>

      
            <button className="option" onClick={handleDelete}>
            <img
                style={{
                  height: "15px",
                  marginBottom: "-2px",
                }}
                src="https://icons.iconarchive.com/icons/ionic/ionicons/512/duplicate-outline-icon.png"
                alt=""
              ></img>
              Duplicate
            </button>

            <button className="option" 
            onClick={handleEither}
            
            >
              <img
                style={{
                  height: "15px",
                  marginBottom: "-2px",
                 
                }}
                src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
                alt=""
              ></img>
              Delete
            </button>
          </div>
        )}
      </div>

      <Modal
              sx={{
                
                // margin:"-10px"
              }}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                 <Typography id="modal-modal-description" sx={{mt:2}}>
                 <div
                 
                 style={{
                  display:"flex"
                 }}>
                  
                   <p
                   style={{
                    marginTop:"-5px",
                    paddingLeft: "5px",
                    fontSize:"24px",
                    width: "40%"
                   }}>{text} Settings</p>
                    <div
                  
                  style={{
                   width:"60%",
                   marginTop:"-20px",
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
                  fontSize:"14px",
                  padding:"10px",
                  backgroundColor:"#ccc",
                  marginBottom:"20px"
                 }}>
                  Help?
                 </div>

                  {type==="input" &&
                   <div>
                   
                 
                  <div
                  style={{
                    marginTop:"10px",
                  
                  }}>
                    <label 
                    style={{
                      display:"block",
                      paddingBottom:"3px",
                      marginTop:"10px",
                      fontSize:"18px"
                    }}name="name">Name*</label>
                    <input 
                    value={inputValueSave}

                    style={{
                      height:"25px",
                      width:"200px",
                      border: "1px solid #ccc",
                      borderRadius:"5px"
                    }}for="name" onChange={handleNameChange}></input>

                    <FormGroup
                    sx={{
                      color:"#696969",
                      
                    }}>
                      <FormControlLabel 
                        style={{ fontSize: "5px" }}
                        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />} label="Hide field name" />
                      
                      <FormControlLabel control={<Checkbox checked={isChecked1} onChange={handleCheckboxChange1} />} label="Required field" />
                      
                      
                    </FormGroup>
                    <div>
                      <p>Number of Characters (Note: Use integer)</p>
                      <div style={{
                        display:"flex",
                        color:"#696969",
                        fontSize:"15px"
                      }}>
                        <label
                        style={{
                          paddingTop:"5px",
                        }}>Minimum</label>
                        <OutlinedInput
                       onChange={handleInputChange1}
                        sx={{
                          height:"40px",
                          width:"65px",
                          marginRight:"30px",
                          marginLeft:"5px",
                        }}></OutlinedInput>
                        <label
                       
                        style={{
                          paddingTop:"5px",
                        }}>Maximum</label>
                      <OutlinedInput
                      onChange={handleInputChange2}
                      sx={{
                          height:"40px",
                          width:"65px",
                          marginLeft:"5px",
                        }}></OutlinedInput>

                      </div>
                    </div>

                    <div className="default">
                      <p>Default Value</p>
                      <OutlinedInput
                      value={text2}
                      onChange={handleNameChange2}
                      sx={{
                          height:"40px",
                          width:"250px",
                          marginLeft:"5px",
                        }}
                        ></OutlinedInput>
                    </div>
                    <div>
                      <p> Feild Code *</p>
                    <div
                    style={{
                      display:"flex"
                    }}>
                    <OutlinedInput
                    onChange={handleFieldInput}
                    value={fieldInput}
                      sx={{
                          height:"35px",
                          width:"200px",
                          marginLeft:"5px",
                        }}
                        ></OutlinedInput>
                        <Button

                      sx={{
                        marginLeft:"10px",
                        height:"30px",
                        marginTop:"2px"
                      }} variant="contained" disableElevation>
                          Save
                        </Button>

                   </div>
                  </div>
                
                 </div>
                   </div>
                  }
                  {type==="label" &&
                  (       
                      <Index 
                      onTextChange={handleEditorChange}
                      setCheckLabel={setCheckLabel}
                      labelValue={labelValue}
                      ></Index>        
                  )}
                  {
                    type==="textarea" && (
                      <TextArea 
                      inputValueFromTextArea={inputValueFromTextArea}
                      setInputValueFromTextArea={setInputValueFromTextArea} 
                      valueDefault={valueDefault}
                      setValueFromTextArea={setValueFromTextArea}
                      setHideFieldName={setHideFieldName}
                      setRequiredName={setRequiredName}
                      formValue={formValue} 
                      formValue1={formValue1} 
                      onFormChange={handleFormChange} 
                      onFormChange1={handleFormChange1} 
                      field={field}
                      handleField={handleField}
                      setTextAreaValueSave={setTextAreaValueSave}
                      editorText={editorText}
                      >
                      </TextArea>
                    )
                  }
                  {
                    type==="checkbox" && (
                      <div>
                        <CheckBox
                         open1={open}
                         inputValueFromCheckBox={inputValueFromCheckBox}
                         setInputValueFromCheckBox={setInputValueFromCheckBox}
                         valueSample1={valueSample1}
                         setValueSample1={setValueSample1}
                         valueSample2={valueSample2}
                         setValueSample2={setValueSample2}
                         setHideFieldName={setHideFieldName}
                         setRequiredName={setRequiredName}
                         formValue={formValue} 
                         formValue1={formValue1} 
                         onFormChange={handleFormChange} 
                         onFormChange1={handleFormChange1} 
                         isPicked={isPicked} 
                         handleCheckboxPicked={handleCheckboxPicked}
                         isPicked1={isPicked1} 
                         handleCheckboxPicked1={handleCheckboxPicked1}
                         fieldCheckBox={fieldCheckBox}
                         handleFieldCheckBox={handleFieldCheckBox}
                         addButton3={addButton3}
                         renderButton3={renderButton3}
                         addButton4={addButton4}
                         renderButton32={renderButton32}
                        ></CheckBox>
                      </div>
                    )
                  }

                  <div style={{
                    marginTop:"20px",
                    borderTop:"1px solid #ccc",
                    paddingTop:"15px"
                  }}>
                  <Stack spacing={2} direction="row">
                    <Button 
                    onClick={handleClose}
                    sx={{
                      height:"45px",
                      marginRight:"60%",
                      marginLeft:"20px"
                    }}variant="outlined">Cancel</Button>
                    <Button 
                    onClick={handleButtonClick}
                    style={{
                      padding:"5 40px"
                    }}variant="contained">Save</Button>
                  </Stack>
                  </div>
                 </Typography>
              </Box>
            </Modal>

      </div>
      <div
        ref={drag}
        style={{
          border: isDragging ? "5px solid pink" : "0px",
          cursor: "move",
          // width: `${size.width}px`,
          // height: `${size.height}px`,
          display: "flex",
          height:"100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", 
        }}
      >

        {type === "input" && (
          
          <input className="input-card"
          style={{
            marginRight:"15px",
            boxSizing: "border-box",
            width:"100%",
            height:"100%"
          }}
          
              placeholder={buttonClicked? text2: text }
          
           type="text" readOnly />
        )}
        {type === "label" && <p>{editorText}</p>}
        {type === "textarea" && 
            <textarea name="comments" cols="20" rows="4"
            style={{
              paddingTop:"8px",
              pointerEvents: 'none' ,
              marginRight:"15px"

            }}
            placeholder={valueDefault} 
            ></textarea>
        }
        {type === "checkbox" && 
        <div
        style={{ 
          pointerEvents: 'none',
          display:"flex",
           }}
       >
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
       
        </div> 
        }
        {type === "number" && (
          <input className="input-card" placeholder={type} type="text" 
          style={{ 
            pointerEvents: 'none',
            marginRight:"15px"
             }} />
        )}
        {type === "calculated" && (
          <input className="input-card" placeholder={type} type="text" 
          style={{ pointerEvents: 'none' }} />
        )}
        {type==="radio" &&
          (
            <div
            style={{ pointerEvents: 'none' }}>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel value="end1" control={<Radio />} label="sample1" />
                <FormControlLabel value="end2" control={<Radio />} label="sample2" />
              </RadioGroup>
            </div>
          )
        }

        {type==="attachfile" &&
          (
            <div style={{ pointerEvents: 'none' }}>
               <p
               style={{
                marginBottom:"-5px",
                color:"blueviolet"
               }}>Browse</p>

               <p>(Maximum: 1GB)</p>
            </div>
          )
        }
        {type === "link" && <textarea style={{ pointerEvents: 'none' }} name="comments" cols="20" rows="4"></textarea>}

      </div>
    </div>
  );
}

export default DraggableElement;
