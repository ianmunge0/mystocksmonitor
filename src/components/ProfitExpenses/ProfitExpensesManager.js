import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DefinedRange } from "react-date-range";
import { DateRange } from "react-date-range";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import moment from "moment";
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
      endDate: null,
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
      },
    });
    // props.history.push("/profitexpensesummary");
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
      {/* <div className="row">
        <DefinedRange
          onChange={(item) => getProfitExpense(item)}
          ranges={state}
        />
      </div> */}

      <ListItem
        button
        onClick={() => {
          props.history.push({
            pathname: "/profitexpensesummary",
            state: { fromdate: new Date(), todate: new Date() },
          });
        }}
      >
        <ListItemText
          primary={<h5>Today</h5>}
          secondary="View today's stock report"
        />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          var fromtimeStamp = moment(
            output.startOf("month").format("LL")
          ).format("YYYY-MM-DD hh:mm:ss");
          var totimestamp = moment(output.endOf("month").format("LL")).format(
            "YYYY-MM-DD hh:mm:ss"
          );

          props.history.push({
            pathname: "/profitexpensesummary",
            state: { fromdate: fromtimeStamp, todate: totimestamp },
          });
        }}
      >
        <ListItemText
          primary={<h5>This Month</h5>}
          secondary="View current month stock report"
        />
      </ListItem>

      {/* <ListItem
        button
        onClick={() => {
          props.history.push({ pathname: "profitandexpenseanalysis" });
        }}
      >
        <ListItemText
          primary={<h5>Profit and Expenses</h5>}
          secondary="Profit and expenses graphical representation"
        />
      </ListItem> */}
    </>
  );
  // }
};

export default withRouter(ProfitExpensesManager);
