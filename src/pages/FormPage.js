import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Element from "../components/main/Element"
import DraggableElement from "../components/main/DraggableElement";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/css/FormPage.css"
import Resize from "../components/resize/Resize"
import Box from '@mui/material/Box';


// async function fetchData(itemId) {
//   try {
//     const response = await fetch(`http://localhost:4000/api/getItemById/${itemId}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
  
// }


export default function FormPage({ 
  currentTime, 
  setCurrentTime,
  ElementList,
  handleClick1,
  drop,
  board,
  handleDrop,
  isChecked,
  handleCheckboxChange,
  addButton3,
  renderButton3,
  addButton4,
  renderButton32,
  renderButton,
  renderButton2,
  setInputValueSave,
  setTextAreaValueSave,
  textAreaValueSave,
  inputValueSave,
  onSave,
  setCheckLabel,
  setDeleteItem,
  setDeleteItemText,
  setDeleteItemLabel,
  setValueSample1,
  setValueSample2,
  valueSample1,
  valueSample2,
  setSample1,
  setSample2,
  roleUser,
  handleAddItemDropItemDrop,
  fetchItems1,
  deleteItem,
  setDeleteState,
  deleteState,
  handleChangeState,
  clickedIndexes,
  idItemsDrop,
  setBoard,
  storedObject,
  item
 }) {
 

  



    // console.log(item)
    
    // console.log(idItemSave)

    // localStorage.setItem("board", board);
    // const listBoard=  localStorage.getItem("board");

    // useEffect(() => {
    //   const storedObject = JSON.parse(localStorage.getItem('board'));
    //   setBoard(storedObject || {});
    // }, []);
  
    // }
    const listItemNew= [...(JSON.parse(localStorage.getItem('listItemOld')))];

    console.log(">>>",listItemNew)


  return (
    <div className="home">       
      <div className="Elements">
            <div className="button" >
              <Button 
                variant="contained" 
                color="success" 
                className="save-btn"
                onClick={handleClick1}>
                Save form
              </Button>
              <ToastContainer 
                sx={{
                    width:"100px",
                    color:"blue"
                }}
              />
          </div>
        <div
        style={{
          height: "750px",
          overflow: "scroll",
        }}>
          {ElementList.map((element) => (
            <Element
              key={element.id}
              id={element.id}
              type={element.type}
              text={element.text}
              handleAddItemDropItemDrop={handleAddItemDropItemDrop}
            />
            
            
          ))}
        </div>
      </div>
      <div className="Board" ref={drop}
      >{
        board.length<=0 && (storedObject.map((element)=>(
          !clickedIndexes.includes(element.id)&&(
               <Resize        
            key={element.id}
            id={element.id}
            type={element.type}
            text={element.text}
            position={element.position}
            handleDrop={handleDrop}
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
            addButton3={addButton3}
            renderButton3={renderButton3}
            addButton4={addButton4}
            renderButton32={renderButton32}
            renderButton={renderButton}
            renderButton2={renderButton2}
            setInputValueSave={setInputValueSave}
            setTextAreaValueSave={setTextAreaValueSave}
            textAreaValueSave={textAreaValueSave}
            inputValueSave={inputValueSave}
            onSave={onSave}
            setCheckLabel={setCheckLabel}
            setDeleteItem={setDeleteItem}
            setDeleteItemText={setDeleteItemText}
            setDeleteItemLabel={setDeleteItemLabel}
            setValueSample1={setValueSample1}
            setValueSample2={setValueSample2}
            valueSample1={valueSample1}
            valueSample2={valueSample2}
            setSample1={setSample1}
            setSample2={setSample2}
            deleteItem={deleteItem}
            setDeleteState={setDeleteState}
            handleChangeState={handleChangeState}
            idItemsDrop={idItemsDrop}
          />
         
          )
        )))
      }
     
        {board.length>0 && (board.map((element) => (  
          !clickedIndexes.includes(element.id)&&(
               <Resize        
            key={element.id}
            id={element.id}
            type={element.type}
            text={element.text}
            position={element.position}
            handleDrop={handleDrop}
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
            addButton3={addButton3}
            renderButton3={renderButton3}
            addButton4={addButton4}
            renderButton32={renderButton32}
            renderButton={renderButton}
            renderButton2={renderButton2}
            setInputValueSave={setInputValueSave}
            setTextAreaValueSave={setTextAreaValueSave}
            textAreaValueSave={textAreaValueSave}
            inputValueSave={inputValueSave}
            onSave={onSave}
            setCheckLabel={setCheckLabel}
            setDeleteItem={setDeleteItem}
            setDeleteItemText={setDeleteItemText}
            setDeleteItemLabel={setDeleteItemLabel}
            setValueSample1={setValueSample1}
            setValueSample2={setValueSample2}
            valueSample1={valueSample1}
            valueSample2={valueSample2}
            setSample1={setSample1}
            setSample2={setSample2}
            deleteItem={deleteItem}
            setDeleteState={setDeleteState}
            handleChangeState={handleChangeState}
            idItemsDrop={idItemsDrop}
          />
         
          )
         
        )))}
        {listItemNew.map((element, index) => (
          !clickedIndexes.includes(element)&&(
          <Resize        
            key={element}
            id={element}
            type={element}
            text={
            element=== 1
              ? 'Input'
              : element === 3
              ? 'Labelff'
              : element === 4
              ? 'Text area'
              : element === 5
              ? 'Check box'
              : ''
          }
            position={element.position}
            handleDrop={handleDrop}
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
            addButton3={addButton3}
            renderButton3={renderButton3}
            addButton4={addButton4}
            renderButton32={renderButton32}
            renderButton={renderButton}
            renderButton2={renderButton2}
            setInputValueSave={setInputValueSave}
            setTextAreaValueSave={setTextAreaValueSave}
            textAreaValueSave={textAreaValueSave}
            inputValueSave={inputValueSave}
            onSave={onSave}
            setCheckLabel={setCheckLabel}
            setDeleteItem={setDeleteItem}
            setDeleteItemText={setDeleteItemText}
            setDeleteItemLabel={setDeleteItemLabel}
            setValueSample1={setValueSample1}
            setValueSample2={setValueSample2}
            valueSample1={valueSample1}
            valueSample2={valueSample2}
            setSample1={setSample1}
            setSample2={setSample2}
            deleteItem={deleteItem}
            setDeleteState={setDeleteState}
            handleChangeState={handleChangeState}
            idItemsDrop={idItemsDrop}
          />
      
    )))}
      </div>
      <div>
      
      </div>
     
    </div>
  )
}
