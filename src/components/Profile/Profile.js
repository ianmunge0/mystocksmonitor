import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Dialog from "./Dialog";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Messages from "../Common/Messages";

import {
  getAdminprofile,
  updateAdminProfile,
} from "../../Redux/Actions/Attendants";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
const countries = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
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
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  inputs: {
    width: "100%",
    float: "left",
  },
}));

function Profile(props) {
  useEffect(() => {}, []);

  const [countries, setCountries] = useState({});
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");
  const [passworderror, setPassworderror] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [country, setCountry] = useState({});

  const [open, setOpen] = useState(false);

  const handleClickOpen = (typestring) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);

  const updateProfile = (e) => {
    e.preventDefault();
    setError("");
    if (profile["username"] === "") {
      setError("you have not changed anything");
    } else {
      profile.country = country.code;
      profile.action = "update";
      props.updateAdminProfile(profile);
    }
  };
  const [password, setPassword] = useState({
    password: "",
    confirmpassword: "",
  });

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const handleProfileData = (e) => {
    setProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };
  // if (!props.profile.profile) {
  //   return <Loader fullPage loading={props.profile.loading} />;
  // }

  const setdcountry = (data) => {
    setCountry(data);
  };
  const changePassword = (e) => {
    setPassword({
      ...password,
      [e.target.id]: e.target.value,
    });
  };
  const updatePassword = (e) => {
    e.preventDefault();
    setPassworderror("");
    if (password["password"] === "" || password["confirmpassword"] === "") {
      setPassworderror("password is empty");
    } else {
      if (password["password"] !== password["confirmpassword"]) {
        setPassworderror("password must be the same");
        return;
      }
      password.action = "password";
      props.updateAdminProfile(password);
    }
  };
  console.log("bb", props);
  return (
    <div className={classes.root}>
      <Loader fullPage loading={loading} />
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Edit Info" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Change Password" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Messages type="error" text={error} />
        <form onSubmit={updateProfile} autoComplete="off">
          <div className="row">
            {profile ? (
              <Dialog
                countries={countries}
                fullScreen
                open={open}
                setdcountry={setdcountry}
                handleClose={handleClose}
              />
            ) : (
              ""
            )}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  className={classes.inputs}
                  id="country"
                  helperText="Please select your country"
                  onClick={() => handleClickOpen()}
                  defaultValue={reactLocalStorage.getObject("userdata").name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.inputs}
                  id="username"
                  helperText="Username"
                  onChange={handleProfileData}
                  defaultValue={
                    reactLocalStorage.getObject("userdata").username
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  className={classes.inputs}
                  onChange={handleProfileData}
                  value={reactLocalStorage.getObject("userdata").emailaddress}
                  helperText="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phone"
                  className={classes.inputs}
                  onChange={handleProfileData}
                  defaultValue={reactLocalStorage.getObject("userdata").phoneno}
                  helperText="Phone number"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: 20, padding: 15 }}
                  className={classes.button}
                  type="submit"
                  endIcon={<Icon>send</Icon>}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Messages type="error" text={passworderror} />
        <form onSubmit={updatePassword} autoComplete="off">
          <div className="row">
            <TextField
              id="password"
              className={classes.inputs}
              onChange={changePassword}
              helperText="Password"
              onClick={() => handleClickOpen()}
            />
            <TextField
              id="confirmpassword"
              className={classes.inputs}
              onChange={changePassword}
              helperText="New Password"
              onClick={() => handleClickOpen()}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20, padding: 15 }}
              className={classes.button}
              type="submit"
              endIcon={<Icon>send</Icon>}
            >
              Update
            </Button>
          </div>
        </form>
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.attendants,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getAdminprofile: (id) => dispatch(getAdminprofile(id)),
    updateAdminProfile: (data) => dispatch(updateAdminProfile(data)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Profile);
