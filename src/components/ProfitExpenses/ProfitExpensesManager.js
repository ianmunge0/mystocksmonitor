import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import moment from "moment";
import Item from "../../components/Item";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Months from "../Months";
import { reactLocalStorage } from "reactjs-localstorage";
import Button from "@material-ui/core/Button";
const d = new Date();
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
const ProfitExpensesManager = (props) => {
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  var month = options[d.getMonth()];
  const input = getMonth(month) + "-" + d.getFullYear();
  const output = moment(input, "MM-YY");

  const handleSelect = (ranges) => {
    console.log(ranges.selection);
    setState([ranges.selection]);
    props.history.push("/profitexpensesummary");
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const getProfitExpense = (item) => {
    // console.log(item.selection);
    props.history.push({
      pathname: "/profitexpensesummary",
      state: {
        fromdate: item.selection.startDate,
        todate: item.selection.endDate,
        type: "day",
      },
    });
    // props.history.push("/profitexpensesummary");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="row">
        <DateRange
          editableDateInputs={false}
          onChange={(item) => {
            getProfitExpense(item);
          }}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>

      <Item
        description="View today profit and expenses summary"
        className="datepicker"
        title="Today"
        route="profitexpensesummary"
        icon={<TodayIcon fontSize="large" />}
        data="today"
      />

      <Item
        description="View monthly profit and expenses summary"
        className="datepicker"
        title="Monthly Profit and Expenses"
        icon={<DateRangeIcon fontSize="large" />}
        onClick={handleClickOpen}
      />
      <Months
        pathname="profitexpensesummary"
        fullScreen
        open={open}
        handleClose={handleClose}
      />

      {/* <Item
        description="View today profit and expenses summary"
        className="datepicker"
        title="Profit and Expenses Graph"
        route="profitandexpenseanalysis"
        icon={<TodayIcon fontSize="large" />}
        data="today"
      /> */}
    </>
  );
  // }
};

export default withRouter(ProfitExpensesManager);
