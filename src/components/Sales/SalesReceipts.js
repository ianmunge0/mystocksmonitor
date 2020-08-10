import React, { useEffect } from "react";
import NavBar from "../../components/Navigations/NavBar";
import moment from "moment";
import { getSalesReceipts } from "../../Redux/Actions/SalesReceipts";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function SalesReceipts(props) {
  var fromtimeStamp = props.location.state.fromdate;
  var totimestamp = props.location.state.todate;
  console.log("ss 1", fromtimeStamp);
  console.log("ss 2", totimestamp);

  useEffect(() => {
    props.getSalesReceipts(fromtimeStamp, totimestamp, "");
  }, []);

  console.log("list sales", props.receipts.receipts);
  var salesList = Object.keys(props.receipts.receipts).map(function (
    value,
    key
  ) {
    return (
      <li
        onClick={() => {
          props.history.push({
            pathname: "/singlereceipt",
            state: {
              data: props.receipts.receipts[value],
              receiptno: value,
              user: props.receipts.receipts[value].user,
            },
          });
          // props.history.push("/singlereceipt");
        }}
        className="collection-item avatar"
        key={key}
      >
        <img
          alt="test"
          className="circle responsive-img"
          src="/images/product.png"
        />
        <span className="title" style={{ fontWeight: "bold" }}>
          Receipt No: #{value}
        </span>
        <p>
          {/* Items: {props.receipts.receipts[value].items.length}, Total:{" "} */}
          {props.receipts.receipts[value].total}, Cash:
          {props.receipts.receipts[value].cash}, Credit:
          {props.receipts.receipts[value].credit} <br />
          by ~ {props.receipts.receipts[value].user} |{" "}
          {props.receipts.receipts[value].date}
        </p>
      </li>
    );
  });

  return (
    <>
      {/* <NavBar titleone="Sales " /> */}
      <Loader fullPage loading={props.receipts.loading} />
      <div className="row">
        <ul className="collection">
          {salesList.length > 0 ? (
            salesList
          ) : (
            <div style={{ margin: 20 }}>
              <h5>No sales yet</h5>
            </div>
          )}
        </ul>
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
