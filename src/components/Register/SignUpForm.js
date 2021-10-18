import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './stylesSignUp';
import { Redirect } from 'react-router-dom';
import './signUp.css';
import { UserContext } from '../../Context/Context';


export default function SignUpForm() {
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' });
  const [signUp, setSignUp] = useState(false);
  const classes = useStyles();
  const context = useContext(UserContext);

  const clear = () => {
    setUserData({ firstName: '', lastName: '', email: '', password: '', role: '' });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    context.signUp(userData);
    setSignUp(true);
  };
  return (
    <>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
          <Typography variant="h6">Sign Up</Typography>
          <TextField name="firstname" variant="outlined" label="First Name" fullWidth value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} required />
          <TextField name="lastname" variant="outlined" label="Last Name" fullWidth value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} required />
          <TextField name="email" variant="outlined" label="E-mail" fullWidth value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} required />
          <TextField name="password" variant="outlined" label="Password" type="password" fullWidth value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} required />

          <Box className={classes.box} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userData.role}
                label="Role"
                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              >
                <MenuItem value={'user'}>User</MenuItem>
                <MenuItem value={'admin'}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button className={classes.buttonSubmit}  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button className={classes.clear} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
      {signUp && (<Redirect to='/signin' />)}
    </>
  );
}