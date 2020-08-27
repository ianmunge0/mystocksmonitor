import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import Item from "./Item";
import { connect } from "react-redux";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Months from "../components/Months";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import { grantPermission } from "./Common/GrantPermission";

import Zoom from "@material-ui/core/Zoom";

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
function SalesManager(props) {
  const classes = useStyles();
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const selectedSalesDate = (item) => {
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
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <DateRange
        editableDateInputs={false}
        onChange={(item) => {
          selectedSalesDate(item);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      {grantPermission(["ADD_SALES"]) && (
        <Zoom
          onClick={() => {
            props.history.push({
              pathname: "/newsale",
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
        description="View today's sales"
        className="datepicker"
        title="Today"
        route="salesreceipts"
        icon={<TodayIcon fontSize="large" />}
        data="today"
      />
      <Item
        description="View current month sales"
        className="datepicker"
        title="This Month"
        route="salesreceipts"
        icon={<DateRangeIcon fontSize="large" />}
        data="month"
      />
      <Item
        description="Sales by months"
        className="datepicker"
        title="Monthly Sales"
        icon={<CalendarTodayIcon fontSize="large" />}
        onClick={handleClickOpen}
      />
      <Months
        pathname="salesreceipts"
        fullScreen
        open={open}
        handleClose={handleClose}
      />
      {/* <Item
        description="Sales by months"
        className="datepicker"
        title="Monthly Sales"
        route="salesreceipts"
        icon={<CalendarTodayIcon fontSize="large" />}
        data="monthly"
      /> */}
      <Item
        description="Manage Customers"
        className="datepicker"
        title="Customers"
        route="customers"
        icon={<PeopleAltIcon fontSize="large" />}
        data="customers"
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  titles: state.titles,
});

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(SalesManager);
