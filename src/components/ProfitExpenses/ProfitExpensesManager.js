import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import moment from "moment";
import Item from "../../components/Item";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Months from "../Months";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import { grantPermission } from "../Common/GrantPermission";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
  },
  fab: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

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
  const classes = useStyles();
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
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
    <div className={classes.root}>
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
      {grantPermission(["ADD_EXPENSES"]) && (
        <Zoom
          onClick={() => {
            props.history.push({
              pathname: "/expenses",
            });
          }}
          key="primary"
          in={true}
          timeout={transitionDuration}
          unmountOnExit
        >
          <Fab aria-label="Add" className={classes.fab} color="primary">
            <AddIcon />
          </Fab>
        </Zoom>
      )}

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
    </div>
  );
  // }
};

export default withRouter(ProfitExpensesManager);
