import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styelsSignIn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../Context/Context';

export default function SignInForm() {
  const classes = useStyles();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [back, setBack] = useState(false);
  const context = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    context.signIn(userData.email, userData.password);
  }

  return (
    <>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">Sign In</Typography>
          <TextField required name="email" variant="outlined" label="E-mail" fullWidth value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          <TextField required name="password" variant="outlined" label="Password" type="password" fullWidth value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        </form>
      </Paper>
      {back && (<Redirect to='/' />)}
    </>
  )
}

