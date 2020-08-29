import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import List from "@material-ui/icons/List";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import SupplierDialog from "../Stocks/SupplierDialog";
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
function StockInProductItem(props, key) {
  const classes = useStyles();
  const {
    value,
    changeQty,
    changePrice,
    type,
    changeType,
    opensupplier,
    getSupplier,
    handleCloseSupplier,
  } = props;
  return (
    <Card className={classes.root} key={key}>
      <Typography variant="h6">{value.name}</Typography>
      <Divider />
      <Grid container xs={12} style={{ marginTop: 10 }}>
        <Grid container xs={12}>
          <Grid item xs={6}>
            New Qty
          </Grid>
          <Grid item xs={6}>
            Unit Buying Price:
            {value.stockinbuyingprice
              ? value.stockinbuyingprice
              : value.buyingprice}
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
                    stocksin: value,
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
                defaultValue={value.quantity}
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
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
                    stocksin: value,
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
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                defaultValue={
                  value.stockinbuyingprice
                    ? value.stockinbuyingprice
                    : value.buyingprice
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
                    stocksin: value,
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
            {opensupplier && (
              <SupplierDialog
                fullScreen
                getSupplier={getSupplier}
                open={opensupplier}
                handleClose={handleCloseSupplier}
              />
            )}
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
  );
}
const mapDispacthToProps = (dispatch) => {
  return {
    dispatch,
  };
};
export default connect(mapDispacthToProps)(StockInProductItem);
