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
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import {
  getSubscriptions,
  getCurrentSubscription,
} from "../../Redux/Actions/Subscription";

function Packages(props) {
  useEffect(() => {
    props.getSubscriptions();
    props.getCurrentSubscription();
  }, []);

  if (!props.subscription.subscriptions) {
    return <Loader fullPage loading={true} />;
  }
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          style={{ width: "100%" }}
          aria-haspopup="true"
        ></IconButton>
      </Grid>

      <Container>
        {props.subscription.subscriptions.map((v, k) => {
          return (
            props.currentsubscription && (
              <SubscriptionPackage packageitem={v} key={k} />
            )
          );
        })}
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  subscription: state.subscription,
  currentsubscription: state.subscription.currentsubscription,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getSubscriptions: () => dispatch(getSubscriptions()),
    getCurrentSubscription: () => dispatch(getCurrentSubscription()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Packages);
