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
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { reactLocalStorage } from "reactjs-localstorage";
import auth from "../auth";
const drawerWidth = 240;

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

function AppBarComponent(props) {
  const classes = useStyles();
  //   render() {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        <h5>{reactLocalStorage.getObject("userdata").username}</h5>
      </Grid>
      <Divider />
      <List>
        {["Edit Profile", "Logout"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              if (text === "Logout") {
                auth.logout(() => {
                  props.history.push({ pathname: "/login/admin" });
                  handleDrawerToggle();
                });
              } else {
                props.history.push({ pathname: "/myprofile" });
                handleDrawerToggle();
                // window.location = "/myprofile";
              }
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
            className="btn btn-primary col s12"
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

  const { window } = props;

  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {props.title === "Dashboard" ? (
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
                  {initToolbar(props.settings)}
                </Button>
              </Grid>
            ) : (
              ""
            )}
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
    </div>
  );
  //   }
}

export default withRouter(AppBarComponent);
