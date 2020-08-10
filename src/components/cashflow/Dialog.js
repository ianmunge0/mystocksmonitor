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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function NewExpenseDialog(props) {
  const [error, setError] = useState("");

  const [type, setType] = useState("");
  const classes = useStyles();

  const changeDefaultShop = (shopid) => {
    props.setDeafultShop(shopid, props);
  };

  const [expense, setExpense] = useState({
    description: "",
    amount: "",
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
      var dd = new Date().getTime();
      expense.date_time = moment(dd).format("YYYY-MM-DD hh:mm:ss");
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
          <div className="col s12">
            <input
              onChange={handleData}
              id="description"
              type="text"
              className="validate"
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className="col s12">
            <input
              onChange={handleData}
              id="amount"
              type="text"
              className="validate"
            />
            <label htmlFor="amount">Amount</label>
          </div>

          <div className="row">
            <div className="col s12">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
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
