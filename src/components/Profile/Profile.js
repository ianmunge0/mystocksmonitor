import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Dialog from "./Dialog";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Messages from "../Common/Messages";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import { getprofile } from "../../Redux/Actions/Attendants";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

import {
  // getAdminprofile,
  updateAdminProfile,
} from "../../Redux/Actions/Attendants";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

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
  useEffect(() => {
    props.getprofile(reactLocalStorage.getObject("userdata").serialno);
  }, []);

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
    current_password: "",
    new_password: "",
    showPassword: false,
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
  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    if (
      password["current_password"] === "" ||
      password["new_password"] === ""
    ) {
      setPassworderror("both password must not be empty");
    } else {
      password.action = "password";
      props.updateAdminProfile(password);
    }
  };
  console.log("bb", props);

  return (
    <div className={classes.root}>
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
            <Dialog
              countries={countries}
              fullScreen
              open={open}
              setdcountry={setdcountry}
              handleClose={handleClose}
            />
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
        {props.profile.msg && (
          <Messages type="error" text={props.profile.msg} />
        )}
        <Loader fullPage loading={props.profile.loading} />
        <form onSubmit={updatePassword} autoComplete="off">
          <Grid>
            <Grid item xs={12}>
              <FormControl
                style={{ marginTop: 30 }}
                className={clsx(classes.margin, classes.inputs)}
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Current Password
                </InputLabel>
                <Input
                  id="current_password"
                  type={password.showPassword ? "text" : "password"}
                  onChange={changePassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {password.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                style={{ marginTop: 30 }}
                className={clsx(classes.margin, classes.inputs)}
              >
                <InputLabel htmlFor="standard-adornment-password">
                  New Password
                </InputLabel>
                <Input
                  id="new_password"
                  type={password.showPassword ? "text" : "password"}
                  onChange={changePassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {password.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>

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
    // getAdminprofile: (id) => dispatch(getAdminprofile(id)),
    updateAdminProfile: (data) => dispatch(updateAdminProfile(data)),
    getprofile: (id) => dispatch(getprofile(id)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Profile);
