import React, { useEffect, useState } from "react";
import Api from "../../api/api";
import Dialog from "../cashflow/Dialog";
import { getTodayExpenses } from "../../Redux/Actions/ProfitnExpenses";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { Divider, Typography, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const options = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const d = new Date();
const ITEM_HEIGHT = 48;

function Singlecashflow(props) {
  var expense = {};
  useEffect(() => {
    expense.action = "cashflow";
    var option = d.getMonth() + 1;
    const input = getMonth(option) + "-" + d.getFullYear();
    const output = moment(input, "MM-YY");

    expense.fromdate = moment(output.startOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    expense.todate = moment(output.endOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );

    props.getTodayExpenses(expense);
  }, []);

  const [month, setMonth] = useState("");
  const [type, setType] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    country: "",
    password: "",
    phone: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (typestring) => {
    setOpen(true);
    setType(typestring);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  }

  const handleClosee = (option) => {
    option = option
      ? isString(option)
        ? option
        : options[d.getMonth()]
      : options[d.getMonth()];

    setAnchorEl(null);
    expense.action = "cashflow";
    const input = getMonth(option) + "-" + d.getFullYear();
    const output = moment(input, "MM-YY");

    expense.fromdate = moment(output.startOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    expense.todate = moment(output.endOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    console.log("month", option);
    setMonth(option);
    props.getTodayExpenses(expense);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    inputs: {
      width: "100%",
      float: "left",
    },
  }));

  const classes = useStyles();

  console.log("props", props.expenses.profitnexpense.todayexpenses);

  if (props.expenses.profitnexpense.loading) {
    return <Loader fullPage loading={props.expenses.profitnexpense.loading} />;
  }

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        style={{ width: "100%" }}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ChevronLeftIcon />
        {month ? month : options[d.getMonth()]} {""}
        {d.getFullYear()}
        <ChevronRightIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openn}
        onClose={handleClosee}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === options[d.getMonth()]}
            onClick={() => handleClosee(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Profit Today
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <Typography variant="h6" align="center">
            {props.expenses.profitnexpense.todayexpenses.cash_in_hand}
          </Typography>
        </Grid>
      </Grid>

      <Divider />

      <Grid container>
        <Grid item xs={6} align="center">
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: 20, paddingTop: 5, paddingBottom: 5 }}
            className={classes.button}
            onClick={() => handleClickOpen("in")}
            type="submit"
            endIcon={<AddIcon>send</AddIcon>}
          >
            Cash In
          </Button>
        </Grid>
        <Grid item xs={6} align="center">
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: 20, paddingTop: 5, paddingBottom: 5 }}
            className={classes.button}
            onClick={() => handleClickOpen("out")}
            type="submit"
            endIcon={<RemoveIcon>send</RemoveIcon>}
          >
            Cash Out
          </Button>
        </Grid>
      </Grid>

      <Dialog type={type} fullScreen open={open} handleClose={handleClose} />

      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>In</TableCell>
              <TableCell>Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Previous balance
              </TableCell>
              <TableCell>
                {props.expenses.profitnexpense.todayexpenses.balance_forward}
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Sales
              </TableCell>
              <TableCell>
                {
                  props.expenses.profitnexpense.todayexpenses
                    .current_month_sales
                }
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Purchases
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {
                  props.expenses.profitnexpense.todayexpenses
                    .current_month_purchases
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Expenses
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {
                  props.expenses.profitnexpense.todayexpenses
                    .current_month_expenses
                }
              </TableCell>
            </TableRow>

            {props.expenses.profitnexpense.todayexpenses.cashinlist.map(
              (value, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {value.description}
                  </TableCell>
                  <TableCell>{value.amount}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              )
            )}
            {props.expenses.profitnexpense.todayexpenses.expenseslist.map(
              (value, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {value.expensedetails}
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{value.amount}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container style={{ marginTop: 10 }}>
        <Grid item xs={6} align="center">
          <Typography spacing={3} variant="button" display="block" gutterBottom>
            Total Cash In:{" "}
            {props.expenses.profitnexpense.todayexpenses.total_cashin}
          </Typography>
        </Grid>
        <Grid item xs={6} align="center">
          <Typography spacing={3} variant="button" display="block" gutterBottom>
            Total Cash Out:{" "}
            {props.expenses.profitnexpense.todayexpenses.total_cashout}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  expenses: state,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getTodayExpenses: (expense) => dispatch(getTodayExpenses(expense)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Singlecashflow);
