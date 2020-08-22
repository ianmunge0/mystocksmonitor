import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import moment from "moment";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { Divider } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ImageIcon from "@material-ui/icons/Image";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import NoItems from "../../NoItems";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const d = new Date();
const ITEM_HEIGHT = 48;
const year = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => index + year);
function StockIn(props) {
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth();
  };
  useEffect(() => {}, []);

  console.log("fgf");
  const [all, setAll] = useState(false);

  const [stocks, setStocks] = useState([]);

  const classes = useStyles();

  const [item, setItem] = useState(null);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawerOne = (anchor, open, type) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    if (type === 1) {
      props.deleteProductStockIn(item.stockserial_key);
      // return <Alert severity="error">{item.name} deleted successfully</Alert>;
    }
    if (type === 0) {
      console.log("mem", item);
      props.history.push({
        pathname: `/editstock/${item.stockserial_key}`,
        state: {
          data: "updatestocksupplied",
        },
      });
    }
  };

  const toggleDrawer = (anchor, open, item) => (event) => {
    console.log(item);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setItem(item);
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, type) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      //   onClick={toggleDrawerOne(anchor, false,type)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Edit", "Delete"].map((text, index) => (
          <ListItem
            onClick={toggleDrawerOne(anchor, false, index)}
            button
            key={text}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  console.log("stockin", props.stocks);
  // return <></>;
  return (
    <>
      {props.stocks.productstockin ? (
        props.stocks.productstockin.map((row, index) => {
          return (
            <List
              className={classes.root}
              key={index}
              // onClick={toggleDrawer("bottom", true, row)}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "green" }}>
                    <DoneAllIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={<Typography>{row.date_time}</Typography>}
                  secondary={
                    // <Typography>{row.name}</Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {row.name}
                      <br />
                      {"Qty: " + `${row.quantitysupplied}`}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
            </List>
          );
        })
      ) : (
        <NoItems text="No stock available" />
      )}
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>
    </>
  );
}

// const mapStateToProps = (state) => ({
//   stocks: state.sales,
//   waiting: state.stock,
// });

export default withRouter(StockIn); //connect(mapStateToProps)(withRouter(StockIn));
