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

import { connect } from "react-redux";
import { login } from "../../Redux/Actions";
import auth from "../auth";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { useSelector } from "react-redux";
import NormalAppBar from "../Navigations/NormalAppBar";
import Messages from "../Common/Messages";

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
}));
function Login(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const loggedin = useSelector((state) => state);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputs;

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

  if (auth.isAuthenticated()) {
    props.history.push("/dashboard");
  }
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

          <Loader fullPage loading={loggedin.login.loading} />
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
            label="username or email"
            autoFocus
          />
          <TextField
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"/reset"} variant="body2" className={classes.links}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={`/register`} variant="body2" className={classes.links}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
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
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Login);
