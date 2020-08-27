import React, { useEffect } from "react";
import moment from "moment";
import {
  getSalesReceipts,
  deleteReceipt,
} from "../../Redux/Actions/SalesReceipts";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import NoItems from "../NoItems";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { UnlockAccess } from "../Common/UnlockAccess";
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

  useEffect(() => {
    props.getSalesReceipts(fromtimeStamp, totimestamp, "");
  }, []);
  if (!props.receipts.receipts.days)
    return <Loader fullPage loading={props.receipts.loading} />;
  var salesList = Object.keys(props.receipts.receipts.days).map(function (
    value,
    key
  ) {
    return (
      <div key={key}>
        <div
          style={{
            fontSize: 16,
            padding: 5,
            fontWeight: "bold",
            backgroundColor: "#afa3a3",
          }}
        >
          <Typography variant={"h6"}>
            {console.log(
              "totals",
              props.receipts.receipts.days[value].receipts
            )}
            {value}
          </Typography>
          <Typography>
            Cash: {props.receipts.receipts.days[value].totalcash} Credit:
            {props.receipts.receipts.days[value].totalcredit}
          </Typography>
        </div>
        <ListItem alignItems="flex-start">
          <List style={{ width: "100%", paddingTop: 0 }}>
            {Object.keys(props.receipts.receipts.days[value].receipts).map(
              function (itemdata, key) {
                return (
                  <div key={key}>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Grid item xs={6} align="center">
                            <Typography style={{ fontWeight: "bold" }}>
                              Receipt No: #{itemdata}
                            </Typography>
                          </Grid>
                          <UnlockAccess request={["DELETE_SALES"]}>
                            <Grid item xs={6}>
                              <IconButton
                                style={{ padding: 0, float: "right" }}
                                onClick={() => {
                                  props.deleteReceipt(itemdata, props);
                                }}
                                edge="end"
                                aria-label="delete"
                              >
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Grid>
                          </UnlockAccess>
                        </Grid>
                      }
                      onClick={() => {
                        props.history.push({
                          pathname: "/singlereceipt",
                          state: {
                            data:
                              props.receipts.receipts.days[value].receipts[
                                itemdata
                              ],
                            receiptno: itemdata,
                            user:
                              props.receipts.receipts.days[value].receipts[
                                itemdata
                              ].user,
                          },
                        });
                      }}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Items:{" "}
                            {
                              props.receipts.receipts.days[value].receipts[
                                itemdata
                              ].items.length
                            }
                            , Total:{" "}
                          </Typography>
                          {
                            props.receipts.receipts.days[value].receipts[
                              itemdata
                            ].receipttotal
                          }
                          , On Cash:
                          {
                            props.receipts.receipts.days[value].receipts[
                              itemdata
                            ].receiptcashcount
                          }
                          , On Credit:
                          {
                            props.receipts.receipts.days[value].receipts[
                              itemdata
                            ].receiptcreditcount
                          }{" "}
                          <br />
                          by ~{" "}
                          {
                            props.receipts.receipts.days[value].receipts[
                              itemdata
                            ].user
                          }
                        </React.Fragment>
                      }
                    />
                    <Divider />
                  </div>
                );
              }
            )}
          </List>
        </ListItem>
      </div>
    );
  });

  return (
    <>
      <Loader fullPage loading={props.receipts.loading} />
      <Grid container>
        <Grid item xs={6} align="center">
          <Typography style={{ fontSize: 16, marginTop: 10 }}>
            Total On Credit: <br />
            {props.receipts.receipts.totalcredit}
          </Typography>
        </Grid>
        <Grid item xs={6} align="center">
          <Typography style={{ fontSize: 16, marginTop: 10 }}>
            Total Cash Sales: <br />
            {props.receipts.receipts.totalcash}
          </Typography>
        </Grid>
      </Grid>
      <List>
        {salesList.length > 0 ? salesList : <NoItems text="No sales yet" />}
      </List>
    </>
  );
}

const mapStateToProps = (state) => ({
  receipts: state.receipts,
});
const mapDispacthToProps = (dispatch) => {
  return {
    deleteReceipt: (receiptno, props) =>
      dispatch(deleteReceipt(receiptno, props)),
    getSalesReceipts: (timeStamp, totimestamp, type) =>
      dispatch(getSalesReceipts(timeStamp, totimestamp, type)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(SalesReceipts);
