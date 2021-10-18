import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from './stylesRequestForm';
import FileBase from 'react-file-base64';
import Request from './Request';
import { UserContext } from '../../Context/Context';

export default function RequestForm() {
  const classes = useStyles();
  const [maintenenceData, setMaintenenceData] = useState({ name: '', damageAmount: '', time: '', selelctedFile: '' });
  const context = useContext(UserContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    context.createRequest(maintenenceData);
    
  }
  const clear = () => {
    setMaintenenceData({ name: '', damageAmount: '', time: '', selelctedFile: '' });
  };
  const handleChange = (event) => {
    setMaintenenceData({ ...maintenenceData, time: event.target.value });
  };
  return (
    <>

      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">Maintenance Request</Typography>
          <TextField name="name" variant="outlined" label="Name" fullWidth value={maintenenceData.name} onChange={(e) => setMaintenenceData({ ...maintenenceData, name: e.target.value })} />
          <TextField name="damageAmount" variant="outlined" label="Problem Domain" fullWidth value={maintenenceData.damageAmount} onChange={(e) => setMaintenenceData({ ...maintenenceData, damageAmount: e.target.value })} />
          <Box className={classes.box} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={maintenenceData.time}
                label="Time"
                onChange={handleChange}
              >
                <MenuItem value={"urgent"}>Urgent</MenuItem>
                <MenuItem value={"normal"}>Normal</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setMaintenenceData({ ...maintenenceData, selelctedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button className={classes.clear} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
      <Request />
    </>
  )
}
