import React, { useState, useEffect } from "react";
import {
  saveStockIn,
  getStocksIn,
  deleteStockIn,
} from "../../Redux/Actions/StockIn";
import { connect } from "react-redux";
import SalesDialog from "../CashSales/SalesDialog";
import { getStock } from "../../Redux/Actions/Stock";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import SupplierDialog from "../Stocks/SupplierDialog";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";

import Messages from "../Common/Messages";
import InputLabel from "@material-ui/core/InputLabel";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

import AddingStockInItem from "../Common/AddingStockInItem";
import StockReportItem from "../Common/StockReportItem";
import NoItems from "../NoItems";
import moment from "moment";
import InputDialog from "../Stocks/InputDialog";

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

function StockIn(props) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [type, setType] = useState("cash");

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  useEffect(() => {
    props.getStocksIn();
  }, []);

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
  const changePrice = (item, newprice) => {
    setError("");
    console.log("newprice ", newprice);
    if (newprice)
      item.stockinbuyingprice = newprice ? newprice : item.buyingprice;
    props.dispatch({ type: "CHANGE_PRICE", stocksin: item });
  };

  const changeQty = (item, newqty) => {
    if (newqty) item.quantity = newqty;
    props.dispatch({ type: "CHANGE_QTY", stocksin: item });
  };

  const changeType = (e) => {
    // item.type = e.target.id;
    // props.dispatch({ type: "CHANGE_TYPE", stocksin: item });
    setType(e.target.id);
    if (e.target.id === "credit" && supplier.supplier_name === "") {
      handleClickOpenSupplier();
    }
  };

  const saveStockIn = () => {
    setError("");

    //checking if there is credit sale and if the supplier has been selected
    if (
      props.stocksin.stocksin.filter((value) => value.type === "credit")
        .length > 0 &&
      supplier.supplier_name === ""
    ) {
      setError("Credit stockin must have a supplier");
      return;
    }

    //check if the quantity is less or equal to 0
    if (
      props.stocksin.stocksin.filter((value) => value.quantity < 0).length > 0
    ) {
      setError("one of your product has quantity 0 or empty");
      return;
    }

    // props.stocksin.stocksin.supplier = supplier;
    console.log(type);
    // var invoice = !invoice ? props.stocksin.invoice : invoice;
    console.log("ii", !invoice ? props.stocksin.invoice : invoice);
    props.saveStockIn(
      props.stocksin.stocksin,
      supplier,
      type,
      !invoice ? props.stocksin.invoice : invoice
    );
    // setSupplier({ ...supplier, invoice: getRandomInt(1000000) });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    props.getStock();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [opensupplier, setOpenSupplier] = React.useState(false);

  const handleClickOpenSupplier = () => {
    console.log("vv");
    setOpenSupplier(true);
  };

  const handleCloseSupplier = () => {
    console.log("handleCloseSupplier");
    setOpenSupplier(false);
  };

  const [supplier, setSupplier] = useState({
    supplier_name: "",
  });

  const getSetSupplier = (supplier) => {
    console.log("set ", supplier);
    setSupplier(supplier);
  };
  const deleteStock = (stock) => {
    props.deleteStockIn(stock);
  };

  const [invoice, setInvoice] = useState("");
  const changeInvoice = (e) => {
    setInvoice(e.target.value);
  };

  //option price dialog
  const [openoptionprice, setOpenOptionPriceDialog] = useState(false);
  const [currentitem, setCurrentItem] = useState();
  const [opentype, setOpenType] = useState("");

  const handleOpenOptionPriceDialog = (type) => {
    setOpenOptionPriceDialog(true);
    setOpenType(type);
  };

  const handleCloseOptionPriceDialog = () => {
    setOpenOptionPriceDialog(false);
  };
  //end optional price dialog

  //END COMPONENTS CODES
  console.log("bbb ", props.stocks.stocks);
  return (
    <>
      {opensupplier && (
        <SupplierDialog
          fullScreen
          getSetSupplier={getSetSupplier}
          opensupplier={opensupplier}
          handleCloseSupplier={handleCloseSupplier}
        />
      )}
      {props.stocks && (
        <SalesDialog
          fullScreen
          open={open}
          stocks={props.stocks.stocks}
          handleClose={handleClose}
          type="stockin"
        />
      )}

      <Messages type="error" text={error} />
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="New" href="/drafts" {...a11yProps(0)} />

          <LinkTab label="All" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl
                className={clsx(classes.margin, classes.inputs)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Invoice No#
                </InputLabel>
                <OutlinedInput
                  variant="outlined"
                  onChange={changeInvoice}
                  value={invoice}
                  // placeholder={props.stocksin.invoice}
                  autoFocus
                  labelWidth={80}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} align="center">
              <Typography variant="h6">
                Total:
                <br />
                {props.stocksin.total}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                Select +
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={saveStockIn}
                disabled={props.stocksin.stocksin.length > 0 ? false : true}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
        {props.stocksin.stocksin.length > 0 && (
          <Grid container xs={12} style={{ marginTop: 10 }}>
            <Grid align="center" item xs={6}>
              {supplier.supplier_name ? (
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
                        handleClickOpenSupplier();
                      }}
                    >
                      Supplier: {supplier.supplier_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} align="center">
                    <CancelIcon
                      onClick={() => {
                        setSupplier({ supplier_name: "" });
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
                    handleClickOpenSupplier();
                  }}
                >
                  + Add Supplier
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

        {props.stocksin.stocksin
          ? props.stocksin.stocksin.map((value, index) => (
              <AddingStockInItem
                value={value}
                // changeQty={changeQty}
                // changePrice={changePrice}
                setCurrentItem={setCurrentItem}
                handleOpenOptionPriceDialog={handleOpenOptionPriceDialog}
                handleClose={handleClose}
                key={index}
              />
            ))
          : ""}
        <InputDialog
          openoptionprice={openoptionprice}
          handleCloseOptionPriceDialog={handleCloseOptionPriceDialog}
          changeQty={changeQty}
          type={opentype}
          changePrice={changePrice}
          currentitem={currentitem}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Loader fullPage loading={props.stocksin.loading} />
        {props.stocksin.stocks.length > 0 ? (
          props.stocksin.stocks.map((value, index) => {
            return (
              <StockReportItem
                deleteStock={deleteStock}
                value={value}
                key={index}
              />
            );
          })
        ) : (
          <NoItems text="No Stock In Today" />
        )}
      </TabPanel>
    </>
  );
}
const mapStateToProps = (state) => ({
  stocks: state.stock,
  stocksin: state.stocksin,
});

const mapDispacthToProps = (dispatch) => ({
  saveStockIn: (stocks, supplier, type, invoice) =>
    dispatch(saveStockIn(stocks, supplier, type, invoice)),
  getStocksIn: () => dispatch(getStocksIn()),
  getStock: () => dispatch(getStock()),
  deleteStockIn: (item) => dispatch(deleteStockIn(item)),
  dispatch, // ← Add this
});

export default connect(mapStateToProps, mapDispacthToProps)(StockIn);
