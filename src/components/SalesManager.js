import React from "react";

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

function SalesManager(props) {
  const selectedSalesDate = (item) => {
    props.history.push({
      pathname: "/salesreceipts",
      state: {
        fromdate: item.selection.startDate,
        todate: item.selection.endDate,
      },
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <DateRange
        editableDateInputs={false}
        onChange={(item) => {
          selectedSalesDate(item);
        }}
        moveRangeOnFirstSelection={false}
      />
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
    </>
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
