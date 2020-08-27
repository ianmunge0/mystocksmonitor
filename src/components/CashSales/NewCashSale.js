import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { deleteSaleReceipt, saveSales } from "../../Redux/Actions/NewSales";
import { getSalesReceipts } from "../../Redux/Actions/SalesReceipts";
import { connect } from "react-redux";
import SalesDialog from "../CashSales/SalesDialog";
import Grid from "@material-ui/core/Grid";
import { Button, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Card from "@material-ui/core/Card";
import Customers from "./Customers";
import Messages from "../Common/Messages";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { grantPermission } from "../Common/GrantPermission";
import { reactLocalStorage } from "reactjs-localstorage";
import { UnlockAccess } from "../Common/UnlockAccess";
import NoItems from "../NoItems";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function NewCashSale(props) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [type, setType] = useState("cash");

  useEffect(() => {
    props.getSalesReceipts(
      new Date(),
      new Date(),
      reactLocalStorage.get("user_type")
    );
  }, []);
  function itemsList() {
    if (!props.todaysales.receipts.days) return <></>;
    return Object.keys(props.todaysales.receipts.days).map(function (
      value,
      key
    ) {
      return (
        <div key={key}>
          <div
            style={{
              fontSize: 16,
              padding: 5,
              fontWeight: "bold",
              backgroundColor: "#afa3a3",
            }}
          >
            <Typography variant={"h6"}>{value}</Typography>
            <Typography>
              Cash: {props.todaysales.receipts.totalcash} Credit:
              {props.todaysales.receipts.totalcredit}
            </Typography>
          </div>
          <ListItem alignItems="flex-start">
            <List style={{ width: "100%", paddingTop: 0 }}>
              {Object.keys(props.todaysales.receipts.days[value].receipts).map(
                function (itemdata, key) {
                  return (
                    <div key={key}>
                      <Grid container>
                        <Grid item xs={10}>
                          <ListItemText
                            primary={
                              <Typography style={{ fontWeight: "bold" }}>
                                Receipt No: #{itemdata}
                              </Typography>
                            }
                            onClick={() => {
                              props.history.push({
                                pathname: "/singlereceipt",
                                state: {
                                  data:
                                    props.todaysales.receipts.days[value]
                                      .receipts[itemdata],
                                  receiptno: itemdata,
                                  user:
                                    props.todaysales.receipts.days[value]
                                      .receipts[itemdata].user,
                                },
                              });
                            }}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  Items:{" "}
                                  {
                                    props.todaysales.receipts.days[value]
                                      .receipts[itemdata].items.length
                                  }
                                  , Total:{" "}
                                </Typography>
                                {
                                  props.todaysales.receipts.days[value]
                                    .receipts[itemdata].receipttotal
                                }
                                , On Cash:
                                {
                                  props.todaysales.receipts.days[value]
                                    .receipts[itemdata].receiptcashcount
                                }
                                , On Credit:
                                {
                                  props.todaysales.receipts.days[value]
                                    .receipts[itemdata].receiptcreditcount
                                }{" "}
                                <br />
                                by ~{" "}
                                {
                                  props.todaysales.receipts.days[value]
                                    .receipts[itemdata].user
                                }
                              </React.Fragment>
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <UnlockAccess request={["DELETE_SALES"]}>
                            <Grid item xs={6}>
                              <IconButton
                                style={{ padding: 0, float: "right" }}
                                onClick={() => {
                                  props.deleteSaleReceipt(itemdata, props);
                                }}
                                edge="end"
                                aria-label="delete"
                              >
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Grid>
                          </UnlockAccess>
                        </Grid>
                      </Grid>

                      <Divider />
                    </div>
                  );
                }
              )}
            </List>
          </ListItem>
        </div>
      );
    });
  }
  //start creating tabs
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        className="tabwrap"
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      "aria-controls": `nav-tabpanel-${index}`,
    };
  }

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //end of creating tabs code

  //STARTING COMPONENTS CODES
  const changePrice = (item, e) => {
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

  const changeQty = (item, e) => {
    setError("");
    if (e.target.value > item.stock_qty) {
      setError("you cant sell more than you have");
      return;
    }
    item.quantity = e.target.value;
    props.dispatch({ type: "CHANGE_QTY", sales: item });
  };

  const changeType = (item, e) => {
    item.type = e.target.id;
    props.dispatch({ type: "CHANGE_TYPE", sales: item });
    setType(e.target.id);
    if (e.target.id === "credit" && customer.name === "") {
      handleClickOpenCustomer();
    }
  };

  const saveSales = () => {
    setError("");

    //checking if there is credit sale and if the customer has been selected
    if (
      props.sales.sales.filter((value) => value.type === "credit").length > 0 &&
      customer.name === ""
    ) {
      setError("Credit sale must have a customer");
      return;
    }

    //check if the quantity is less or equal to 0
    if (props.sales.sales.filter((value) => value.quantity < 0).length > 0) {
      setError("one of your product has quantity 0 or empty");
      return;
    }

    // props.sales.sales.customer = customer;
    console.log(type);
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
    setType("cutomersale");
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
  //END COMPONENTS CODES

  return (
    <>
      <SalesDialog fullScreen open={open} handleClose={handleClose} />
      <Messages type="error" text={error} />
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="New Sales" href="/drafts" {...a11yProps(0)} />

          <LinkTab label="Today Sales" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
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
                          checked={type === "credit"}
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
                          checked={type === "cash"}
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Loader fullPage loading={props.todaysales.loading} />
        {itemsList().length > 0 ? itemsList() : <NoItems text="No sales yet" />}
      </TabPanel>
    </>
  );
}
const mapStateToProps = (state) => ({
  sales: state.sales,
  stocks: state.stock.stocks,
  todaysales: state.sales,
  stockresponse: state.stock,
});
// const mapDispacthToProps = (dispatch) => {
//   return {
//     saveSales: (sales) => dispatch(saveSales(sales)),
//   };
// };

const mapDispacthToProps = (dispatch) => ({
  saveSales: (sales, customer) => dispatch(saveSales(sales, customer)),
  deleteSaleReceipt: (receiptno, props) =>
    dispatch(deleteSaleReceipt(receiptno, props)),
  getSalesReceipts: (fromtime, totime, type) =>
    dispatch(getSalesReceipts(fromtime, totime, type)),
  dispatch, // ← Add this
});

export default connect(mapStateToProps, mapDispacthToProps)(NewCashSale);
