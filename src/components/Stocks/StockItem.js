import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { deleteStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { Divider, Grid } from "@material-ui/core";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

function StockItem(props, key) {
  const classes = useStyles();
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [item, setItem] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => {
    setOpen(false);
    console.log("action", action);
    if (action === "delete") {
      props.deleteStock(item.stockid);
    }
  };

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
    if (type === 2) {
      handleClickOpen();
      //   props.deleteStock(item.stockid);
      // return <Alert severity="error">{item.name} deleted successfully</Alert>;
    }
    // console.log(item);
    if (type === 0) {
      props.history.push({
        pathname: `/productsummary/${item.shopserial_key}`,
        state: {
          data: item,
        },
      });
    }
    if (type === 1) {
      props.history.push({
        pathname: `/editstock/${item.stockid}`,
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
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Product History", "Edit", "Delete"].map((text, index) => (
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

  return (
    <div>
      <List
        className={classes.root}
        key={key}
        onClick={toggleDrawer("bottom", true, row)}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {parseInt(row.stock_qty) <= parseInt(row.reorder_level) ? (
              <Avatar style={{ backgroundColor: "#ff9800" }}>
                <ReportProblemIcon />
              </Avatar>
            ) : (
              <Avatar style={{ backgroundColor: "green" }}>
                <DoneAllIcon />
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={
              <Grid container>
                <Grid item xs={6}>
                  {row.name}
                </Grid>
                <Grid item xs={6}>
                  {row.partno && (
                    <Typography style={{ fontSize: 12 }}>
                      ~ Part No. {row.partno}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {"Qty: " +
                    `${row.stock_qty} ${
                      row.unit_data ? row.unit_data.unit_name : ""
                    }`}
                  {row.supplier_data
                    ? " | Supplier: " + `${row.supplier_data.supplier_name}`
                    : ""}
                  <br />
                </Typography>
                {"Buying Price: " + `${row.buyingprice}`} |{" "}
                {"Selling Price: " + `${row.sellingprice}`}
              </>
            }
          />
        </ListItem>
        <Divider />
      </List>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => handleClose("close")} color="primary">
            Not Yet
          </Button>
          <Button onClick={() => handleClose("delete")} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>
    </div>
  );
}
const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
  waiting: state.stock,
});
const mapDispacthToProps = (dispatch) => {
  return {
    deleteStock: (id) => dispatch(deleteStock(id)),
    dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(StockItem));
