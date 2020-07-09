import React, { useState } from "react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DefinedRange } from "react-date-range";
import { DateRange } from "react-date-range";
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
    props.history.push("/stockfilter");
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };
  const getstock = (item) => {
    console.log(item.selection);
    props.history.push("/stockfilter");
  };

  // render() {
  //   const selectionRange = {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: "selection",
  //   };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  return (
    <div className="container">
      <div className="row">
        <DateRange
          editableDateInputs={false}
          onChange={(item) => {
            handleSelect(item);
          }}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <div className="row">
        <DefinedRange onChange={(item) => getstock(item)} ranges={state} />
      </div>
    </div>
  );
  // }
}
