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
export default function StockInManager(props) {
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  var month = options[d.getMonth()];
  const input = getMonth(month) + "-" + d.getFullYear();
  const output = moment(input, "MM-YY");
  const handleSelect = (ranges) => {
    console.log("handleSelect", ranges.selection);
    setState([ranges.selection]);
    props.history.push({
      pathname: "/stockfilter",
      state: {
        fromdate: ranges.selection.startDate,
        todate: ranges.selection.endDate,
      },
    });
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      {/* <NavBar titleone="Stock in Manager" /> */}
      <DateRange
        editableDateInputs={false}
        onChange={(item) => {
          handleSelect(item);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      {/* <DefinedRange
        dateDisplayFormat="MMM d, yyyy"
        onChange={(item) => getstock(item)}
        ranges={state}
      /> */}
      <ListItem
        button
        onClick={() => {
          props.history.push({
            pathname: "/stockfilter",
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
            pathname: "/stockfilter",
            state: { fromdate: fromtimeStamp, todate: totimestamp },
          });
        }}
      >
        <ListItemText
          primary={<h5>This Month</h5>}
          secondary="View current month stock report"
        />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.history.push({ pathname: "productsanalysis" });
        }}
      >
        <ListItemText
          primary={<h5>Product Analysis</h5>}
          secondary="Compare product analysis report"
        />
      </ListItem>

      {/* <Products /> */}
    </>
  );
  // }
}
