import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      marginTop: 25,
      margin: 'auto',
      maxWidth: 850
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

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 850
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

const useStyles2 = makeStyles((theme) => ({
margin: {
    margin: theme.spacing(1),
},
extendedIcon: {
    marginRight: theme.spacing(1),
},
}));

function SubscriptionPackage(props) {
    const classes1 = useStyles1();
    const classes = useStyles();
    const classes2 = useStyles2();
    const {packageitem,current} = props;
    console.log("SubscriptionPackage ",packageitem);
    console.log(current.serialno, packageitem.serialno);
    console.log(current.serialno === packageitem.serialno && classes1.active);
    return (
        <div>
            <Paper className={[classes1.paper,current.serialno === packageitem.serialno && classes1.active]} onClick={()=>{
            props.history.push({pathname:"paymentoptions", state:{data:packageitem}})
        }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                            <strong>{packageitem.plan}</strong>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            @KES {packageitem.price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                            {packageitem.moreinfo}
                            </Typography>
                        </Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid item direction="row" justify="flex-end" alignItems="center">
                        <Button component={ Link } to="/subscriptionpackages" variant="outlined" size="large" color="primary" className={classes2.margin} >
                            Select
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            
        </div>
    );
}

export default withRouter(SubscriptionPackage);
