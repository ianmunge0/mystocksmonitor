import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { getprofile, updateProfile } from "../../Redux/Actions/Attendants";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Checkbox from "@material-ui/core/Checkbox";
import Badge from "@material-ui/core/Badge";
import Api from "../../api/api";
import Box from "@material-ui/core/Box";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import PropTypes from "prop-types";

function Attendantprofile(props) {
  useEffect(() => {
    props.dispatch({ type: "LOADING" });
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
  }));

  const [error, setError] = useState("");

  const updateProfile = (e) => {
    e.preventDefault();
    setError("");
    // console.log(attendant);
    attendantnew.id = attendant.attendantid;
    if (attendantnew.password !== "") {
      attendantnew.password = attendant.password;
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

  console.log(attendant);

  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={updateProfile}>
          <Loader fullPage loading={props.profile.loading} />
          <div className="col s12">
            <p className="red-text">{error}</p>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">account_circle</i>

            <input
              // type="text"
              id="username"
              placeholder="username"
              onChange={handleAttendantData}
              defaultValue={attendant.username}
              className="validate"
            />
          </div>

          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input
              onChange={handleAttendantData}
              id="password"
              type="password"
              className="validate"
            />
            <label htmlFor="password">password</label>
          </div>
          <div className="col s12">
            <h6 style={{ marginTop: 30, marginBottom: 20 }}>Roles</h6>
            <Divider />
            {role.map((value, key) => (
              <label className="col s6" key={key}>
                <Checkbox
                  id={value.id}
                  name={value.name}
                  defaultChecked={value.checked}
                  // onChange={handleRoleData}
                  onChange={(e) => setCheckedRole(value.id, e)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />

                <span>{value.name.split("_").join(" ").toUpperCase()}</span>
              </label>
            ))}
          </div>

          <div className="col s12">
            <h6 style={{ marginTop: 30, marginBottom: 20 }}>Settings</h6>
            <Divider />
            <div className="switch">
              <label>
                <div className="row valign-wrapper">
                  <div className="col s8">
                    <h6>Sales notification </h6>
                  </div>
                  {props.profile.profile ? (
                    <div className="col s4">
                      <input
                        type="checkbox"
                        id="sales_notifications"
                        onChange={handleAttendantData}
                        defaultChecked={attendant.sales_notifications}
                      />
                      <span className="lever"></span>
                    </div>
                  ) : (
                    <div className="col s4">
                      <input type="checkbox" />
                      <span className="lever"></span>
                    </div>
                  )}
                </div>
              </label>
            </div>
            <div className="switch">
              <label>
                <div className="row valign-wrapper">
                  <div className="col s8">
                    <h6>Block fred </h6>
                  </div>
                  <div className="col s4">
                    {props.profile.profile ? (
                      <input
                        defaultChecked={attendant.blocked}
                        onChange={handleAttendantData}
                        id="blocked"
                        type="checkbox"
                      />
                    ) : (
                      ""
                      // <input defaultChecked={false} type="checkbox" />
                    )}
                    <span className="lever"></span>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className="input-field col s12 center">
            <button className="btn btn-primary col s12">
              <i className="material-icons left ">save</i>Update
            </button>
          </div>
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
