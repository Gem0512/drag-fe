import React, {useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';

export default function TextArea({ 
    inputValueFromTextArea, 
    setInputValueFromTextArea, 
    valueDefault,
    setValueFromTextArea,
    setHideFieldName, 
    setRequiredName,
    formValue, 
    formValue1,
    onFormChange,
    onFormChange1,
    field,
    handleField,
    setTextAreaValueSave
  }) {

   
   

    const handleInputChange = (event) => {
        setInputValueFromTextArea(event.target.value);
        setTextAreaValueSave(event.target.value); // Gọi hàm để cập nhật giá trị từ thẻ input của file 2
      };

      const handleValueChange = (event) => {
        setValueFromTextArea(event.target.value); // Gọi hàm để cập nhật giá trị từ thẻ input của file 2
      };

      const handleHideFieldNameChange = (event) => {
        setHideFieldName(event.target.checked);
        // handleChange2();
       
      };
      const handleRequiredNameChange =(event) =>{
        setRequiredName(event.target.checked);
      }

      const handleFormChange = (event) => {
        onFormChange(event);
        handleHideFieldNameChange(event);
      };
      const handleRequiredName = (event) =>{
        onFormChange1(event);
        handleRequiredNameChange(event);
      }

localStorage.setItem("inputValueFromTextArea", inputValueFromTextArea);


    return ( 
        <div>
        <label style = {
            {
                display: 'block',
                paddingBottom: '3px',
                marginTop: '10px',
                fontSize: '18px',
            }
        }
        name = "name">
        Name *
        </label>
        <input style = {
            {
                height: '25px',
                width: '200px',
                border: '1px solid #ccc',
                borderRadius: '5px',
            }     
        }
        onChange={handleInputChange}
        value={inputValueFromTextArea}

        for = "name" >
        </input>
        <FormGroup sx = {
            {
                color: '#696969',
            }
        } >
        <FormControlLabel style = {
            { fontSize: '5px' } }
            control = { < Checkbox 
            checked={formValue} 
             color="primary"
             onChange={handleFormChange}
             /> 
             }
        
        label = "Hide field name" />

        <FormControlLabel control = {
             < Checkbox  
               checked={formValue1} 
               color="primary"
               onChange ={handleRequiredName}
             /> }
        label = "Required field" />
        </FormGroup>
        <label
        style={{
            display: 'block',
            marginTop:"10px",
        }} name = "value" > Default Value</label>
        <textarea
        onChange={handleValueChange}
        value={valueDefault}
        for = "value"
        style = {
            {
                height: '100px',
                width: '300px',
                padding:"5px 10px",
            }
        } >
        </textarea>
        <div >
        <p> Feild Code * </p>
        <div style = {
            {
                display: 'flex',
            }
        } >
        <OutlinedInput sx = {
            {
                height: '35px',
                width: '200px',
                marginLeft: '5px',
            }
        }
        onChange={handleField}
        value={field} >
        </OutlinedInput>
        <Button sx = {
            {
                marginLeft: '10px',
                height: '30px',
                marginTop: '2px',
            }
        }
        variant = "contained"
        disableElevation >
        Save
        </Button> 
        </div>
        </div>
        </div>
    );
}