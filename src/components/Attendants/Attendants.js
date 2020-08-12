import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
            <List
              className={classes.root}
              key={index}
              onClick={() => {
                props.history.push({
                  pathname: `/attendantsprofile/${value.serialno}`,
                });
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={value.username}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={value.username}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Roles:{" "}
                        {value.roles.map((v, i) => (
                          <span key={i}>{v.name.split("_").join(" ")}</span>
                        ))}
                      </Typography>
                      {/* {value.roles} */}
                    </React.Fragment>
                  }
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
        <form className="col s12" onSubmit={addAttendant} autoComplete="off">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                onChange={handleAttendantData}
                id="attendant_name"
                type="text"
                className="validate"
              />
              <label htmlFor="attendant_name">username</label>
            </div>
          </div>
          <div className="row" style={{ margin: "0 auto" }}>
            <label className=" col s10">Select A Role</label>
            <div className="input-field col s10">
              <div className="row">
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
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input
                onChange={handleAttendantData}
                id="attendant_password"
                type="text"
                className="validate"
              />
              <label htmlFor="attendant_password">password</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <span className="red-text">{error}</span>
            </div>
            <p className="red-text" style={{ marginLeft: 20 }}>
              {props.attendants.addingerror}
            </p>
            <div className="input-field col s12 center">
              <button className="btn btn-primary">
                <i className="material-icons left ">save</i>Save
              </button>
            </div>
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
