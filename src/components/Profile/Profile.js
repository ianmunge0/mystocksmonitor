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
}));

function Profile(props) {
  useEffect(() => {
    // console.log("n", props.profile);
    // setCountry(props.profile.profile.countries);

    getAdminprofile();
  }, []);

  const getAdminprofile = () => {
    Api.get(`/myprofile.php`, {
      params: {
        id: reactLocalStorage.getObject("userdata").serialno,
        action: "get",
      },
    })
      .then((res) => {
        const profile = res.data;
        console.log("admin getprofile actions ", profile);
        props.dispatch({
          type: "GET_PROFILE",
          loading: false,
          profile: profile,
        });

        setProfile(profile);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [error, setError] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [country, setCountry] = useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (typestring) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    setError("");

    console.log(profile);
    // if (profile["username"] === "") {
    //   setError("you have not changed anything");
    // } else {
    //   // profile.id = props.profile.profile.attendatid;
    //   profile.country = country.code;
    //   console.log(profile);
    //   props.updateAdminProfile(profile);
    // }
  };

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
    console.log("handleProfileData", profile);
  };
  if (!props.profile.profile) {
    return <Loader fullPage loading={props.profile.loading} />;
  }

  // setProfile(props.profile.profile);
  const setdcountry = (data) => {
    setCountry(data);
  };
  // const [country, setCountry] = useState({});

  console.log("country", props.profile.profile.profile.country);
  // console.log(props.profile.profile.username);
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
        <span className="red-text">{error}</span>

        <form onSubmit={updateProfile}>
          <div className="row">
            <TextField
              id="standard-select-currency-native"
              className="col s12 "
              value={
                country ? country.name : props.profile.profile.profile.country
              }
              // onChange={setCountry}
              helperText="Please select your country"
              onClick={() => handleClickOpen()}
            />
            <Dialog
              countries={props.profile.profile.countries}
              fullScreen
              open={open}
              setdcountry={setdcountry}
              handleClose={handleClose}
            />

            <TextField
              id="username"
              className="col s12 profileinputs"
              onChange={handleProfileData}
              defaultValue={props.profile.profile.profile.username}
              helperText="Username"
            />
            <TextField
              id="email"
              className="col s12 profileinputs"
              onChange={handleProfileData}
              defaultValue="Default Value"
              defaultValue={props.profile.profile.profile.emailaddress}
              helperText="Email"
            />
            <TextField
              id="phone"
              className="col s12 profileinputs"
              defaultValue={props.profile.profile.profile.phoneno}
              onChange={handleProfileData}
              helperText="Phone number"
            />
            <div>
              <button style={{ marginTop: 30 }} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import M from "materialize-css/dist/js/materialize.min.js";
// import NavBar from "../../components/Navigations/NavBar";
// import { getprofile, updateProfile } from "../../Redux/Actions/Attendants";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { Loader } from "react-overlay-loader";
// import "react-overlay-loader/styles.css";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import NativeSelect from "@material-ui/core/NativeSelect";
// import InputBase from "@material-ui/core/InputBase";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// const countries = [
//   {
//     value: "USD",
//     label: "$",
//   },
//   {
//     value: "EUR",
//     label: "€",
//   },
//   {
//     value: "BTC",
//     label: "฿",
//   },
//   {
//     value: "JPY",
//     label: "¥",
//   },
// ];
// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//     input: {
//       border: "none",
//     },
//   },
// }));

// function Profile(props) {
//   const classes = useStyles();
//   const [age, setAge] = React.useState("");
//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };
//   useEffect(() => {
//     M.Tabs.init(document.querySelector(".tabs"), {
//       swipeable: true,
//     });

//     document.addEventListener("DOMContentLoaded", function () {
//       M.FormSelect.init(document.querySelectorAll("select"), {});
//     });
//     props.getprofile(props.match.params.id);
//   }, []);

//   const [error, setError] = useState("");

//   const updateProfile = (e) => {
//     e.preventDefault();
//     setError("");
//     console.log(attendant);

//     if (attendant["password"] === "" && attendant["username"] === "") {
//       setError("you have not changed anything");
//     } else {
//       attendant.id = props.profile.profile.attendatid;
//       props.updateProfile(attendant);
//     }
//   };

//   const [attendant, setAttendant] = useState({
//     username: "",
//     password: "",
//   });
//   const handleAttendantData = (e) => {
//     setAttendant({
//       ...attendant,
//       [e.target.id]: e.target.value,
//     });
//     console.log(attendant);
//   };

//   const [country, setCountry] = React.useState("EUR");

//   const countryChange = (event) => {
//     setCountry(event.target.value);
//   };

//   // console.log(props.profile.profile);

//   return (
//     <div className="row">
//       <div className="col s12 m12">
//         <div className="card">
//           <div className="card-tabs">
//             <ul className="tabs tabs-fixed-width">
//               <li className="tab">
//                 <a href="#test4">Profile</a>
//               </li>
//               <li className="tab">
//                 <a href="#test6">Settings</a>
//               </li>
//             </ul>
//           </div>
//           <div className="card-content grey lighten-4">
//             <div id="test4">
//               <div className="container">
//                 <div className="row">
//                   <form onSubmit={updateProfile} className={classes.root}>
//                     <div className="row">
//                       <div className="col s12">
//                         <p className="red-text">{error}</p>
//                       </div>

//                       <TextField
//                         id="standard-select-currency-native"
//                         select
//                         className="col s12 "
//                         value={country}
//                         onChange={countryChange}
//                         helperText="Please select your currency"
//                       >
//                         {countries.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </TextField>
//                       <TextField
//                         id="standard-select-currency-native"
//                         className="col s12 profileinputs"
//                         onChange={handleChange}
//                         defaultValue={
//                           props.profile.profile
//                             ? props.profile.profile.username
//                             : ""
//                         }
//                         helperText="Username"
//                       />
//                       <TextField
//                         id="standard-select-currency-native"
//                         className="col s12 profileinputs"
//                         onChange={handleChange}
//                         helperText="Email"
//                       />
//                       <TextField
//                         id="standard-select-currency-native"
//                         className="col s12 profileinputs"
//                         onChange={handleChange}
//                         helperText="Phone number"
//                       />
//                       {/* <div className="input-field col s12">
//                         <input
//                           id="username"
//                           type="text"
//                           placeholder="username"
//                           onChange={handleAttendantData}
//                           defaultValue={
//                             props.profile.profile
//                               ? props.profile.profile.username
//                               : ""
//                           }
//                           className="validate"
//                         />
//                       </div> */}

//                       {/* <div className="input-field col s12">
//                         <i className="material-icons prefix">lock</i>
//                         <input
//                           onChange={handleAttendantData}
//                           id="password"
//                           type="text"
//                           className="validate"
//                         />
//                         <label htmlFor="password">password</label>
//                       </div> */}
//                     </div>
//                     <div className="row">
//                       <div className="input-field col s12 center">
//                         <button className="btn btn-primary">
//                           <i className="material-icons left ">save</i>Update
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <div id="test6">
//               <form className="col s12">
//                 <div className="input-field col s12">
//                   <i className="material-icons prefix">lock</i>
//                   <input
//                     onChange={handleAttendantData}
//                     id="password"
//                     type="text"
//                     className="validate"
//                   />
//                   <label htmlFor="password">new password</label>
//                 </div>
//                 <div className="input-field col s12">
//                   <i className="material-icons prefix">lock</i>
//                   <input
//                     onChange={handleAttendantData}
//                     id="oldpassword"
//                     type="text"
//                     className="validate"
//                   />
//                   <label htmlFor="oldpassword">old password</label>
//                 </div>
//                 {/* <h6>Roles</h6> */}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
