import React, { useState } from "react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { DefinedRange } from "react-date-range";
import { DateRange } from "react-date-range";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Item from "./Item";

export default function StockInManager(props) {
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
        style={{ width: "100%" }}
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
      <Item
        description="View Stocks Items"
        className="datepicker"
        title="Today"
        route="stockfilter"
        icon={<TodayIcon fontSize="large" />}
        data="today"
      />

      <Item
        description="View current month stock report"
        className="datepicker"
        title="This Month"
        route="stockfilter"
        icon={<DateRangeIcon fontSize="large" />}
        data="month"
      />

      <Item
        description="Compare product analysis report"
        className="datepicker"
        title="Product Analysis"
        route="productsanalysis"
        icon={<ShowChartIcon fontSize="large" />}
        data="month"
      />

      {/* <ListItem
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
      </ListItem> */}

      {/* <ListItem
        button
        onClick={() => {
          props.history.push({ pathname: "productsanalysis" });
        }}
      >
        <ListItemText
          primary={<h5>Product Analysis</h5>}
          secondary="Compare product analysis report"
        />
      </ListItem> */}

      {/* <Products /> */}
    </>
  );
  // }
}
