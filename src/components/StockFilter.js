import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { getReport } from "../Redux/Actions/Reports";
import { deleteStockIn } from "../Redux/Actions/StockIn";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import { Typography, Divider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import NoItems from "./NoItems";
import StockReportItem from "./Common/StockReportItem";

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
function StockFilter(props) {
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };
  var month = options[d.getMonth()];
  const input = getMonth(month) + "-" + d.getFullYear();
  const output = moment(input, "MM-YY");

  // const [cash, setCash] = useState(0);
  var fromtimeStamp = props.location.state && props.location.state.fromdate;
  var totimestamp = props.location.state && props.location.state.todate;
  if (props.location.state === "today" || props.today) {
    fromtimeStamp = new Date();
    totimestamp = new Date();
  }

  if (props.location.state === "month") {
    fromtimeStamp = moment(output.startOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    totimestamp = moment(output.endOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
  }

  console.log(props.location.state);
  console.log(fromtimeStamp, totimestamp);

  useEffect(() => {
    props.getReport(fromtimeStamp, totimestamp);
  }, []);

  const deleteStock = (stock) => {
    props.deleteStockIn(stock, fromtimeStamp, totimestamp);
  };

  var tifOptions = null;
  console.log("filter ", props.reports);
  if (props.reports.stocks["items"]) {
    tifOptions = Object.keys(props.reports.stocks["items"]).map((key) => (
      <div key={key}>
        <Typography
          variant="h6"
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          {key}
        </Typography>
        {props.reports.stocks["items"][key].length > 0 ? (
          props.reports.stocks["items"][key].map((value, index) => (
            <StockReportItem
              deleteStock={deleteStock}
              value={value}
              key={index}
            />
          ))
        ) : (
          <NoItems text="no stocks yet" />
        )}
      </div>
    ));
  } else {
    return (
      <>
        <NoItems text="No Stocks Added Yet" />
        <Loader fullPage loading={props.reports.loading} />
      </>
    );
  }

  return (
    <div>
      {props.reports.stocks["items"] ? (
        <>
          <Grid container style={{ marginTop: 20, marginBotton: 10 }}>
            <Grid item xs>
              <Typography align="center">Entries</Typography>
              <Typography align="center">
                {props.reports.stocks.count}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography align="center">On Credit</Typography>
              <Typography align="center">
                {props.reports.stocks.credit}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography align="center">On cash</Typography>
              <Typography align="center">
                {props.reports.stocks.cash}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </>
      ) : (
        <Typography variant="h5" style={{ margin: 30 }}>
          No Stocks
        </Typography>
      )}
      {tifOptions}
    </div>
  );
}
const mapStateToProps = (state) => ({
  reports: state.reports,
});
const mapDispacthToProps = (dispatch) => {
  return {
    getReport: (timeStamp, totimestamp) =>
      dispatch(getReport(timeStamp, totimestamp)),
    deleteStockIn: (item, fromtimeStamp, totimestamp) =>
      dispatch(deleteStockIn(item, fromtimeStamp, totimestamp)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(StockFilter);
