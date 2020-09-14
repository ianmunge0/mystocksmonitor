import React, { useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { addSales } from "../../Redux/Actions/NewSales";
import { addStockIn } from "../../Redux/Actions/StockIn";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Slide from "@material-ui/core/Slide";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function SalesDialog(props) {
  const classes = useStyles();

  console.log(props.type);

  const additemOnsaleList = (item) => {
    console.log("additemOnsaleList ", props.type);
    if (props.type === "stockin") {
      props.addStockIn(item, props);
    } else if (props.type === "badstock") {
      props.addbadstock(item, props);
    } else {
      props.addSales(item, props);
    }
  };

  const handleSearch = (e) => {
    console.log("search", e.target.value);
    props.dispatch({
      type: "GET_STOCK_FILTER",
      payload: {
        text: e.target.value,
      },
    });
    // props.searchCustomer(e.target.value);
  };

  console.log(props.stockresponse);

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      {/* <Loader fullPage loading={props.stockresponse.loading} /> */}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Grid container>
            <Grid item xs={6} display={{ xs: "none", xl: "block" }}>
              <Typography variant="h6" className={classes.title}>
                Select a product
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  onChange={(e) => handleSearch(e)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <List>
        {props.stocks.length > 0
          ? props.stocks.map((value, index) => (
              <div key={index}>
                <ListItem
                  disabled={
                    props.type === "stockin"
                      ? false
                      : value.stock_qty > 0
                      ? false
                      : true
                  }
                  button
                  onClick={() => additemOnsaleList(value)}
                >
                  <ListItemText
                    primary={`${value.name} Qty: ${value.stock_qty}`}
                    secondary={
                      value.stock_qty > 0 ? (
                        ""
                      ) : (
                        <span className="red-text">Out of stock</span>
                      )
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ))
          : ""}
      </List>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  sales: state,
  stockresponse: state.stock,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addStockIn: (item, props) => dispatch(addStockIn(item, props)),
    addSales: (item, props) => dispatch(addSales(item, props)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(SalesDialog);
