import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import SubscriptionPackage from "./SubscriptionPackage";
import { connect } from "react-redux";
import { getSubscriptions } from "../../Redux/Actions/Subscription";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

import moment from "moment";
const useStyles2 = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {
    width: 128,
    height: 128,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 850,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

function setDate(params) {
  var by1000 = params * 1000;
  var dateTime = new Date(by1000);

  return moment(dateTime.toISOString()).format("YYYY-MMM-DD HH:mm:ss");
}

function remainingDays(endson_) {
  var currtime = Math.floor(Date.now() / 1000);
  var remtime = endson_ - currtime;
  var remdays = remtime / 86400;
  return Math.trunc(remdays);
}

function Subscription(props) {
  const classes2 = useStyles2();
  const classes1 = useStyles1();
  const classes = useStyles();

  useEffect(() => {
    props.getSubscriptions();
  }, []);

  console.log("subscriptions", props.subscription.subscriptions);
  if (!props.subscription.subscriptions) {
    return <Loader fullPage loading={true} />;
  }
  return (
    <React.Fragment>
      {/* <Grid item xs={6}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          style={{ width: "100%" }}
          aria-haspopup="true"
        ></IconButton>
      </Grid> */}

      <Grid container>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1">
            <strong>
              {reactLocalStorage.getObject("currentpackage").plan} plan is
              active
            </strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            Ending on{" "}
            {setDate(reactLocalStorage.getObject("currentpackage").endson)}
          </Typography>
          <Typography variant="body2" color="textSecondary"></Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" style={{ cursor: "pointer" }}>
            {remainingDays(
              reactLocalStorage.getObject("currentpackage").endson
            )}{" "}
            days remaining
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            component={Link}
            to="/subscriptionpackages"
            variant="outlined"
            size="large"
            color="primary"
            className={classes2.margin}
          >
            Extend Usage
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  subscription: state.subscription,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getSubscriptions: () => dispatch(getSubscriptions()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Subscription);
