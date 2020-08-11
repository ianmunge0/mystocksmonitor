import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { login, reset } from "../../Redux/Actions";
import { reactLocalStorage } from "reactjs-localstorage";
import auth from "../auth";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { useSelector } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import AppBarComponent from "../../components/Navigations/AppBarComponent";
import Api from "../../api/api";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Reset(props) {
  const classes = useStyles();

  useEffect(() => {}, []);

  const [error, setError] = useState("");
  const loggedin = useSelector((state) => state);
  const [passwordreset, setPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    newpassword: "",
    confirmedpassword: "",
    otp: "",
  });
  const { email, otp, newpassword, confirmedpassword } = inputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const resetPassword = (event) => {
    event.preventDefault();
    setLoading(true);
    var params = {};
    setError("");
    console.log(reactLocalStorage.getObject("user_reset_data").otp);
    if (reactLocalStorage.getObject("user_reset_data").otp) {
      setLoading(false);
      params.action = "update";
      if (reactLocalStorage.getObject("user_reset_data").otp !== otp) {
        setError("otp must be the valid");
        return;
      }

      console.log(newpassword, confirmedpassword);

      if (newpassword === "" || newpassword !== confirmedpassword) {
        setError("passord must be the same");
        return;
      }

      params.otp = reactLocalStorage.getObject("user_reset_data").otp;
      params.emailorphonekey = reactLocalStorage.getObject(
        "user_reset_data"
      ).email;
      params.password = newpassword;
    } else {
      params.action = "reset";
      params.emailorphonekey = email;
    }

    console.log(params);
    if (params.action === "reset" && email === "") {
      setError("you must enter email to send otp to");
    }
    if (error) {
      return;
    }
    // if (params.action === "reset" && email ==="") {
    Api.get(`/reset.php`, {
      params: params,
    })
      .then((res) => {
        console.log("reset response", res.data);
        setLoading(false);
        const userdata = res.data;
        if (params.action === "update") {
          props.history.push({ pathname: "/login/admin" });
          reactLocalStorage.remove("user_reset_data");
        } else {
          reactLocalStorage.setObject("user_reset_data", userdata);
          setPasswordReset(true);
        }
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
    // } else {
    //   setError("you must enter username and password");
    // }
  };

  console.log("lohin", props.userdata.status);

  return (
    <Container component="main" maxWidth="xs">
      <AppBarComponent title="Reset Password" />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={resetPassword}
          autoComplete="off"
        >
          <span className="red-text">{error}</span>
          <span className="red-text">{props.message}</span>

          <Loader fullPage loading={loading} />

          {passwordreset ||
          reactLocalStorage.getObject("user_reset_data").otp ? (
            <>
              {" "}
              <TextField
                variant="outlined"
                margin="normal"
                required
                onChange={handleChange}
                value={otp}
                className="profileinputs"
                fullWidth
                id="otp"
                name="otp"
                label="enter otp sent to your email or phone"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                onChange={handleChange}
                value={newpassword}
                className="profileinputs"
                fullWidth
                id="newpassword"
                placeholder="enter new password"
                name="newpassword"
                label="newpassword"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                onChange={handleChange}
                value={confirmedpassword}
                className="profileinputs"
                fullWidth
                id="confirmedpassword"
                placeholder="enter password again"
                name="confirmedpassword"
                label="confirmedpassword"
                autoFocus
              />
            </>
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={handleChange}
              value={email}
              className="profileinputs"
              fullWidth
              id="email"
              name="email"
              label="email"
              autoFocus
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  userdata: state.login.userdata,
  message: state.login.message,
  login: state,
  loggedin: state.login.loggedin,
});

const mapDispacthToProps = (dispatch) => {
  return {
    reset: (email) => dispatch(reset(email)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Reset);
