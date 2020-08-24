import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { getReport } from "../Redux/Actions/Reports";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import NoItems from "./NoItems";

const d = new Date();
const options = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));
function StockFilter(props) {
  const classes = useStyles();
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  var month = options[d.getMonth()];
  const input = getMonth(month) + "-" + d.getFullYear();
  const output = moment(input, "MM-YY");

  // const [cash, setCash] = useState(0);
  var fromtimeStamp = props.location.state.fromdate;
  var totimestamp = props.location.state.todate;
  if (props.location.state === "today") {
    fromtimeStamp = new Date();
    totimestamp = new Date();
  }

  if (props.location.state === "month") {
    fromtimeStamp = moment(output.startOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    totimestamp = moment(output.endOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
  }

  useEffect(() => {
    // console.log(fromtimeStamp, totimestamp);
    props.getReport(fromtimeStamp, totimestamp);
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [item, setItem] = useState(null);
  const toggleDrawerOne = (anchor, open, type) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });

    if (type === 0) {
      props.history.push({
        pathname: `/productsummary/${item.shopserial_key}`,
        state: {
          data: item,
        },
      });
    }
  };

  const toggleDrawer = (anchor, open, item) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setItem(item);
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Products History"].map((text, index) => (
          <ListItem
            button
            onClick={toggleDrawerOne(anchor, false, index)}
            button
            key={text}
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

  var anchor = "bottom";

  var tifOptions = null;
  if (props.reports.stocks["items"]) {
    tifOptions = Object.keys(props.reports.stocks["items"]).map((key) => (
      <div key={key}>
        <Typography
          variant="h6"
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          {key}
        </Typography>
        {props.reports.stocks["items"][key].length > 0
          ? props.reports.stocks["items"][key].map((value, index) => (
              <List className={classes.root} key={index}>
                <ListItem onClick={toggleDrawer("bottom", true, value)}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${value.name}` + " ~(" + `${value.status}` + ")"}
                    secondary={
                      "qty: " +
                      `${value.stock_qty}` +
                      " x " +
                      `${value.buyingprice}` +
                      " = " +
                      `${value.stock_qty}` * `${value.buyingprice}` +
                      "/= "
                    }
                  />
                </ListItem>
                <Divider />
              </List>
            ))
          : "no stocks yet"}
      </div>
    ));
  } else {
    return (
      <>
        <NoItems text="No Stocks Added Yet" />
        <Loader fullPage loading={props.reports.loading} />
      </>
    );
  }

  // return <>{tifOptions}</>;
  return (
    <div>
      {/* <NavBar titleone="Stock in Report  " titletwo={fromdateString} /> */}

      {props.reports.stocks["items"] ? (
        <>
          <div style={{ padding: 10 }}>
            <TextField
              variant="outlined"
              fullWidth
              type="search"
              placeholder="quick search"
            />
          </div>
          <Grid container style={{ marginTop: 20, marginBotton: 10 }}>
            <Grid item xs>
              <Typography align="center" variant="h6">
                Entries
              </Typography>
              <Typography align="center" variant="h6">
                {props.reports.stocks.count}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography align="center" variant="h6">
                On Credit
              </Typography>
              <Typography align="center" variant="h6">
                {props.reports.stocks.credit}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography align="center" variant="h6">
                On cash
              </Typography>
              <Typography align="center" variant="h6">
                {props.reports.stocks.cash}
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h5" style={{ margin: 30 }}>
          No Stocks
        </Typography>
      )}
      {/* <List className={classes.root}> */}
      {tifOptions}
      {/* {props.reports.stocks
          ? props.reports.stocks["items"].map((value, index) => (
              <div key={index}>
                <ListItem onClick={toggleDrawer("bottom", true)}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${value.name}` + " ~(" + `${value.status}` + ")"}
                    secondary={
                      "qty: " +
                      `${value.stock_qty}` +
                      " x " +
                      `${value.buyingprice}` +
                      " = " +
                      `${value.stock_qty}` * `${value.buyingprice}` +
                      "/= "
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ))
          : ""} */}
      {/* </List> */}
      <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
const mapStateToProps = (state) => ({
  reports: state.reports,
});
const mapDispacthToProps = (dispatch) => {
  return {
    getReport: (timeStamp, totimestamp) =>
      dispatch(getReport(timeStamp, totimestamp)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(StockFilter));
