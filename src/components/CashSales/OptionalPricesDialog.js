import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Messages from "../Common/Messages";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: "100%",
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  formInput: {
    paddingLeft: 10,
  },
}));

function OptionalPricesDialog(props) {
  const classes = useStyles();
  const [maxWidth, setMaxWidth] = useState("sm");
  const [error, setError] = useState("");
  const [price, setPrice] = useState(0);

  const changePrice = (e) => {
    console.log("pp ", e.target.value);
    setPrice(e.target.value);
    if (
      parseInt(e.target.value) < props.currentitem.selling_price_options ||
      parseInt(e.target.value) > props.currentitem.sellingprice
    ) {
      props.changePrice(props.currentitem, props.currentitem.sellingprice);
    } else {
      props.changePrice(props.currentitem, parseInt(e.target.value));
    }
  };

  const closeDialog = () => {
    if (price < props.currentitem.selling_price_options) {
      setError(
        "you cant sell " +
          props.currentitem.name +
          " less than " +
          props.currentitem.selling_price_options
      );
      return;
    }
    if (price > props.currentitem.sellingprice) {
      setError(
        "you cant sell " +
          props.currentitem.name +
          " more than " +
          props.currentitem.sellingprice
      );
      return;
    }
    props.handleCloseOptionPriceDialog();
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={props.openoptionprice}
        onClose={closeDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Enter New Selling Price
        </DialogTitle>
        <Messages type="error" text={error} />
        {props.currentitem && (
          <DialogContent>
            <form noValidate>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  id="price"
                  type="number"
                  pattern="[0-9]*"
                  variant="outlined"
                  onChange={changePrice}
                />
                {/* <Select
                    autoFocus
                    value={props.currentitem.sellingprice}
                    onChange={changePrice}
                    fullWidth
                  >
                    <MenuItem value={props.currentitem.sellingprice}>
                      {props.currentitem.sellingprice}
                    </MenuItem>
                    {JSON.parse(props.currentitem.selling_price_options).map(
                      (v, k) => (
                        <MenuItem key={k} value={v}>
                          {v}
                        </MenuItem>
                      )
                    )}
                  </Select> */}
              </FormControl>
            </form>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Save
          </Button>
          <Button onClick={props.handleCloseOptionPriceDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default OptionalPricesDialog;
