import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DefinedRange } from "react-date-range";
import { DateRange } from "react-date-range";
const ProfitExpensesManager = (props) => {
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
      state: { date: item.selection },
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
      <div className="row">
        <DefinedRange
          onChange={(item) => getProfitExpense(item)}
          ranges={state}
        />
      </div>
    </>
  );
  // }
};

export default withRouter(ProfitExpensesManager);
