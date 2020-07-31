import React, { useState } from "react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DefinedRange } from "react-date-range";
import { DateRange } from "react-date-range";
import NavBar from "../components/Navigations/NavBar";
export default function SalesManager(props) {
  // componentDidMount() {
  //   document.addEventListener("DOMContentLoaded", function () {
  //     var elems = document.querySelectorAll(".datepicker");
  //     var instances = M.Datepicker.init(elems, {});
  //   });
  // }

  const handleSelect = (ranges) => {
    // console.log(ranges.selection);
    setState([ranges.selection]);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

  // render() {
  //   const selectionRange = {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: "selection",
  //   };

  const selectedSalesDate = (item) => {
    props.history.push({
      pathname: "/salesreceipts",
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
      {/* <NavBar titleone="Sales Manager" action="salesmanager" /> */}
      <DateRange
        editableDateInputs={false}
        onChange={(item) => {
          selectedSalesDate(item);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      <DefinedRange
        onChange={(item) => selectedSalesDate(item)}
        ranges={state}
      />
    </>
  );
  // }
}
