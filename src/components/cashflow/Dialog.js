import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { addExpense } from "../../Redux/Actions/ProfitnExpenses";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Slide from "@material-ui/core/Slide";
import { Grid } from "@material-ui/core";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  inputs: {
    width: "100%",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function NewExpenseDialog(props) {
  const [error, setError] = useState("");

  const [type, setType] = useState("");
  const classes = useStyles();

  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const handleData = (e) => {
    setExpense({
      ...expense,
      [e.target.id]: e.target.value,
    });
    console.log(expense);
  };
  const addExpense = (e) => {
    e.preventDefault();
    var send = true;
    Object.keys(expense).map((key) => {
      if (expense[key] === "") {
        send = false;
        setError(key.split("_").join(" ") + " cannot be empty");
      }
    });
    if (send) {
      expense.attendantid = 0;
      expense.type = 1;
      expense.itemtype = props.type;
      expense.from = "dialog";
      expense.adminid = reactLocalStorage.getObject("userdata").serialno;
      expense.shopid = reactLocalStorage.getObject("userdata").default_shop;
      // var dd = new Date().getTime();
      expense.date_time = expense.date;
      props.addExpense(expense, props);
    }
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <Loader fullPage loading={props.shops.loading} />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add new
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate autoComplete="off" onSubmit={addExpense}>
        <div className="row">
          <div className="col s12">
            <h6 className="red-text">{error}</h6>
          </div>
          <Grid
            style={{
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <Grid item xs={12}>
              <TextField
                className={classes.inputs}
                id="description"
                label="Description"
                onChange={handleData}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.inputs}
                id="amount"
                style={{ marginTop: 20 }}
                label="Amount"
                onChange={handleData}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <label>Date</label>
              <TextField
                fullWidth
                placeholder="Due Date"
                id="date"
                type="date"
                name="date"
                onChange={handleData}
                variant="outlined"
              />
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20, padding: 15 }}
              className={classes.button}
              type="submit"
              endIcon={<Icon>send</Icon>}
            >
              Update
            </Button>
          </Grid>
        </div>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  shops: state,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addExpense: (data, props) => dispatch(addExpense(data, props)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(NewExpenseDialog);
