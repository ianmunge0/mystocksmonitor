import React, { useEffect, useState } from "react";
import { getAttendants, addAttendant } from "../../Redux/Actions/Attendants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { reactLocalStorage } from "reactjs-localstorage";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Api from "../../api/api";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Messages from "../Common/Messages";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabwrap"
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

function Attendants(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setLoading(true);
    Api.get(`/attendants.php`, {
      params: {
        action: "roles",
      },
    })
      .then((res) => {
        const roles = res.data;
        setRoles(roles);
        console.log("roles", roles);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });

    props.getAttendants();
  }, []);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attendant, setAttendant] = useState({
    attendant_name: "",
    attendant_password: "",
    showPassword: false,
  });

  const addAttendant = (e) => {
    e.preventDefault();
    setError("");
    if (role.length === 0) {
      setError("give this attendant a role");
      return;
    }
    if (
      attendant["attendant_name"] === "" ||
      attendant["attendant_password"] === ""
    ) {
      setError("username and password");
      return;
    }
    attendant.roles = role;
    attendant.shopid = reactLocalStorage.getObject("userdata").default_shop;
    console.log(attendant.roles);
    props.addAttendant(attendant, e.target);
  };

  const handleAttendantData = (e) => {
    setAttendant({
      ...attendant,
      [e.target.id]: e.target.value,
    });
    console.log(attendant);
  };

  const [role, setRole] = useState([]);

  const setCheckedRole = (v, e) => {
    if (e.target.checked) {
      setRole([...role, v]);
    }
    if (!e.target.checked) {
      var newrole = role.filter((t) => t !== v);
      setRole(newrole);
    }
  };
  const handleClickShowPassword = () => {
    setAttendant({ ...attendant, showPassword: !attendant.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={classes.root}>
      <Loader fullPage loading={props.attendants.loading} />
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="All Attendants" href="/trash" {...a11yProps(1)} />
          <LinkTab label="New Attendant" href="/drafts" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {props.attendants.attendants.length > 0 ? (
          props.attendants.attendants.map((value, index) => (
            <List className={classes.root} key={index}>
              <ListItem
                onClick={() => {
                  props.history.push({
                    pathname: `/attendantsprofile/${value.serialno}`,
                  });
                }}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    alt={value.username}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h5">{value.username}</Typography>
                  }
                  secondary={<Typography>ID: {value.attendant_id}</Typography>}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))
        ) : (
          <h5>No attendants yet</h5>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <form
          className="col s12"
          onSubmit={addAttendant}
          autoComplete="off"
          style={{ margin: 10 }}
        >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                className={classes.inputs}
                id="attendant_name"
                label="Username"
                onChange={handleAttendantData}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <FormControl className={clsx(classes.margin, classes.inputs)}>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="attendant_password"
                  type={attendant.showPassword ? "text" : "password"}
                  onChange={handleAttendantData}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {attendant.showPassword ? (
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
          <div className="col s12">
            <h5 style={{ marginTop: 30, marginBottom: 20 }}>Roles</h5>
            <Divider />
            <Grid container>
              {roles.map((value, key) => (
                <Grid item xs={4} key={key}>
                  <Checkbox
                    id={value.id}
                    name={value.name}
                    defaultChecked={value.checked}
                    onChange={(e) => setCheckedRole(value.id, e)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />

                  <span>{value.name.split("_").join(" ").toUpperCase()}</span>
                </Grid>
              ))}
            </Grid>
          </div>
          {/* <div style={{ marginTop: 10, marginBottom: 10 }}>
            <div style={{ marginTop: 10, marginBottom: 10 }}>Select A Role</div>
            {roles.map((value, key) => (
              <label className="col s6" key={key}>
                <input
                  // onClick={(e) => handleAttendantRoles(e, value.name)}
                  id={value.id}
                  onChange={(e) => setCheckedRole(value.id, e)}
                  name={value.name}
                  type="checkbox"
                  className="validate"
                />
                <span>{value.name.split("_").join(" ")}</span>
              </label>
            ))}
          </div> */}

          <div className="row">
            <Messages text={error} type="error" />
            <Messages text={error} type="error" />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20, padding: 15 }}
              className={classes.button}
              type="submit"
              endIcon={<Icon>send</Icon>}
            >
              Save
            </Button>
          </div>
        </form>
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  attendants: state.attendants,
  error: state.attendants.ddingerror,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getAttendants: (shopid) => dispatch(getAttendants(shopid)),
    addAttendant: (attendant, target) =>
      dispatch(addAttendant(attendant, target)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Attendants);
