import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius:"5px",
  boxShadow: 20,
  p: 4,
};

export default function UserPage({
    inputValueSave,
    textAreaValueSave,
    apps,
    idItemsDrop,
    setIdItemUser,
    idItemUser
}) {

  
      // open form app
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);


    const dropItem = localStorage.getItem("dropItem");
    const dropItemArray = JSON.parse(dropItem);
    // console.log(dropItemArray);


    const label = localStorage.getItem("label");

    const [input, setInput]= useState('');
    const [textArea, setTextArea]= useState('');
    const [dataList, setDataList] = useState([]);


    const handleSubmit = async (event) => {
      setOpen(false);


      axios.post('http://localhost:4000/api/create-item', { name: input, description: textArea, label: label })
      .then((response) => {
        console.log(response.data); // In thông tin về box đã được lưu vào MongoDB
      })
      .catch((error) => {
        console.error(error);
      });
  
 
    
    console.log( input,"/",textArea,"/",label );

       
      };
    

      const storedUser = localStorage.getItem('email');

      const appAuthors = apps.filter((app) => app?.author?.includes(storedUser)?? false);
      const appNotAuthors = apps.filter((app) => app?.author !== storedUser);

      const titleUser= localStorage.getItem('title')

      const appsWithTargetUser = apps.filter((app) => app.options.includes(titleUser));

      const appsEither = apps.filter((app) => app.options.includes(titleUser) && app.author !== storedUser);

      

      // console.log(dropItem, "---", dropItemArray,"---", titleUser);


      const foundItem = apps.find(app => app._id === idItemUser);


      // console.log(apps,'///',foundItem);

     


    
  return (
    <div
    style={{
        marginTop:"30px",
        width:"100%",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding:"30px",
        borderRadius:"10px"

    }}>
    
      <div>

      </div>
      <Box 
      >
      
      <h2>App more</h2>
        <div>
            {dataList.map((data, index) => (
            <div key={index}>
                <p>Input: {data.input}</p>
                <p>Textarea: {data.textarea}</p>
            </div>
            ))}
        </div>
        <div style={{
          display:"flex"
        }}>
          {/* {
            apps.map((app, index) => (
              <div>
               {app.name}
              </div>
            ))
          } */}

          {/* <div>Téttt</div> */}
          {/* {
            appNotAuthors.map((app, index)=>(
              <div>
                {app.name}
              </div>
            ))
          } */}
          {appsEither.map((app, index) => (
          <div
          style={{
            marginRight:"25px",
            padding:"5px",
            backgroundColor:"white",
            ':hover':{
              cursor:"pointer",
              backgroundColor:"#ccc"
            },
            borderRadius:"5px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
         
          }} key={index}>
               <Button onClick={() =>{handleOpen(); setIdItemUser(app._id);}}> {app.name}</Button>
               <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>               
                    <h2>Form submit</h2>
                        <hr
                        style={{
                            marginBottom:'30px'
                        }}></hr>

                      {
                                foundItem?.items.map((item, index) => (
                            <div key={index}>
                              {item === '1' && (
                                <div
                                      style={{
                                        margin:"10px",
                                      }}>
                                        <label name="input"
                                        style={{
                                        fontWeight:"bold",
                                        marginLeft:"-10px",
                                        display:"block"
                                    }}>{inputValueSave}</label>
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
                              {/* {item !== '1' && item !== '3' && item !== '4' && <p>Giá trị không khớp với 1, 3 hoặc 4</p>} */}
                            </div>
                          ))
                              }
                       
                            
                            <div
                            style={{
                                display:"flex",
                                justifyContent:"flex-end"
                            }}>
                                <Button
                                onClick={handleSubmit}
                                sx={{
                                    backgroundColor:'green',
                                    padding:"10px",
                                    color:"white",
                                    ':hover':{
                                        backgroundColor:"blue",

                                    }
                                    
                                }}>Submit</Button>
                            </div>

                  </Box>
                </Modal>
          </div>
        ))}
        </div>
        </Box>
    </div>
  )
}

