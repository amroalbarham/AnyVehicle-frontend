
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    }
  },
  paper: {
  marginTop: '1%',
  marginLeft: '50%',
  width: '40%',
  padding: theme.spacing(3),
  
},
  form: {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
},
  buttonSubmit: {
  marginBottom: 10,
  marginTop: 15,
  width: '94%',
},
  box: {
  width: '94%',
},
clear:{
  width: '94%',
}
}));
