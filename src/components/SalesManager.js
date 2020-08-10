import React, { useState } from "react";

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

export default function SalesManager(props) {
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  var month = options[d.getMonth()];
  const input = getMonth(month) + "-" + d.getFullYear();
  const output = moment(input, "MM-YY");

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
  };

  const selectedSalesDate = (item) => {
    console.log("selectedSalesDate", item.selection.startDate);
    props.history.push({
      pathname: "/salesreceipts",
      state: {
        fromdate: item.selection.startDate,
        todate: item.selection.endDate,
      },
    });
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  return (
    <>
      {/* <NavBar titleone="Sales Manager" action="salesmanager" /> */}
      <DateRange
        editableDateInputs={false}
        onChange={(item) => {
          selectedSalesDate(item);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      {/* <DefinedRange
        onChange={(item) => selectedSalesDate(item)}
        ranges={state}
      /> */}

      <ListItem
        button
        onClick={() => {
          props.history.push({
            pathname: "/salesreceipts",
            state: { fromdate: new Date(), todate: new Date() },
          });
        }}
      >
        <ListItemText primary={<h5>Today</h5>} secondary="View today's sales" />
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
            pathname: "/salesreceipts",
            state: { fromdate: fromtimeStamp, todate: totimestamp },
          });
        }}
      >
        <ListItemText
          primary={<h5>This Month</h5>}
          secondary="View current month sales"
        />
      </ListItem>
    </>
  );
  // }
}
