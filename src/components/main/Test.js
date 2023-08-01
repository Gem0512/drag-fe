import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Testt = () => {


  const [selectedOptions, setSelectedOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [apps, setApps] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu từ backend khi component được render
    axios.get('http://localhost:4000/list-app')
      .then(response => {
        setApps(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  


  useEffect(() => {
    // Lấy dữ liệu từ backend khi component được render
    axios.get('http://localhost:4000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  console.log(users);

  const handleOptionChange = (event, value) => {
    setSelectedOptions(value);
  };

  const handleAddOption = () => {
    if (selectedItem) {
      // Gửi các giá trị đã chọn lên backend
      axios.post('http://localhost:4000/api/saveData', { itemId: selectedItem.id, options: selectedOptions.map(option => option.title) })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });

      setModalOpen(false);
    }
  };

  return (
    <div>
      {apps.map(app => (
        <div key={app.id}>
          <span>{app.name}</span>
          <Button onClick={() => { setSelectedItem(app.id); setModalOpen(true); }}>Add Option</Button>
        </div>
      ))}

      <Modal 
      sx={style}
      open={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h2>Add Option for {selectedItem && selectedItem.title}</h2>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={users}
            getOptionLabel={(option) => option.title}
            value={selectedOptions}
            onChange={handleOptionChange}
            renderInput={(params) => (
              <TextField {...params} label="limitTags" placeholder="Favorites" />
            )}
            sx={{ width: '400px' }}
          />
          <Button onClick={handleAddOption}>Add</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Testt;
