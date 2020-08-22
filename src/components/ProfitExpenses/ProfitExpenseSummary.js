import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEnPSummary } from "../../Redux/Actions/ProfitnExpenses";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider, Typography } from "@material-ui/core";

function ProfitExpenseSummary(props) {
  var fromtimestamp = props.location.state.fromdate;
  var totimestamp = props.location.state.todate;
  var type = props.location.state.type;

  console.log("ProfitExpenseSummary", props);

  useEffect(() => {
    if (props.location.state === "today") {
      fromtimestamp = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      totimestamp = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    }

    filterEnSummary(fromtimestamp, totimestamp);
  }, []);

  const filterEnSummary = (fromtimestamp, totimestamp) => {
    var item = {};
    item.action = "profitexpense";
    console.log("inisde ", fromtimestamp);

    item.fromtimestamp = fromtimestamp;
    item.totimestamp = totimestamp;
    item.shopid = reactLocalStorage.getObject("userdata").default_shop;
    props.getEnPSummary(item);
  };

  return (
    <>
      <Loader fullPage loading={props.loading} />
      {props.profitnexpense.profitnexpense ? (
        <div className="expensetom">
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <Typography align="center">
                    Profit{" "}
                    {type === "monthly"
                      ? "From " +
                        moment(
                          parseInt(new Date(fromtimestamp).getTime().toFixed(0))
                        ).format("MMMM DD, yyyy") +
                        " to " +
                        moment(
                          parseInt(new Date(totimestamp).getTime().toFixed(0))
                        ).format("MMMM DD, yyyy")
                      : type === "day"
                      ? moment(
                          parseInt(new Date(fromtimestamp).getTime().toFixed(0))
                        ).format("MMMM DD, yyyy")
                      : " Today"}
                  </Typography>
                }
                secondary={
                  <Typography variant="h6" align="center">
                    {props.profitnexpense.profitnexpense.generalprofit} /=
                  </Typography>
                }
              />
            </ListItem>
          </List>
          <Divider />

          <List>
            <ListItem
              onClick={() =>
                props.history.push({
                  pathname: "/cashsaleshistory",
                  state: {
                    items: props.profitnexpense.profitnexpense.cashsalesitems,
                    cash: props.profitnexpense.profitnexpense.oncash,
                    credit: props.profitnexpense.profitnexpense.oncredit,
                  },
                })
              }
            >
              <ListItemText
                primary={<Typography variant="h5">Cash sales</Typography>}
                secondary="View profit and expenses summary"
              />
              <ListItemText
                primary={
                  <h5 align="right">
                    {props.profitnexpense.profitnexpense.cashsales}
                  </h5>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={<Typography variant="h5">Sales profit</Typography>}
                secondary="Sales profit"
              />
              <ListItemText
                primary={
                  <h5 align="right">
                    {props.profitnexpense.profitnexpense.salesprofit}
                  </h5>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={<Typography variant="h5">Bad Stocks</Typography>}
                secondary="View profit and expenses summary"
              />
              <ListItemText
                primary={
                  <h5 align="right">
                    {props.profitnexpense.profitnexpense.badstockvalue}
                  </h5>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={<Typography variant="h5">Expenses</Typography>}
              />
              <ListItemText
                primary={
                  <h5 align="right">
                    {props.profitnexpense.profitnexpense.expense}
                  </h5>
                }
              />
            </ListItem>
          </List>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  profitnexpense: state.profitnexpense,
  loading: state.profitnexpense.loading,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getEnPSummary: (payload) => dispatch(getEnPSummary(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(ProfitExpenseSummary);
