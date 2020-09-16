import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { Link, withRouter } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { connect } from "react-redux";
import { makeSubscription } from "../../Redux/Actions/Subscription";
import Messages from "../Common/Messages";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function PaymentOptions(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleClick = (plan, state) => {
    if (state.checkedB) {
      props.makeSubscription_(plan, state, props);
    } else {
      alert("You need to accept terms and conditions");
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [state, setState] = React.useState({
    checkedB: true,
    phoneno: reactLocalStorage.getObject("userdata").phoneno,
  });
  const handleChangeSwitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handPhoneChange = (event) => {
    setState({ ...state, phoneno: event.target.value });
  };

  console.log("props confirmation ", props.subscription);
  // const handleChangeSwitch = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  var packagename = props.location.state.data;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="MPESA" {...a11yProps(0)} />
          <Tab label="VISA" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Loader fullPage loading={props.subscription.loading} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={6}>
            <label>
              Plan:
              {packagename.plan}
            </label>
          </Grid>
          <Grid item xs={6}>
            <label>Amount: {packagename.price}</label>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Button
            onClick={() =>
              props.history.push({ pathname: "/subscriptionpackages" })
            }
          >
            <h5>`{"Change >>"}` </h5>
          </Button>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <TextField
            id="phoneno"
            fullWidth
            label="Mpesa Phone No"
            onChange={handPhoneChange}
            defaultValue={state.phoneno}
            variant="outlined"
          />
        </Grid>
        {packagename.serialno != 1 && (
          <>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              Accept <Link to=""> Terms and Conditions</Link>
              <Switch
                checked={state.checkedB}
                onChange={handleChangeSwitch}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
            <br />
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {console.log("waitingmpesa ", props.subscription.waitingmpesa)}
              {props.subscription.waitingmpesa ? (
                props.subscription.waitingmpesa.status == 200 ? (
                  props.subscription.confirmationstatus == false ? (
                    <Messages
                      type="error"
                      text="Payment failed, click pay button again"
                    />
                  ) : (
                    <Messages
                      type="success"
                      text="Waiting for mpesa payment.."
                    />
                  )
                ) : (
                  <Messages
                    type="error"
                    text={props.subscription.waitingmpesa.message}
                  />
                )
              ) : (
                ""
              )}
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                onClick={() => handleClick(packagename.serialno, state)}
              >
                COMPLETE
              </Button>
            </Grid>
          </>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Button variant="contained" color="primary">
          CONTINUE
        </Button>
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  subscription: state.subscription,
});

const mapDispacthToProps = (dispatch) => {
  return {
    makeSubscription_: (plan, state, props) =>
      dispatch(makeSubscription(plan, state, props)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(PaymentOptions));
