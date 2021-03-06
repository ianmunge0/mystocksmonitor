import React, { useEffect, useState } from "react";
import { getprofile, updateProfile } from "../../Redux/Actions/Attendants";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Checkbox from "@material-ui/core/Checkbox";
import Api from "../../api/api";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
function Attendantprofile(props) {
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    props.dispatch({ type: "LOADING" });
    console.log("bb ", {
      id: props.match.params.id,
      action: "attendant_profile",
    });
    Api.get(`/attendants.php`, {
      params: {
        id: props.match.params.id,
        action: "attendant_profile",
      },
    })
      .then((res) => {
        const profile = res.data;
        setAttendant(profile);
        setRole(profile.roles);
        console.log("profile", profile);
        props.dispatch({
          type: "GET_PROFILE",
          profile,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        className="tabwrap"
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

  const classes = useStyles();

  const [error, setError] = useState("");

  const updateProfile = (e) => {
    e.preventDefault();
    setError("");
    // console.log(attendant);
    attendantnew.id = attendant.attendantid;
    if (attendantnew.password === "") {
      attendantnew.password = "";
    }
    console.log("saving", attendantnew.sales_notifications);
    if (attendantnew.sales_notifications !== "") {
      attendantnew.sales_notifications =
        attendantnew.sales_notifications === "on" ? "1" : "0";
    }
    if (attendantnew.blocked !== "") {
      attendantnew.blocked = attendantnew.blocked === "on" ? "1" : "0";
    }
    var newrole = role.filter((t) => t.checked === true);
    if (newrole.length > 0) {
      const reducedArray = newrole.reduce(
        (acc, curr) => `${acc}${curr.id},`,
        ""
      );
      attendantnew.role = reducedArray.replace(/,$/, "");
      // console.log(reducedArray.replace(/,$/, ""));
    }
    // if(role)
    props.updateProfile(attendantnew);
  };

  const [attendantnew, setNewAttendant] = useState({
    username: "",
    password: "",
    sales_notifications: "",
    blocked: "",
  });

  const [attendant, setAttendant] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [role, setRole] = useState([]);

  const setCheckedRole = (v, e) => {
    role.map((v, i) => {
      if (v.id === e.target.id && e.target.checked) {
        role[i].checked = true;
      }
      if (v.id === e.target.id && e.target.checked === false) {
        role[i].checked = false;
      }
    });
    setRole(role);
  };

  const handleAttendantData = (e) => {
    setNewAttendant({
      ...attendantnew,
      [e.target.id]: e.target.value,
    });
    console.log("handleAttendantData", attendantnew);
  };
  const handleClickShowPassword = () => {
    setAttendant({ ...attendant, showPassword: !attendant.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log(props);
  if (props.profile.loading) {
    return <Loader fullPage loading={props.profile.loading} />;
  }

  return (
    <div className="container">
      <div className="row">
        <form
          className="col s12"
          onSubmit={updateProfile}
          style={{ margin: 10 }}
        >
          <div className="col s12">
            <p className="red-text">{error}</p>
          </div>
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            <Grid item xs={12}>
              {console.log("nn", attendant.username)}
              <TextField
                className={classes.inputs}
                id="username"
                label="Username"
                onChange={handleAttendantData}
                defaultValue={attendant.username}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                className={clsx(classes.margin, classes.inputs)}
                variant="outlined"
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
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
                  labelWidth={70}
                />
              </FormControl>
            </Grid>
          </Grid>
          <div className="col s12">
            <h6 style={{ marginTop: 30, marginBottom: 20 }}>Roles</h6>
            <Divider />
            <Grid container>
              {/* {console.log("role", role)} */}
              {role.map((value, key) => (
                <Grid item xs={6} sm={6} md={6} key={key}>
                  <Checkbox
                    id={value.id}
                    name={value.name}
                    defaultChecked={value.checked}
                    disabled={value.id === "8" && true}
                    // onChange={handleRoleData}
                    onChange={(e) => setCheckedRole(value.id, e)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />

                  <span style={{ fontSize: 12 }}>
                    {value.name.split("_").join(" ").toUpperCase()}
                  </span>
                </Grid>
              ))}
            </Grid>
          </div>
          <h6 style={{ marginTop: 30, marginBottom: 20 }}>Settings</h6>
          <Divider />
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography variant="h6">Sales notification </Typography>
            </Grid>
            <Grid item xs>
              <input
                type="checkbox"
                id="sales_notifications"
                onChange={handleAttendantData}
                defaultChecked={attendant.sales_notifications}
              />{" "}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography variant="h6">Block</Typography>
            </Grid>
            <Grid item xs>
              <input
                type="checkbox"
                id="blocked"
                onChange={handleAttendantData}
                defaultChecked={attendant.blocked}
              />{" "}
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
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  profile: state.attendants,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getprofile: (id) => dispatch(getprofile(id)),
    updateProfile: (data) => dispatch(updateProfile(data)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Attendantprofile);
