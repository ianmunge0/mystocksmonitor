import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

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
function NormalAppBar(props) {
  const classes = useStyles();
  //   render() {
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {props.title === "Dashboard" ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={
                () => {
                  props.backlink
                    ? props.history.push({ pathname: `${props.backlink}` })
                    : props.history.goBack();
                }
                // props.history.push({ pathname: (`${props.backlink}` ? `${props.backlink}` : ) })
              }
              className={classes.menuButtonNormal}
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Grid container spacing={3}>
            <Grid item xs={props.settings ? 4 : 12}>
              <Typography variant="h6" style={{ marginTop: 10 }} noWrap>
                {props.title}
              </Typography>
            </Grid>
            {props.settings ? (
              <Grid item xs={8}>
                <Button className={classes.actionbtn} primary="sdsf">
                  {/* {initToolbar(props.settings)} */}
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
          {/* </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  );
  //   }
}

export default withRouter(NormalAppBar);
