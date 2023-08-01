import React from 'react'
import { OutlinedInput, Box, Typography,Button } from '@mui/material';

export default function Register() {
  return (
    <Box>
        <Typography>Email</Typography>
        <OutlinedInput></OutlinedInput>
        <Typography>Password</Typography>
        <OutlinedInput></OutlinedInput>
        <Typography>UserName</Typography>
        <OutlinedInput></OutlinedInput>
        <Button>Register</Button>
      
    </Box>
  )
}
