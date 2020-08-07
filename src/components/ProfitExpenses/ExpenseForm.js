import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Api from "../../api/api";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
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

function ExpenseForm(props) {
  const [error, setError] = useState("");
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
  const addNewExpense = (e) => {
    e.preventDefault();

    var send = true;
    Object.keys(expense).map((key) => {
      if (expense[key] === "") {
        send = false;
        setError(key.split("_").join(" ") + " cannot be empty");
      }
    });
    if (send) {
      props.dispatch({
        type: "LOADING",
        loading: true,
      });
      expense.attendantid = 0;
      expense.action = "add";
      expense.type = 0;
      expense.adminid = reactLocalStorage.getObject("userdata").serialno;
      expense.shopid = reactLocalStorage.getObject("userdata").default_shop;
      var dd = new Date().getTime();
      expense.date_time = moment(dd).format("YYYY-MM-DD hh:mm:ss");
      console.log(expense);

      Api.get(`/profitandexpense.php`, {
        params: expense,
      })
        .then((res) => {
          const response = res.data;
          console.log("profitandexpense", response);

          props.dispatch({
            type: "TODAY_EXPENSES",
            response,
          });
        })
        .catch((error) => {
          // your error handling goes here}
          console.log("error", error);
        });
    }
  };
  //   render() {
  const classes = useStyles();
  return (
    <div>
      <form
        noValidate
        autoComplete="off"
        onSubmit={addNewExpense}
        style={{ marginTop: 20 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              className={classes.inputs}
              id="description"
              label="Description"
              variant="outlined"
              onChange={handleData}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.inputs}
              id="amount"
              label="Amount"
              variant="outlined"
              placeholder="Amount e.g 10"
              onChange={handleData}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => ({
  expenses: state,
});
export default connect(mapStateToProps)(ExpenseForm);

// }
