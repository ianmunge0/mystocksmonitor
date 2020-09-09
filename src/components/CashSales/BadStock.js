import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  getBadStocks,
  deleteBadStock,
  getStock,
  addBadStock,
} from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";

import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { Divider, Grid } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import NoItems from "../NoItems";
import SalesDialog from "./SalesDialog";
import TextField from "@material-ui/core/TextField";
import { reactLocalStorage } from "reactjs-localstorage";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Messages from "../Common/Messages";
import BadStockItem from "./BadStockItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

function BadStock(props) {
  const [open, setOpen] = React.useState(false);

  console.log("BadStock ", props);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => {
    setOpen(false);
    if (action === "delete") {
      props.deleteBadStock(item);
    }
  };

  useEffect(() => {
    props.getBadStocks(props.location.state);
    // setStocks(props.stock);
  }, []);

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
    if (type === 0) {
      handleClickOpen();
      // props.deleteBadStock(item.stockid);
      // return <Alert severity="error">{item.name} deleted successfully</Alert>;
    }
  };

  const toggleDrawer = (anchor, open, item) => (event) => {
    console.log("opening dd ", toggleDrawer);
    console.log(item);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log("item ", item);
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
        {["Delete"].map((text, index) => (
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

  const [openproducts, setOpenProducts] = useState(false);

  const handleClickOpenProducts = () => {
    props.getStock();
    setOpenProducts(true);
  };

  const handleCloseProducts = () => {
    setOpenProducts(false);
  };

  const addbadstock = (product) => {
    product.user_type = reactLocalStorage.get("user_type");
    product.shopid = reactLocalStorage.getObject("userdata").default_shop;
    product.stock_qty = product.new_stock_qty;
    product.attendantserial_key = reactLocalStorage.getObject(
      "userdata"
    ).serialno;
    // props.addBadStock(product);
    setProduct(product);
    console.log("setProduct func ", product);
    handleCloseProducts();
  };
  const [error, setError] = useState();

  const savebadStock = (event) => {
    event.preventDefault();
    setError("");
    console.log("gg ", product);
    if (!product.reason || product.reason === "") {
      setError("give a reason");
      return;
    }
    if (!product.stock_qty || product.stock_qty === "") {
      setError("how many quantities are bad?");
      return;
    }
    props.addBadStock(product, event);
    setProduct({ name: "" });
  };

  const [product, setProduct] = useState({
    name: "",
    stock_qty: "",
    reason: "",
  });

  const handleStockData = (e) => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
    console.log(product);
  };

  console.log("badstocks badstocks ", props.badstocks);

  return (
    <>
      <Loader fullPage loading={props.waiting.loading} />
      <form
        noValidate
        autoComplete="off"
        style={{ margin: 10 }}
        onSubmit={savebadStock}
      >
        <Messages type="error" text={error} />
        <Grid container style={{ margin: 10 }}>
          <Button
            onClick={handleClickOpenProducts}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Grid>
        {product.name != "" && (
          <Grid container>
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <FormControl className={classes.margin} fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">
                  Product Name
                </InputLabel>
                <Input
                  id="name"
                  value={product.name}
                  disabled
                  label="Product Name"
                  onChange={handleStockData}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <TextField
                id="stock_qty"
                onChange={handleStockData}
                value={product.stock_qty}
                fullWidth
                label="Qty "
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <TextField
                id="reason"
                value={product.reason}
                fullWidth
                label="Reason"
                onChange={handleStockData}
                variant="outlined"
              />
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: 10 }}
            >
              Save
            </Button>
          </Grid>
        )}
      </form>

      <SalesDialog
        type="badstock"
        fullScreen
        stocks={props.stocks}
        addbadstock={addbadstock}
        open={openproducts}
        handleClose={handleCloseProducts}
      />

      {props.badstocks.length > 0 ? (
        props.badstocks.map((row, index) => {
          return (
            <BadStockItem toggleDrawer={toggleDrawer} row={row} index={index} />
          );
        })
      ) : (
        <NoItems text="No Bad Stocks" />
      )}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  badstocks: state.stock.badstocks,
  stocks: state.stock.stocks,
  waiting: state.stock,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getBadStocks: (objectparam) => dispatch(getBadStocks(objectparam)),
    addBadStock: (objectparam, props) =>
      dispatch(addBadStock(objectparam, props)),
    deleteBadStock: (id) => dispatch(deleteBadStock(id)),
    getStock: () => dispatch(getStock()),
    dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(BadStock));
