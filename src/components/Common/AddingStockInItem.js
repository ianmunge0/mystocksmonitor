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
import clsx from "clsx";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

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
    setCurrentItem,
    handleOpenOptionPriceDialog,
  } = props;
  return (
    <Card className={classes.root} key={key}>
      <Grid container>
        <Grid xs={10}>
          <Typography variant="h6">{value.name}</Typography>
        </Grid>
        <Grid xs={2}>
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
      <Divider />
      <Grid container xs={12} style={{ marginTop: 10 }}>
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
              value={value.quantity}
              onClick={() => {
                setCurrentItem(value);
                handleOpenOptionPriceDialog("qty");
              }}
              // startAdornment={
              //   <InputAdornment position="start">
              //     <RemoveCircleIcon
              //       onClick={() =>
              //         props.dispatch({
              //           type: "REMOVE_QTY",
              //           stocksin: value,
              //         })
              //       }
              //       edge="end"
              //     ></RemoveCircleIcon>
              //   </InputAdornment>
              // }
              // endAdornment={
              //   <InputAdornment position="end">
              //     <AddCircleIcon
              //       aria-label="toggle password visibility"
              //       onClick={() =>
              //         props.dispatch({
              //           type: "ADD_QTY",
              //           stocksin: value,
              //         })
              //       }
              //       edge="end"
              //     ></AddCircleIcon>
              //   </InputAdornment>
              // }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} style={{ marginLeft: 10 }}>
          <TextField
            id="filled-number"
            label="Buying Price"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onClick={() => {
              setCurrentItem(value);
              handleOpenOptionPriceDialog("price");
            }}
            variant="outlined"
            defaultValue={
              value.stockinbuyingprice
                ? value.stockinbuyingprice
                : value.buyingprice
            }
          />
        </Grid>
      </Grid>
      <Grid container xs={12} style={{ marginTop: 10 }}>
        <Grid item xs={6}>
          Current B.P: {value.buyingprice}
        </Grid>
        <Grid item xs={6}>
          Total: {value.total}
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
