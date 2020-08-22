import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { addSales, saveSales } from "../../Redux/Actions/Sales";
import { connect } from "react-redux";
import SalesDialog from "../CashSales/SalesDialog";
import Grid from "@material-ui/core/Grid";
import { Button, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Customers from "./Customers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function NewCashSale(props) {
  useEffect(() => {}, []);
  console.log(props.sales);

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [type, setType] = useState("cash");

  const changePrice = (item, e) => {
    console.log(item, e.target.value);
    setError("");
    if (parseInt(e.target.value) < item.sellingprice) {
      item.salessellingprice = item.sellingprice;
      setError(item.name + " cant be sold less than " + item.sellingprice);
    } else {
      item.salessellingprice = e.target.value;
    }
    props.dispatch({ type: "CHANGE_PRICE", sales: item });
    // props.addSales(item, props);
  };

  const addQty = (item) => {
    props.dispatch({ type: "CHANGE_QTY", sales: item });
  };

  const changeQty = (item, e) => {
    console.log(item, e.target.value);
    item.quantity = e.target.value;
    props.dispatch({ type: "CHANGE_QTY", sales: item });
  };

  const changeType = (item, e) => {
    console.log(e.target.id);
    item.type = e.target.id;
    props.dispatch({ type: "CHANGE_TYPE", sales: item });
    setType(e.target.id);
    if (e.target.id === "credit" && customer.name === "") {
      handleClickOpenCustomer();
    }
  };

  const saveSales = () => {
    // props.sales.sales.customer = customer;
    console.log(customer);
    props.saveSales(props.sales.sales, customer);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [opencustomer, setOpenCustomer] = React.useState(false);

  const handleClickOpenCustomer = () => {
    console.log("vv");
    setOpenCustomer(true);
  };

  const handleCloseCustomer = () => {
    setOpenCustomer(false);
  };
  const [customer, setCustomer] = useState({
    name: "",
  });

  const getCustomer = (name) => {
    setCustomer(name);
  };

  console.log("all items", props.sales);
  const classes = useStyles();

  return (
    <div className="cashsalewarp">
      <SalesDialog fullScreen open={open} handleClose={handleClose} />
      <span className="red-text"> {error}</span>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Add +
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={saveSales}
              disabled={props.sales.sales.length > 0 ? false : true}
            >
              Save
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3} align="center">
            Total:
            <br />
            {props.sales.total}
          </Grid>
          <Grid item xs={3} align="center">
            Items: <br />
            {props.sales.sales.length}
          </Grid>
          <Grid item xs={3} align="center">
            Credit: <br />
            {props.sales.credit}
          </Grid>
          <Grid item xs={3} align="center">
            Cash: <br />
            {props.sales.cash}
          </Grid>
        </Grid>
      </div>
      {customer.name ? (
        <Grid
          style={{
            marginLeft: 10,
            marginRight: 10,
          }}
          container
        >
          <Grid item xs={6}>
            <Typography
              style={{
                color: "blue",
                fontSize: 12,
                padding: 5,
              }}
              onClick={() => {
                handleClickOpenCustomer();
              }}
            >
              Customer: {customer.name}
            </Typography>
          </Grid>
          <Grid item xs={6} align="center">
            <CancelIcon
              onClick={() => {
                setCustomer({ name: "" });
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid
          style={{
            marginLeft: 10,
            marginRight: 10,
            color: "blue",
            fontSize: 12,
            padding: 5,
          }}
          onClick={() => {
            handleClickOpenCustomer();
          }}
        >
          + Add Customer
        </Grid>
      )}

      {props.sales.sales
        ? props.sales.sales.map((value, index) => (
            <Card className={classes.root} key={index}>
              <Typography variant="h6">{value.name}</Typography>
              <Divider />
              <Grid container xs={12} style={{ marginTop: 10 }}>
                <Grid container xs={12}>
                  <Grid item xs={6}>
                    Total Qty: {value.stock_qty}
                  </Grid>
                  <Grid item xs={6}>
                    Selling price:
                    {value.salessellingprice
                      ? value.salessellingprice
                      : value.sellingprice}
                  </Grid>
                </Grid>

                <Grid container xs={12} style={{ marginTop: 10 }}>
                  <Grid container xs={10} style={{ marginTop: 10 }}>
                    <Grid item align="center" xs={3}>
                      <Link
                        to="#"
                        className="col s3 item-custom"
                        onClick={() =>
                          props.dispatch({
                            type: "REMOVE_QTY",
                            sales: value,
                          })
                        }
                        style={{ margin: 0 }}
                      >
                        <RemoveCircleIcon />
                      </Link>
                    </Grid>
                    <Grid align="center" item xs={3}>
                      <TextField
                        placeholder="0"
                        id="outlined-basic"
                        label="New Qty"
                        variant="outlined"
                        value={value.quantity}
                        onChange={(e) => {
                          changeQty(value, e);
                        }}
                      />
                    </Grid>

                    <Grid align="center" item xs={3}>
                      <Link
                        to="#"
                        onClick={() =>
                          props.dispatch({
                            type: "ADD_QTY",
                            sales: value,
                          })
                        }
                        className="col s3 item-custom"
                        style={{ margin: 0 }}
                      >
                        <AddCircleIcon />
                      </Link>
                    </Grid>
                    <Grid align="center" item xs={3}>
                      <TextField
                        placeholder="0"
                        className="salesinput"
                        variant="outlined"
                        defaultValue={
                          value.salessellingprice
                            ? value.salessellingprice
                            : value.sellingprice
                        }
                        onChange={(e) => {
                          changePrice(value, e);
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container xs={2} style={{ marginTop: 10 }}>
                    <Typography align="center" style={{ width: "100%" }}>
                      <CancelIcon
                        onClick={() =>
                          props.dispatch({
                            type: "REMOVE_ITEM",
                            sales: value,
                          })
                        }
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container xs={12} style={{ marginTop: 10 }}>
                  <Grid align="center" item xs={4}>
                    <label>
                      <input
                        className="with-gap"
                        name={value.serialno}
                        value="credit"
                        id="credit"
                        onChange={(e) => changeType(value, e)}
                        type="radio"
                      />
                      <span>Credit</span>
                    </label>
                    <Customers
                      fullScreen
                      getCustomer={getCustomer}
                      open={opencustomer}
                      type={type}
                      handleClose={handleCloseCustomer}
                    />
                  </Grid>
                  <Grid align="center" item xs={4}>
                    <label>
                      <input
                        className="with-gap"
                        onChange={(e) => changeType(value, e)}
                        name={value.serialno}
                        defaultChecked
                        value="cash"
                        id="cash"
                        type="radio"
                      />
                      <span>Cash</span>
                    </label>
                  </Grid>
                  <Grid align="center" item xs={4}>
                    <span className="right">{value.total}/=</span>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          ))
        : ""}
    </div>
  );
}
const mapStateToProps = (state) => ({
  sales: state.sales,
  stocks: state.stock.stocks,
  stockresponse: state.stock,
});
// const mapDispacthToProps = (dispatch) => {
//   return {
//     saveSales: (sales) => dispatch(saveSales(sales)),
//   };
// };

const mapDispacthToProps = (dispatch) => ({
  saveSales: (sales, customer) => dispatch(saveSales(sales, customer)),
  dispatch, // ← Add this
});

export default connect(mapStateToProps, mapDispacthToProps)(NewCashSale);
