import React, { useState, useEffect } from "react";
import {
  saveStockIn,
  getStocksIn,
  deleteStockIn,
} from "../../Redux/Actions/StockIn";
import { connect } from "react-redux";
import SalesDialog from "../CashSales/SalesDialog";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";

import Messages from "../Common/Messages";

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
  const changePrice = (item, e) => {
    setError("");
    item.stockinbuyingprice = e.target.value;
    props.dispatch({ type: "CHANGE_PRICE", stocksin: item });
    // props.addSales(item, props);
  };

  const changeQty = (item, e) => {
    item.quantity = e.target.value;
    props.dispatch({ type: "CHANGE_QTY", stocksin: item });
  };

  const changeType = (item, e) => {
    item.type = e.target.id;
    props.dispatch({ type: "CHANGE_TYPE", stocksin: item });
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
    props.saveStockIn(props.stocksin.stocksin, supplier);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
    setOpenSupplier(false);
  };
  const [supplier, setSupplier] = useState({ supplier_name: "" });

  const getSupplier = (supplier) => {
    console.log("set ", supplier);
    setSupplier(supplier);
  };
  const deleteStock = (stock) => {
    props.deleteStockIn(stock);
  };

  //END COMPONENTS CODES
  return (
    <>
      {open && (
        <SalesDialog
          fullScreen
          open={open}
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

          <Grid container spacing={3}>
            <Grid item xs={3} align="center">
              Total:
              <br />
              {props.stocksin.total}
            </Grid>
            <Grid item xs={3} align="center">
              Items: <br />
              {props.stocksin.length}
            </Grid>
            <Grid item xs={3} align="center">
              Credit: <br />
              {props.stocksin.credit}
            </Grid>
            <Grid item xs={3} align="center">
              Cash: <br />
              {props.stocksin.cash}
            </Grid>
          </Grid>
        </div>
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

        {props.stocksin.stocksin
          ? props.stocksin.stocksin.map((value, index) => (
              <AddingStockInItem
                value={value}
                changeQty={changeQty}
                changePrice={changePrice}
                type={type}
                changeType={changeType}
                opensupplier={opensupplier}
                getSupplier={getSupplier}
                handleClose={handleClose}
                handleCloseSupplier={handleCloseSupplier}
                key={index}
              />
            ))
          : ""}
      </TabPanel>
      <TabPanel value={value} index={1}>
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
  stocks: state.stocks,
  stocksin: state.stocksin,
});

const mapDispacthToProps = (dispatch) => ({
  saveStockIn: (stocks, supplier) => dispatch(saveStockIn(stocks, supplier)),
  getStocksIn: () => dispatch(getStocksIn()),
  deleteStockIn: (item) => dispatch(deleteStockIn(item)),
  dispatch, // ← Add this
});

export default connect(mapStateToProps, mapDispacthToProps)(StockIn);
