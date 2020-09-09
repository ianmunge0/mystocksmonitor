import React, { useEffect, useState } from "react";
import { getSingleStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { reactLocalStorage } from "reactjs-localstorage";
import Api from "../../api/api";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import UnitDialog from "../Stocks/UnitDialog";
import SupplierDialog from "../Stocks/SupplierDialog";
import InputAdornment from "@material-ui/core/InputAdornment";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  label: {
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    marginTop: 20,
    marginBottom: 10,
  },
}));
function EditStock(props) {
  const id = props.match.params.id;
  const [error, setError] = useState("");
  useEffect(() => {
    getSingleStock(id);
  }, []);

  const classes = useStyles();
  const getSingleStock = (id) => {
    setLoading(true);
    Api.get(`/stocks.php`, {
      params: {
        id,
        action: "single",
      },
    })
      .then((res) => {
        setStock(res.data);
        console.log("kkl", res.data);
        setUnit(res.data.unit_data);
        setSupplier(res.data.supplier_data);
        setLoading(false);
      })
      .catch((error) => {});
  };

  const [stock, setStock] = useState({});
  const [loading, setLoading] = useState();

  const handleStockData = (e) => {
    setStock({
      ...stock,
      [e.target.id]: e.target.value,
    });
    console.log(stock);
  };

  const updateStockData = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log(stock);

    var send = true;
    Object.keys(stock).map((key) => {
      if (
        stock[key] === "" &&
        key !== "unit_data" &&
        key !== "unit" &&
        key !== "supplier_data" &&
        key !== "supplier"
      ) {
        send = false;
        setError(key.split("_").join(" ") + " cannot be empty");
      }
    });
    if (send) {
      stock.action = "updatestock";
      var dd = new Date().getTime();
      stock.date_time = moment(dd).format("YYYY-MM-DD hh:mm:ss");
      stock.time_ = parseInt((dd / 1000).toFixed(0));
      stock.shopid = reactLocalStorage.getObject("userdata").default_shop;
      stock.stockrelationidid = stock.serialno;
      stock.unit = unit ? unit.id : "";
      stock.supplier = supplier ? supplier.id : "";

      Api.get(`/stocks.php`, {
        params: stock,
      })
        .then((res) => {
          const stockrespose = res.data;
          setLoading(false);
        })
        .catch((error) => {});
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

  //setting up unit state from unit dialog
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

  //setting supplier from supplier dialog
  const getSupplier = (supplier) => {
    console.log("set ", supplier);
    setSupplier(supplier);
  };

  console.log(stock);

  return (
    <div className="row">
      <Loader fullPage loading={loading} />
      <form
        className="col s12 forminput"
        onSubmit={updateStockData}
        style={{ margin: 10 }}
      >
        <p className="red-text">{error}</p>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              className={classes.inputs}
              id="partno"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Part No. #</InputAdornment>
                ),
              }}
              fullWidth
              value={stock.partno}
              variant="outlined"
              onChange={handleStockData}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.label}>Name </div>
            <TextField
              id="name"
              value={stock.name}
              fullWidth
              onChange={handleStockData}
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.label}>Quantity </div>
            <TextField
              id="stock_qty"
              value={stock.stock_qty}
              fullWidth
              onChange={handleStockData}
              variant="outlined"
              type="text"
              placeholder="Qty"
            />
          </Grid>
          <Grid item xs={6} style={{ marginRight: 15 }}>
            <div className={classes.label}>Buying Price </div>
            <TextField
              id="buyingprice"
              value={stock.buyingprice}
              fullWidth
              onChange={handleStockData}
              variant="outlined"
              pattern="[0-9]*"
              placeholder="Qty"
            />
          </Grid>
          <Grid item xs={5}>
            <div className={classes.label}>Selling Price </div>
            <TextField
              id="sellingprice"
              value={stock.sellingprice}
              fullWidth
              onChange={handleStockData}
              variant="outlined"
              pattern="[0-9]*"
              placeholder="Selling Price"
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <TextField
              className={classes.inputs}
              id="selling_price_options"
              label="Price Range Options (optional)"
              placeholder="e.g 100,200,300"
              fullWidth
              type="text"
              onChange={handleStockData}
              defaultValue={
                props.stock ? props.stock.selling_price_options : ""
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.label}>Re-Order Level </div>
            <TextField
              id="reorder_level"
              value={stock.reorder_level}
              fullWidth
              onChange={handleStockData}
              variant="outlined"
              pattern="[0-9]*"
              placeholder="Re-Order Level"
            />
          </Grid>

          <Grid item xs={12} style={{ marginTop: 20 }}>
            <Typography className={classes.root}>
              <Link
                href="#"
                onClick={handleClickOpenSupplier}
                style={{ float: "left" }}
              >
                {console.log(supplier)}
                {supplier ? supplier.supplier_name : ""}
              </Link>

              <Link
                href="#"
                onClick={handleClickOpenSupplier}
                variant="body2"
                style={{ float: "right" }}
              >
                {supplier ? "Change Supplier" : "Add Supplier"}
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 20 }}>
            <Typography className={classes.root}>
              <Link
                href="#"
                onClick={handleClickOpenUnit}
                style={{ float: "left" }}
              >
                {console.log(unit)}
                {unit ? unit.unit_name : ""}
              </Link>

              <Link
                href="#"
                onClick={handleClickOpenUnit}
                variant="body2"
                style={{ float: "right" }}
              >
                {unit ? "Change Unit" : "Add Unit"}
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 20, padding: 15 }}
        >
          Update
        </Button>
      </form>

      <div id="unitsmodal" className="modal">
        <div className="modal-content unitsmodalcontent">
          <ul className="collection">
            {props.units
              ? props.units.map(({ unit_name, id }) => (
                  <li
                    onClick={() => {
                      setStock({
                        ...stock,
                        unit: id,
                        unit_name,
                      });
                    }}
                    key={id + ""}
                    value={unit_name}
                    className="collection-item modal-close"
                  >
                    {unit_name}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
      <UnitDialog
        fullScreen
        getUnit={getUnit}
        open={openunit}
        handleClose={handleCloseUnit}
      />
      <SupplierDialog
        fullScreen
        getSupplier={getSupplier}
        open={opensupplier}
        handleClose={handleCloseSupplier}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  load: state.stock,
  item: state.stock.item,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getSingleStock: (id) => dispatch(getSingleStock(id)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(EditStock);
