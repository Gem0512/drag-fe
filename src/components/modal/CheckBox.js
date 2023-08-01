import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';


export default function CheckBox(
    {
    open1,
    inputValueFromCheckBox, 
    setInputValueFromCheckBox,
    valueSample1,
    setValueSample1,
    valueSample2,
    setValueSample2,
    setHideFieldName, 
    setRequiredName,
    formValue, 
    formValue1,
    onFormChange,
    onFormChange1,
    isPicked,
    handleCheckboxPicked,
    isPicked1,
    handleCheckboxPicked1,
    fieldCheckBox,
    handleFieldCheckBox,
    addButton3,
    renderButton3,
    addButton4,
    renderButton32

   
     }) {
        const handleSample1 =(event) =>{
          
                setValueSample1(event.target.value); 
            
        }
        const handleSample2 =(event) =>{
          
                setValueSample2(event.target.value); 
            
        }
        const handleInputChange = (event) => {
            setInputValueFromCheckBox(event.target.value); 
          };

        const handleHideFieldNameChange = (event) => {
            setHideFieldName(event.target.checked);
          
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







          const [todos, setTodos] = useState([]);
            const [newTodo, setNewTodo] = useState('');


            const handleFormSubmit = (event) => {
                event.preventDefault();
            
                setTodos([...todos, newTodo]);
                setNewTodo('');
                
            };

            const handleTodoDelete = (index) => {
                const updatedTodos = [...todos];
                updatedTodos.splice(index, 1);
                setTodos(updatedTodos);
            };



            const [todos1, setTodos1] = useState([]);
            const [newTodo1, setNewTodo1] = useState('');


            const handleFormSubmit1 = (event) => {
                event.preventDefault();
            
                setTodos1([...todos1, newTodo1]);
                setNewTodo1('');
                
            };

            const handleTodoDelete1 = (index) => {
                const updatedTodos = [...todos1];
                updatedTodos.splice(index, 1);
                setTodos1(updatedTodos);
            };


            localStorage.setItem("valueSample1", valueSample1);
            localStorage.setItem("valueSample2", valueSample2);
            localStorage.setItem("inputValueFromCheckBox", inputValueFromCheckBox);




            
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
        <input 
           onChange={handleInputChange}
            value={inputValueFromCheckBox}
            type='text'
            style = {
            {
                height: '25px',
                width: '200px',
                border: '1px solid #ccc',
                borderRadius: '5px',
            }     
        }
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


        <div className="options">
            <p
            style={{
                marginBottom:"15px",
                
            }}>Options</p>



        <div>
            <div>
               
                <div className="modal">
                  <div className="modal-content">
                  <Checkbox
                    checked={isPicked} 
                    onChange={handleCheckboxPicked}
                    sx={{
                        marginTop: '-8px',
                    }}/>
                    <OutlinedInput
                    onChange ={handleSample1}
                    value= {valueSample1}
                    style={{
                        height: '30px',
                        marginBottom: '10px',
                    }}
                   
                    />
                    <button 
                    style={{
                        height: '25px',
                        marginTop: '2px',
                        marginLeft:"5px"
                    }}
                    onClick={addButton3}>+</button>
                    <button 
                     style={{
                        height: '25px',
                        margin: '2px 5px 0px 5px',
                        width: '23px',
                    }}
                    >-</button>
                  </div>
                </div>
            </div>
            <div
              style={{
                // display:"flex",
              }}
            >
              {renderButton3()}
            </div>
           
          </div>



          <div>
            <div>
               
                <div className="modal">
                  <div className="modal-content">
                  <Checkbox
                     checked={isPicked1} 
                        onChange={handleCheckboxPicked1}
                    sx={{
                        marginTop: '-8px',
                    }}/>
                    <OutlinedInput
                     onChange ={handleSample2}
                        value= {valueSample2}
                    style={{
                        height: '30px',
                        marginBottom: '10px',
                    }}
                   
                    />
                    <button 
                    style={{
                        height: '25px',
                        marginTop: '2px',
                        marginLeft:"5px"
                    }}
                    onClick={addButton4}>+</button>
                    <button 
                     style={{
                        height: '25px',
                        margin: '2px 5px 0px 5px',
                        width: '23px',
                    }}
                    >-</button>
                  </div>
                </div>
            </div>
            <div
              style={{
                // display:"flex",
              }}
            >
              {renderButton32()}
            </div>
           
          </div>





            {/* <div>
                <div>
                    <Checkbox
                        checked={isPicked} 
                        onChange={handleCheckboxPicked}
                    ></Checkbox>
                    <input
                        onChange ={handleSample1}
                        value= {valueSample1}
                        sx={{
                            // height:"50px",
                            fontSize:"12px",
                            marginTop:"5px",
                        }}
                    />
                    <button 
                     style={{
                            borderRadius:"50%",
                            margin:"5px",
                            width:"22px",
                            // padding:"5px",
                            height:"22px",
                            border:"1px solid #ccc"
                        }}
                    onClick={handleFormSubmit} >+</button>
                    <button
                     style={{
                            borderRadius:"50%",
                            margin:"5px",
                            width:"22px",
                            // padding:"5px",
                            height:"22px",
                            border:"1px solid #ccc"
                        }}
                      >-</button>
                </div>
                <div>
                    {todos.map((todo, index) => (
                    <div 
                     style={{
                        listStyle:"none",     
                        marginLeft:"0px"      
                    }}
                    key={index}>
                        {todo}
                        <Checkbox
                            // checked={isPicked} 
                            // onChange={handleCheckboxPicked}
                        ></Checkbox>
                        <input
                        style={{
                            width:"170px"
                        }}></input>
                        <button 
                        style={{
                            borderRadius:"50%",
                            margin:"5px",
                            width:"22px",
                            // padding:"5px",
                            height:"22px",
                            border:"1px solid #ccc"
                        }}
                        onClick={handleFormSubmit}>+</button>
                        <button 
                         style={{
                            borderRadius:"50%",
                            margin:"5px",
                            width:"22px",
                            // padding:"5px",
                            height:"22px",
                            border:"1px solid #ccc"
                        }}
                        onClick={() => handleTodoDelete(index)}>-</button>
                    </div>
                    ))}
                </div>
            </div> */}
          

            {/* <div>
                <div >
                    <Checkbox
                        checked={isPicked1} 
                        onChange={handleCheckboxPicked1}
                    ></Checkbox>
                    <input
                        onChange ={handleSample2}
                        value= {valueSample2}
                        sx={{
                            // height:"50px",
                            
                            fontSize:"12px",
                            marginTop:"5px",
                            width:"24px",
                            
                        }}
                    />
                    <button 
                    style={{
                            borderRadius:"50%",
                            margin:"5px",
                            width:"22px",
                            // padding:"5px",
                            height:"22px",
                            border:"1px solid #ccc"
                        }}
                        onClick={handleFormSubmit1} >+</button>
                    <button
                    style={{
                            borderRadius:"50%",
                            margin:"5px",
                            width:"22px",
                            // padding:"5px",
                            height:"22px",
                            border:"1px solid #ccc"
                        }}
                          >-</button>
                </div>
                <div>
                    {todos1.map((todo1, index) => (
                    <div 
                    style={{
                        listStyle:"none",     
                        marginLeft:"0px"      
                    }}
                    key={index}>
                        {todo1}
                        <Checkbox
                            // checked={isPicked1} 
                            // onChange={handleCheckboxPicked1}
                        ></Checkbox>
                        <input
                        style={{
                            width:"170px"
                        }}></input>
                        <button 
                        style={{
                            borderRadius:"50%",
                            margin:"5px",
                            width:"22px",
                            // padding:"5px",
                            height:"22px",
                            border:"1px solid #ccc"
                        }}
                        onClick={handleFormSubmit1}>+</button>
                        <button 
                        style={{
                            borderRadius:"50%",
                            margin:"5px",
                            width:"22px",
                            // padding:"5px",
                            height:"22px",
                            border:"1px solid #ccc"
                        }}
                        onClick={() => handleTodoDelete1(index)}>-</button>
                    </div>
                    ))}
                </div>
            </div> */}


        </div>

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
            onChange={handleFieldCheckBox}
            value={fieldCheckBox}
            >
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
  )
}
