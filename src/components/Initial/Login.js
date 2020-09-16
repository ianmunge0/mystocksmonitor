import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { connect } from "react-redux";
import { login } from "../../Redux/Actions";
import auth from "../auth";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { useSelector } from "react-redux";
import NormalAppBar from "../Navigations/NormalAppBar";
import Messages from "../Common/Messages";
import OutlinedInput from "@material-ui/core/OutlinedInput";

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
    padding: 15,
  },
  links: {
    textDecoration: "none",
    fontSize: 14,
  },
  inputs: {
    width: "100%",
    float: "left",
    marginTop: 20,
  },
}));
function Login(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const loggedin = useSelector((state) => state);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const { username, password } = inputs;

  const handleClickShowPassword = () => {
    setInputs({ ...inputs, showPassword: !inputs.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (username && password) {
      // console.log({ username, password });
      props.login(username, password, props.match.params.type);
    } else {
      setError("you must enter username and password");
    }
  };

  if (props.loggedin) {
    auth.login(() => {
      props.history.push("/dashboard");
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <NormalAppBar backlink="/" title="Login" />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in as an{" "}
          {props.match.params.type === "admin" ? "Admin" : "Attendant"}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Messages type="error" text={error} />
          <Messages
            type="error"
            text={
              props.userdata.message ? props.userdata.message : props.message
            }
          />

          <Loader fullPage loading={loggedin.login.loginloading} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange}
            className={classes.customfieldinput}
            value={username}
            fullWidth
            id="username"
            name="username"
            label={
              props.match.params.type === "admin" ? "email" : "Attendant ID"
            }
            autoFocus
          />
          <FormControl
            className={clsx(classes.margin, classes.inputs)}
            variant="outlined"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              className={classes.customfieldinput}
              type={inputs.showPassword ? "text" : "password"}
              value={inputs.password}
              name="password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {inputs.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {props.match.params.type === "admin" ? (
            <>
              <Grid container>
                <Grid item xs={12}>
                  <Link to={"/reset"} variant="body2" className={classes.links}>
                    Forgot password
                  </Link>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 30 }}>
                  <Link
                    to={`/register`}
                    variant="body2"
                    className={classes.links}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            ""
          )}
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
    login: (username, password, type) =>
      dispatch(login(username, password, type)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Login);
