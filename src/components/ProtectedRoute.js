import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Item from "./Item";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import { reactLocalStorage } from "reactjs-localstorage";
import StockSetup from "./Stocks/StockSetup";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import Api from "../api/api";
import Profile from "../components/Profile/Profile";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const drawerWidth = 360;

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
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
// import Main from "../components/Main";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const classes = useStyles();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getProfile = () => {
    Api.get(`/myprofile.php`, {
      params: {
        id: reactLocalStorage.getObject("userdata").serialno,
        action: "get",
      },
    })
      .then((res) => {
        console.log("profile", res.data);
      })
      .catch((error) => {});
  };

  // console.log("rest", props);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ marginBottom: 10 }}
      >
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar
            alt="Remy Sharp"
            className={classes.large}
            src="/static/images/avatar/1.jpg"
          />
        </StyledBadge>
        <h5>Freddy</h5>
      </Grid>
      <Divider />
      <List>
        {["My Profile", "Settings", "Logout"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              window.location = "/myprofile";
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  const initToolbar = (title) => {
    console.log("initToolbar", title);
    switch (title) {
      case "sales":
        return <Link to="/newsale">Add +</Link>;
        break;
      case "profitnexpenses":
        return (
          <Link
            style={{ fontSize: 12 }}
            className="btn btn-primary"
            to="/expenses"
          >
            Add Expenes +
          </Link>
        );
        break;
      default:
        break;
    }
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
              <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                  <Toolbar>
                    {props.history.location.pathname === "/dashboard" ? (
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                      >
                        <MenuIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => props.history.goBack()}
                        className={classes.menuButtonNormal}
                      >
                        <ArrowBackIosIcon />
                      </IconButton>
                    )}
                    {/* <Typography variant="h6" noWrap> */}
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Typography variant="h6" noWrap>
                          {rest.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Button className={classes.actionbtn} primary="sdsf">
                          {initToolbar(rest.settings)}
                        </Button>
                      </Grid>
                    </Grid>
                    {/* </Typography> */}
                  </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                  {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                  <Hidden smUp implementation="css">
                    <Drawer
                      container={container}
                      variant="temporary"
                      anchor={theme.direction === "rtl" ? "right" : "left"}
                      open={mobileOpen}
                      onClose={handleDrawerToggle}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                      }}
                    >
                      {drawer}
                    </Drawer>
                  </Hidden>
                  <Hidden xsDown implementation="css">
                    <Drawer
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      variant="permanent"
                      open
                    >
                      {drawer}
                    </Drawer>
                  </Hidden>
                </nav>
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Component title={rest.title} {...props} />
                </main>
              </div>
              // <Main>
              //   <Component title={rest.title} {...props} />
              // </Main>
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
