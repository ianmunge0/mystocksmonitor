import React, { useState } from "react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DefinedRange } from "react-date-range";
import { DateRange } from "react-date-range";
import NavBar from "../components/Navigations/NavBar";
export default function StockInManager(props) {
  // componentDidMount() {
  //   document.addEventListener("DOMContentLoaded", function () {
  //     var elems = document.querySelectorAll(".datepicker");
  //     var instances = M.Datepicker.init(elems, {});
  //   });
  // }

  const handleSelect = (ranges) => {
    console.log(ranges.selection);
    setState([ranges.selection]);
    props.history.push({
      pathname: "/stockfilter",
      state: { date: ranges.selection },
    });
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };
  const getstock = (item) => {
    // console.log(item.selection.endDate);
    props.history.push({
      pathname: "/stockfilter",
      state: { date: item.selection },
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
      <NavBar titleone="Stock in Manager" />
      <DateRange
        editableDateInputs={false}
        onChange={(item) => {
          handleSelect(item);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      <DefinedRange
        dateDisplayFormat="MMM d, yyyy"
        onChange={(item) => getstock(item)}
        ranges={state}
      />
    </>
  );
  // }
}
