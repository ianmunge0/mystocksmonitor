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
  console.log("index", reactLocalStorage.get("loggedin"));
  if (auth.isAuthenticated()) {
    if (reactLocalStorage.getObject("shops").length > 0) {
      props.history.push("/dashboard");
    } else {
      props.history.push("/initialshopspage");
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
        <div className="container center-align">
          <div className="row ">
            <div className="col s12">
              <Link
                to={`/login/attendant`}
                className="btn btn-primary"
                style={{ marginTop: 30, marginBottom: 30 }}
              >
                Attendant
              </Link>
            </div>
            <div className="col s12">
              <Link to={`/login/admin`}>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: 10, marginBottom: 30 }}
                >
                  Admin
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Initial;
