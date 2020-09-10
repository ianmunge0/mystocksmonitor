import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto'
    },
    image: {
       width: 128,
       height: 128
    },
 
  }));

function SubscriptionPackage(props) {
    const classes1 = useStyles1();
    const {packageitem} = props;
    console.log("SubscriptionPackage ",packageitem);
    return (
        <div>
            <Paper className={classes1.paper}>
            <Grid container spacing={2}>
                
                <Grid item xs={12} sm container>
                <Grid item xs container direction="column">
                    <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                        {packageitem.plan}
                    </Typography>
                    </Grid>
                </Grid>
                <Grid item>
    <Typography variant="subtitle1">{packageitem.price}</Typography>
                </Grid>
                </Grid>
            </Grid>
            </Paper>
            <br/>
        </div>
    );
}

export default SubscriptionPackage;
