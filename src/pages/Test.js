import React, { useState } from 'react';

export default function Test() {
  const [data, setData] = useState([
    { id: 1, name: 'Snow', age: 30 },
    { id: 2, name: 'Lannister', age: 25 },
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [modalData, setModalData] = useState({ id: '', name: '', age: '' });

  const handleEditClick = (row) => {
    setModalData({ ...row });
    setEditingRow(row.id);
  };

  const handleModalInputChange = (event) => {
    const { name, value } = event.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((row) => (row.id === editingRow ? { ...modalData } : row))
    );
    setEditingRow(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>
                <button onClick={() => handleEditClick(row)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingRow !== null && (
        <div>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="id"
              value={modalData.id}
              onChange={handleModalInputChange}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={modalData.name}
              onChange={handleModalInputChange}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={modalData.age}
              onChange={handleModalInputChange}
            />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}
