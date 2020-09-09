import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import SubscriptionPackage from './SubscriptionPackage';
import { connect } from "react-redux";
import { getSubscriptions } from "../../Redux/Actions/Subscription";

const useStyles = makeStyles((theme) => ({
   paper: {
     padding: theme.spacing(2),
     textAlign: 'center',
     color: theme.palette.text.secondary,
   },
 }));

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

function Subscription(props) {
   const classes = useStyles();
   const classes1 = useStyles1();

  return (
    <React.Fragment>
      
      <Grid item xs={6}>
         <IconButton
         aria-label="more"
         aria-controls="long-menu"
         style={{ width: "100%" }}
         aria-haspopup="true"
         >
         </IconButton>
      </Grid>
      
      <Container>

        <SubscriptionPackage/>
        <SubscriptionPackage/>
        <SubscriptionPackage/>
        <SubscriptionPackage/>
        
      </Container>
    </React.Fragment>
  );


}

const mapStateToProps = (state) => ({
  subscriptions: state.subscriptions,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getSubscriptions: () => dispatch(getSubscriptions())
  };
};

export default connect(mapStateToProps, mapDispacthToProps)(Subscription);
