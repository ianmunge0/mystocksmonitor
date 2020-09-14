import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import auth from "../auth";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";

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
function Initial(props) {
  console.log("index", auth.isAuthenticated());
  if (auth.isAuthenticated()) {
    if (reactLocalStorage.getObject("user_type") === "attendant") {
      props.history.push("/user");
    } else {
      if (reactLocalStorage.getObject("shops").length == 0) {
        props.history.push("initialshopspage");
      } else {
        props.history.push("/dashboard");
      }
    }
  }
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Continue as:
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            style={{
              marginTop: 30,
              marginBottom: 30,
              padding: 20,
              width: "100%",
            }}
            onClick={() => {
              props.history.push({ pathname: `/login/attendant` });
            }}
          >
            Attendant
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            style={{
              marginTop: 30,
              marginBottom: 30,
              padding: 20,
              width: "100%",
            }}
            onClick={() => {
              props.history.push({ pathname: `/login/admin` });
            }}
          >
            Admin
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Initial;
