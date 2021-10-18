import React, { useContext } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { UserContext } from '../../Context/Context';

import useStyles from './stylesRequesr';

export default function Request() {

  const context = useContext(UserContext);
  const classes = useStyles();

  return (
    <>
      {
        context.userData.repairRequests.map((request) => {
          return (
            <div className={classes.div}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={request.selelctedFile} title={request.name} />
                <div className={classes.overlay}>
                  <Typography variant="h6">{request.name}</Typography>
                  <Typography variant="body2">{moment(request.createdAt).fromNow()}</Typography>
                </div>
                {/* <div className={classes.overlay2}>
                  <Button style={{ color: 'white' }} size="small" onClick={() => { }}><MoreHorizIcon fontSize="default" /></Button>
                </div> */}
                <div className={classes.details}>
                  <Typography variant="body2" color="textSecondary" component="h2">{request.damageAmount}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{request.time}</Typography>
                <CardContent>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary" onClick={() => {context.deleteRequest(request.name)}}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
              </Card>
            </div>
          )
        })
      }
    </>
  );
};



