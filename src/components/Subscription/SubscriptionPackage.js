import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      marginTop: 25,
    },
    image: {
       width: 128,
       height: 128
    },
    active:{
        backgroundColor:'lightgreen',
        color: 'white',
    }
 
  }));

function SubscriptionPackage(props) {
    const classes1 = useStyles1();
    const {packageitem,current} = props;
    console.log("SubscriptionPackage ",packageitem);
    console.log(current.serialno, packageitem.serialno);
    console.log(current.serialno === packageitem.serialno && classes1.active);
    return (
        <div>
            <Paper className={[classes1.paper,current.serialno === packageitem.serialno && classes1.active]} onClick={()=>{
                props.history.push({pathname:"paymentoptions"})
            }}>
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
            
        </div>
    );
}

export default withRouter(SubscriptionPackage);
