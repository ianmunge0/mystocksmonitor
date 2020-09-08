import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

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

function InputSalesDialog(props) {
  const classes = useStyles();
  const [input, setInput] = useState();

  const changeValue = () => {
    props.changeQty(props.currentitem, input);
    props.handleCloseQtyDialog();
  };

  const onChangeTxt = (e) => {
    setInput(e.target.value);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.openqty}
        onClose={props.handleCloseQtyDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add Qty</DialogTitle>
        {props.currentitem && (
          <DialogContent>
            <form noValidate autoComplete="off">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  className={classes.inputs}
                  id="value"
                  defaultValue={input}
                  variant="outlined"
                  onChange={onChangeTxt}
                />
              </FormControl>
            </form>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={changeValue} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default InputSalesDialog;
