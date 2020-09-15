import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { deleteSaleReceipt, saveSales } from "../../Redux/Actions/NewSales";
import { getStock } from "../../Redux/Actions/Stock";
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
import clsx from "clsx";
import Select from "@material-ui/core/Select";

import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MenuItem from "@material-ui/core/MenuItem";

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
import OptionalPricesDialog from "./OptionalPricesDialog";
import InputSalesDialog from "./InputSalesDialog";

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
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  //option price dialog
  const [openoptionprice, setOpenOptionPriceDialog] = useState(false);

  const handleOpenOptionPriceDialog = () => {
    setOpenOptionPriceDialog(true);
  };

  const handleCloseOptionPriceDialog = () => {
    setOpenOptionPriceDialog(false);
  };
  //end optional price dialog

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
  const [currentitem, setCurrentItem] = useState();

  //STARTING COMPONENTS CODES
  const changePrice = (item, newprice) => {
    item.salessellingprice = newprice;
    props.dispatch({ type: "CHANGE_PRICE", sales: item });
    // props.addSales(item, props);
  };

  const changeQty = (item, newqty) => {
    setError("");
    item.quantity = newqty;
    props.dispatch({ type: "CHANGE_QTY", sales: item });
  };

  const changeType = (e) => {
    setType(e.target.id);
    if (e.target.id === "credit" && customer.name === "") {
      handleClickOpenCustomer();
    }
  };

  const saveSales = () => {
    setError("");

    if (
      props.sales.sales.filter(
        (value) =>
          parseInt(value.salessellingprice) <
          parseInt(value.selling_price_options)
      ).length > 0
    ) {
      setError(
        "you cant sell this product less than the minimum selling price"
      );
      return;
    }
    if (
      props.sales.sales.filter(
        (value) => parseInt(value.quantity) > parseInt(value.stock_qty)
      ).length > 0
    ) {
      setError("you cant sell more than you have");
      return;
    }
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
    console.log("bbb ", props.sales.sales);
    props.saveSales(props.sales.sales, customer, type);
    setType("cash");
    setCustomer({ name: "" });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.getStock();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [opencustomer, setOpenCustomer] = React.useState(false);

  const handleClickOpenCustomer = () => {
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

  //option price dialog

  const [openqty, setOpenOptionQtyDialog] = useState(false);
  const handleOpenQtyDialog = () => {
    setOpenOptionQtyDialog(true);
  };

  const handleCloseQtyDialog = () => {
    setOpenOptionQtyDialog(false);
  };

  return (
    <>
      <Loader fullPage loading={props.sales.loading} />
      <SalesDialog
        type="sales"
        fullScreen
        stocks={props.stocks}
        open={open}
        handleClose={handleClose}
      />
      <InputSalesDialog
        handleCloseQtyDialog={handleCloseQtyDialog}
        changeQty={changeQty}
        openqty={openqty}
        currentitem={currentitem}
      />
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
          <Typography variant="h5" align="center" style={{ margin: 10 }}>
            Total:
            {props.sales.total}
            /=
          </Typography>
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
        </div>

        {props.sales.sales.length > 0 && (
          <Grid container xs={12}>
            <Grid item xs={6}>
              {customer.name ? (
                <Grid
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  container
                >
                  <Grid item xs={9}>
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
                  <Grid item xs={3} align="center">
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
            </Grid>
            <Grid align="center" item xs={3}>
              <label>
                <input
                  className="with-gap"
                  name={value.serialno}
                  checked={type === "credit"}
                  id="credit"
                  onChange={(e) => changeType(e)}
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
            <Grid align="center" item xs={3}>
              <label>
                <input
                  className="with-gap"
                  onChange={(e) => changeType(e)}
                  name={value.serialno}
                  checked={type === "cash"}
                  id="cash"
                  type="radio"
                />
                <span>Cash</span>
              </label>
            </Grid>
          </Grid>
        )}

        {props.sales.sales
          ? props.sales.sales.map((value, index) => (
              <Card className={classes.root} key={index}>
                {/* <Optiona */}
                <Grid container>
                  <Grid xs={10}>
                    <Typography variant="h6">{value.name}</Typography>
                  </Grid>
                  <Grid xs={2}>
                    <Typography align="center" style={{ width: "100%" }}>
                      <CancelIcon
                        onClick={() =>
                          props.dispatch({
                            type: "REMOVE_SALE_ITEM",
                            sales: value,
                          })
                        }
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container style={{ marginTop: 10 }}>
                  <Grid item xs={5}>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        New Qty
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        defaultValue={value.quantity}
                        onClick={() => {
                          setCurrentItem(value);
                          handleOpenQtyDialog();
                        }}
                        labelWidth={70}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} style={{ marginLeft: 10 }}>
                    <TextField
                      id="filled-number"
                      label=" Selling Price"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      disabled
                      onClick={() => {
                        setCurrentItem(value);
                        handleOpenOptionPriceDialog();
                      }}
                      defaultValue={
                        value.salessellingprice
                          ? value.salessellingprice
                          : value.sellingprice
                      }
                      onChange={(e) => {
                        changePrice(value, e);
                      }}
                    />
                    <Typography
                      onClick={() => {
                        setCurrentItem(value);
                        handleOpenOptionPriceDialog();
                      }}
                    >
                      Price Option
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: 5 }}>
                  <Grid item xs={4}>
                    Max Qty: {value.stock_qty}
                  </Grid>
                  <Grid item xs={4}>
                    Min S.P:
                    {value.selling_price_options
                      ? value.selling_price_options
                      : value.sellingprice}
                  </Grid>
                  <Grid item xs={4}>
                    Total:
                    {value.total}
                  </Grid>
                </Grid>
              </Card>
            ))
          : ""}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {itemsList().length > 0 ? itemsList() : <NoItems text="No sales yet" />}
      </TabPanel>

      <OptionalPricesDialog
        openoptionprice={openoptionprice}
        handleCloseOptionPriceDialog={handleCloseOptionPriceDialog}
        changeQty={changeQty}
        changePrice={changePrice}
        currentitem={currentitem}
      />
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
  saveSales: (sales, customer, type) =>
    dispatch(saveSales(sales, customer, type)),
  getStock: () => dispatch(getStock()),
  deleteSaleReceipt: (receiptno, props) =>
    dispatch(deleteSaleReceipt(receiptno, props)),
  getSalesReceipts: (fromtime, totime, type) =>
    dispatch(getSalesReceipts(fromtime, totime, type)),
  dispatch, // ← Add this
});

export default connect(mapStateToProps, mapDispacthToProps)(NewCashSale);
