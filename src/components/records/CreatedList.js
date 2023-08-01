import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@mui/material/Checkbox';

const columns = [
    { field: 'id', headerName: 'Record number', width: 100, align: 'left' },
    { field: 'user', headerName: 'Update  by', width: 300, align: 'left' },
    { field: 'created', headerName: 'Created by', width: 300, align: 'left' },
    {
        field: 'date',
        headerName: 'Update datetime',
        width: 250,
        align: 'left'
      },
    { field: 'datetime', headerName: 'Created datetime', width: 200, align: 'left' },
    { field: 'check', headerName: 'CheckBox', width: 120, 
    renderCell: (params) => (
        <div>
          <Checkbox></Checkbox>
        </div>
      ),},
    { field: 'edit', 
    headerName: 'a', 
    width: "80" ,
    renderCell: (params) => (
      <div>
        <CreateIcon style={{ marginRight: 8, marginBottom: -5, color:"#0099CC"}} />
        <span style={{
          color:"#0099CC"
        }}>Edit</span>
      </div>
    ),
  },
  { field: 'delete', 
  headerName: 'b', 
  width: "80",
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
  
  const rows = [
    { 
        id: 1, 
        user: 'ngocnguyenthithanh6@gmail.com', 
        created:'ngocnguyenthithanh6@gmail.com',
        date: 'Jul 11, 2023 9:10 AM', 
        checkBox: "a", 
        datetime:'Jul 11, 2023 9:10 AM'
    },


  ];

export default function CreatedList() {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        sx={{
          width:"80%"
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
