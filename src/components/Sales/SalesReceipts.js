import React, { useEffect } from "react";
import moment from "moment";
import { getSalesReceipts } from "../../Redux/Actions/SalesReceipts";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import NoItems from "../NoItems";
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
function SalesReceipts(props) {
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  var month = options[d.getMonth()];
  const input = getMonth(month) + "-" + d.getFullYear();
  const output = moment(input, "MM-YY");
  var fromtimeStamp = props.location.state.fromdate;
  var totimestamp = props.location.state.todate;
  console.log(props);

  if (props.location.state === "today") {
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

  console.log("ss 1", fromtimeStamp);
  console.log("ss 2", totimestamp);

  useEffect(() => {
    props.getSalesReceipts(fromtimeStamp, totimestamp, "");
  }, []);

  console.log("list sales", props.receipts);
  var salesList = Object.keys(props.receipts.receipts).map(function (
    value,
    key
  ) {
    return (
      <div key={key}>
        <Typography
          variant={"h6"}
          style={{
            marginLeft: 10,
            fontSize: 16,
            padding: 5,
            fontWeight: "bold",
            backgroundColor: "#afa3a3",
          }}
        >
          {value}
        </Typography>
        <ListItem alignItems="flex-start">
          <List style={{ width: "100%", paddingTop: 0 }}>
            {Object.keys(props.receipts.receipts[value]).map(function (
              itemdata,
              key
            ) {
              return (
                <>
                  <ListItemText
                    primary={
                      <Typography style={{ fontWeight: "bold" }}>
                        Receipt No: #{itemdata}
                      </Typography>
                    }
                    onClick={() => {
                      props.history.push({
                        pathname: "/singlereceipt",
                        state: {
                          data: props.receipts.receipts[value][itemdata],
                          receiptno: itemdata,
                          user: props.receipts.receipts[value][itemdata].user,
                        },
                      });
                    }}
                    key={key}
                    secondary={
                      // console.log(
                      //   props.receipts.receipts[value][itemdata]["items"]
                      // )
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Items:{" "}
                          {
                            props.receipts.receipts[value][itemdata]["items"]
                              .length
                          }
                          , Total:{" "}
                        </Typography>
                        {props.receipts.receipts[value][itemdata].total}, Cash:
                        {props.receipts.receipts[value][itemdata].cash}, Credit:
                        {props.receipts.receipts[value][itemdata].credit} <br />
                        by ~ {
                          props.receipts.receipts[value][itemdata].user
                        } | {props.receipts.receipts[value][itemdata].date}
                      </React.Fragment>
                    }
                  />
                  <Divider />
                </>
              );
            })}
          </List>
        </ListItem>
      </div>
    );
  });

  return (
    <>
      {/* <NavBar titleone="Sales " /> */}
      <Loader fullPage loading={props.receipts.loading} />
      <div className="row">
        <List>
          {salesList.length > 0 ? salesList : <NoItems text="No sales yet" />}
        </List>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  receipts: state.receipts,
});
const mapDispacthToProps = (dispatch) => {
  return {
    getSalesReceipts: (timeStamp, totimestamp, type) =>
      dispatch(getSalesReceipts(timeStamp, totimestamp, type)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(SalesReceipts);
