import React, { useEffect, useState } from "react";
import Api from "../../api/api";
import Dialog from "../cashflow/Dialog";
import { getTodayExpenses } from "../../Redux/Actions/ProfitnExpenses";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
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

  console.log("props", props.expenses.profitnexpense.todayexpenses);

  if (props.expenses.profitnexpense.loading) {
    return <Loader fullPage loading={props.expenses.profitnexpense.loading} />;
  }

  return (
    <>
      <div className="row  z-depth-3" style={{ paddingBottom: 20 }}>
        <div className="col s12 center">
          <h5>
            Cash in hand <br />{" "}
            {props.expenses.profitnexpense.todayexpenses.cash_in_hand}/=
          </h5>
        </div>
        <div className="col s12">
          <div className="col s6">
            <button
              className="waves-effect waves-light btn btn-primary left modal-trigger"
              onClick={() => handleClickOpen("in")}
            >
              <i className="material-icons left ">add</i>cash In
            </button>
            {/* <a
              className="waves-effect waves-light btn btn-primary left modal-trigger"
              href="#modal1"
            >
              <i className="material-icons left ">add</i>cash In
            </a> */}
          </div>
          <div className="col s6">
            <button
              className="btn btn-warning orange right"
              onClick={() => handleClickOpen("out")}
            >
              <i className="material-icons left">remove</i>cash Out
            </button>
            <Dialog
              type={type}
              fullScreen
              open={open}
              handleClose={handleClose}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <a href="#" className="btn" style={{ marginTop: 10 }}>
                  <i className="material-icons left">fast_rewind</i>
                  {month ? month : options[d.getMonth()]} {""}
                  {d.getFullYear()}
                </a>
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
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <table>
              <thead>
                <tr>
                  <th>Type </th>
                  <th>In</th>
                  <th>Out</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Previous balance</td>
                  <td>
                    {
                      props.expenses.profitnexpense.todayexpenses
                        .balance_forward
                    }
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Sales</td>
                  <td>
                    {
                      props.expenses.profitnexpense.todayexpenses
                        .current_month_sales
                    }
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Purchases</td>
                  <td>-</td>
                  <td>
                    {
                      props.expenses.profitnexpense.todayexpenses
                        .current_month_purchases
                    }
                  </td>
                </tr>
                <tr>
                  <td>Expenses</td>
                  <td>-</td>
                  <td>
                    {
                      props.expenses.profitnexpense.todayexpenses
                        .current_month_expenses
                    }
                  </td>
                </tr>
                {props.expenses.profitnexpense.todayexpenses.cashinlist.map(
                  (value, index) => (
                    <tr key={index}>
                      <td>{value.description}</td>
                      <td>{value.amount}</td>
                      <td>-</td>
                    </tr>
                  )
                )}
                {props.expenses.profitnexpense.todayexpenses.expenseslist.map(
                  (value, index) => (
                    <tr key={index}>
                      <td>{value.expensedetails}</td>
                      <td>-</td>
                      <td>{value.amount}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <p className="left col s6" style={{ fontWeight: "bold" }}>
          Total cash In{" "}
          {props.expenses.profitnexpense.todayexpenses.total_cashin}
        </p>
        <p className="right col s6" style={{ fontWeight: "bold" }}>
          Total cash Out{" "}
          {props.expenses.profitnexpense.todayexpenses.total_cashout}
        </p>
      </div>
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
