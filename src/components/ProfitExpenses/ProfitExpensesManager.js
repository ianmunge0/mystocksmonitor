import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DefinedRange } from "react-date-range";
import { DateRange } from "react-date-range";
const ProfitExpensesManager = (props) => {
  // componentDidMount() {
  //   document.addEventListener("DOMContentLoaded", function () {
  //     var elems = document.querySelectorAll(".datepicker");
  //     var instances = M.Datepicker.init(elems, {});
  //   });
  // }

  const handleSelect = (ranges) => {
    console.log(ranges.selection);
    setState([ranges.selection]);
    props.history.push("/profitexpensesummary");
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

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const getProfitExpense = (item) => {
    console.log(item.selection);
    props.history.push("/profitexpensesummary");
  };

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
        <DefinedRange
          onChange={(item) => getProfitExpense(item)}
          ranges={state}
        />
      </div>
    </div>
  );
  // }
};

export default withRouter(ProfitExpensesManager);
