import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";

import { Route, Redirect } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { withRouter } from "react-router-dom";
import Api from "../api/api";
import AppBarComponent from "../components/Navigations/AppBarComponent";
import auth from "./auth";
import { grantPermission } from "./Common/GrantPermission";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  actionbtn: {
    float: "right",
    fontSize: 10,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  menuButtonNormal: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    backgroundColor: "#3f51b5",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
// import Main from "../components/Main";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  // const classes = useStyles();
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (action, props) => {
    setOpen(false);

    props.history.goBack();
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        const { window } = props;
        const container =
          window !== undefined ? () => window().document.body : undefined;
        if (auth.isAuthenticated()) {
          if (reactLocalStorage.getObject("shops").length === 0) {
            return (
              <Redirect
                to={{
                  pathname: "/initialshopspage",
                  state: {
                    from: props.location,
                    title: rest.title,
                  },
                }}
              />
            );
          } else {
            return (
              <>
                {grantPermission(roles) && (
                  <div className={classes.root}>
                    <CssBaseline />
                    <AppBarComponent
                      data={props}
                      title={rest.title}
                      backlink={rest.backlink}
                      settings={rest.settings}
                    />

                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Component title={rest.title} {...props} />
                    </main>
                  </div>
                )}

                {!grantPermission(roles) && props.history.goBack()}
              </>
            );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
