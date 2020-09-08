import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

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
}));

function OptionalPricesDialog(props) {
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const changePrice = (e) => {
    props.changePrice(props.currentitem, e.target.value); //setMaxWidth(event.target.value);
    props.handleCloseOptionPriceDialog();
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.openoptionprice}
        onClose={props.handleCloseOptionPriceDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Allowed Selling Price
        </DialogTitle>
        {props.currentitem && (
          <DialogContent>
            {props.currentitem.selling_price_options && (
              <form noValidate>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="max-width">Price Choices</InputLabel>
                  <Select
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
                  </Select>
                </FormControl>
              </form>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={props.handleCloseOptionPriceDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default OptionalPricesDialog;
