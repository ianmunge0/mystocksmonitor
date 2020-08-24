import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Alert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { addStock, saveUnit } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import SupplierDialog from "./SupplierDialog";
import UnitDialog from "./UnitDialog";

const useStyles = makeStyles((theme) => ({
  inputs: {
    width: "100%",
  },
  space: {
    width: "20",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function NewStock(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [modalerror, setModalerror] = useState("");

  const [stock, setStock] = useState({
    name: "",
    stock_qty: "",
    buyingprice: "",
    sellingprice: "",
    reorder_level: "",
  });

  const handleStockData = (e) => {
    setStock({
      ...stock,
      [e.target.id]: e.target.value,
    });
    console.log(stock);
  };

  const addNewStock = (e) => {
    e.preventDefault();

    setError("");
    console.log(stock);
    var send = true;
    Object.keys(stock).map((key) => {
      if (stock[key] === "") {
        send = false;
        setError(key.split("_").join(" ") + " cannot be empty");
      }
    });
    if (parseInt(stock.stock_qty) < 1) {
      setError("quantity must be greater than 0");
      send = false;
    }
    if (parseInt(stock.buyingprice) > parseInt(stock.sellingprice)) {
      setError("selling price must be greater than buying price");
      send = false;
    }
    if (send) {
      stock.supplier = supplier.id;
      stock.unit = unit.id;
      console.log("adding stock ", stock);
      props.addStock(stock, e.target);
    }
  };
  const [openunit, setOpenUnit] = React.useState(false);

  const handleClickOpenUnit = () => {
    console.log("vv");
    setOpenUnit(true);
  };

  const handleCloseUnit = () => {
    setOpenUnit(false);
  };
  const [unit, setUnit] = useState({});

  const getUnit = (unit) => {
    console.log("set ", unit);
    setUnit(unit);
  };

  const [opensupplier, setOpenSupplier] = React.useState(false);

  const handleClickOpenSupplier = () => {
    console.log("vv");
    setOpenSupplier(true);
  };

  const handleCloseSupplier = () => {
    setOpenSupplier(false);
  };
  const [supplier, setSupplier] = useState({});

  const getSupplier = (supplier) => {
    console.log("set ", supplier);
    setSupplier(supplier);
  };

  const preventDefault = (event) => event.preventDefault();
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={addNewStock}>
        <Grid>
          <Loader fullPage loading={props.stockresponse.loading} />
          <Grid item xs={12}>
            {props.stockresponse.stockresponse ? (
              props.stockresponse.stockresponse.response ? (
                <Alert severity="error">
                  {props.stockresponse.stockresponse.response}
                </Alert>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {error ? <Alert severity="error">{error}</Alert> : ""}
          </Grid>
          <Grid item xs>
            <TextField
              className={classes.inputs}
              id="name"
              label="Product Name"
              defaultValue={props.item ? props.item.name : ""}
              variant="outlined"
              onChange={handleStockData}
            />
            <TextField
              className={classes.inputs}
              style={{ marginTop: 10 }}
              id="stock_qty"
              defaultValue={props.stock ? props.stock.stock_qty : ""}
              label="Quantity"
              variant="outlined"
              onChange={handleStockData}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              className={classes.inputs}
              id="buyingprice"
              label="Buying Price"
              onChange={handleStockData}
              defaultValue={props.stock ? props.stock.buyingprice : ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              className={classes.inputs}
              id="sellingprice"
              label="Selling Price"
              onChange={handleStockData}
              defaultValue={props.stock ? props.stock.sellingprice : ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.inputs}
              id="reorder_level"
              label="Re-order level"
              onChange={handleStockData}
              defaultValue={props.stock ? props.stock.reorder_level : ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.root}>
              <Link
                href="#"
                onClick={handleClickOpenSupplier}
                style={{ float: "left" }}
              >
                {supplier.supplier_name}
              </Link>

              <Link
                href="#"
                onClick={handleClickOpenSupplier}
                variant="body2"
                style={{ float: "right" }}
              >
                {supplier.supplier_name ? " Change Supplier " : "Add Supplier"}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.root}>
              <Link
                href="#"
                onClick={handleClickOpenSupplier}
                style={{ float: "left" }}
              >
                {unit.unit_name}
              </Link>

              <Link
                href="#"
                onClick={handleClickOpenUnit}
                variant="body2"
                style={{ float: "right" }}
              >
                {unit.unit_name ? " Change Unit " : "Add Unit"}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20, padding: 15 }}
              className={classes.button}
              type="submit"
              endIcon={<Icon>send</Icon>}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>

      <SupplierDialog
        fullScreen
        getSupplier={getSupplier}
        open={opensupplier}
        handleClose={handleCloseSupplier}
      />

      <UnitDialog
        fullScreen
        getUnit={getUnit}
        open={openunit}
        handleClose={handleCloseUnit}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  stockresponse: state.stock,
  waiting: state.loading,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addStock: (stock, e) => dispatch(addStock(stock, e)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(NewStock);
