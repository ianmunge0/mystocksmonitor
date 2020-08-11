import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Alert from "@material-ui/lab/Alert";

import {
  addStock,
  saveUnit,
  getUnits,
  saveSupplier,
  getSuppliers,
} from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
// import { reactLocalStorage } from "reactjs-localstorage";

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     "& > *": {
  //       margin: theme.spacing(1),
  //       width: "100%",
  //     },
  //   },
  inputs: {
    width: "100%",
    float: "left",
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

  useEffect(() => {
    props.getUnits();
    props.getSuppliers();

    // setStock(props.stock);
    console.log("all ", props.stock);
  }, [props.stock]);

  const [error, setError] = useState("");
  const [modalerror, setModalerror] = useState("");

  const [stock, setStock] = useState({
    name: "",
    stock_qty: "",
    buyingprice: "",
    sellingprice: "",
    reorder_level: "",
  });

  const [unit, setUnit] = useState({
    unit_name: "",
  });
  const [supplier, setSupplier] = useState({
    supplier_name: "",
  });

  const handleUnitData = (e) => {
    setUnit({
      ...unit,
      [e.target.id]: e.target.value,
    });
  };
  const handleSupplierData = (e) => {
    setSupplier({
      ...supplier,
      [e.target.id]: e.target.value,
    });
  };

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
      props.addStock(stock, e.target);
    }
  };

  const addUnit = (e) => {
    e.preventDefault();
    setModalerror("");
    if (unit.unit_name !== "") {
      props.saveUnit(unit);
    } else {
      setModalerror("Enter unit to add");
    }
  };

  const addSupplier = (e) => {
    e.preventDefault();
    // console.log(supplier);
    setModalerror("");
    if (supplier.supplier_name !== "") {
      props.saveSupplier(supplier.supplier_name);
    } else {
      setModalerror("Enter supplier name");
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={addNewStock}>
      <Grid container spacing={3}>
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
        </Grid>
        <Grid item xs>
          <TextField
            className={classes.inputs}
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state) => ({
  stockresponse: state.stock,
  waiting: state.loading,
  units: state.stock.units,
  suppliers: state.stock.suppliers,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addStock: (stock, e) => dispatch(addStock(stock, e)),
    saveUnit: (unit) => dispatch(saveUnit(unit)),
    getUnits: () => dispatch(getUnits()),
    saveSupplier: (supplier) => dispatch(saveSupplier(supplier)),
    getSuppliers: () => dispatch(getSuppliers()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(NewStock);
