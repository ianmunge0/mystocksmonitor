import React, { useEffect } from "react";
import { getSingleProductSales } from "../../../Redux/Actions/Product";
import moment from "moment";
import { connect } from "react-redux";

import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import NoItems from "../../NoItems";

function SingleProductSales(props) {
  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth();
  };
  useEffect(() => {
    //get first date of the passed in month and year
    var firstDay = new Date(
      props.location.state.year,
      getMonth(props.location.state.monthname),
      1
    );
    // get last date of the passed in month and year
    var lastDay = new Date(
      props.location.state.year,
      getMonth(props.location.state.monthname) + 1,
      0
    );
    //format thee dates to readable dates by the database
    var fromtime = moment(firstDay).format("YYYY-MM-DD hh:mm:ss");
    var totime = moment(lastDay).format("YYYY-MM-DD hh:mm:ss");

    //call action to get the sales

    props.getSingleProductSales(
      props.location.state.data.stockserial_key,
      fromtime,
      totime,
      props.location.state.year
    );
  }, []);
  // console.log("data", props.productsales.data);
  //   return <></>;
  if (props.productsales.data) {
    var salesList = Object.keys(props.productsales.data).map(function (
      key,
      value
    ) {
      return (
        <div key={key}>
          <ListItemText
            style={{
              fontSize: 16,
              padding: 5,
              fontWeight: "bold",
              backgroundColor: "#E6ECF0",
            }}
            primary={<Typography variant="h5">{key}</Typography>}
            secondary={
              <>
                Cash: {props.productsales.data[key].cash} Credit:
                {props.productsales.data[key].credit}
              </>
            }
          />
          <ListItem alignItems="flex-start">
            <List style={{ width: "100%", paddingTop: 0 }}>
              {Object.keys(props.productsales.data[key].items).map(function (
                itemdata,
                keyy
              ) {
                return (
                  <div key={keyy}>
                    <ListItemText
                      key={keyy}
                      primary={
                        <Typography
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            paddingBottom: 10,
                          }}
                        >
                          {props.productsales.data[key].items[keyy].name}
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
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Qty:{" "}
                            {props.productsales.data[key].items[keyy].qtysold} @{" "}
                            {
                              props.productsales.data[key].items[keyy]
                                .onsalesellprice
                            }{" "}
                            ={" "}
                            {parseInt(
                              props.productsales.data[key].items[keyy]
                                .onsalesellprice
                            ) *
                              parseInt(
                                props.productsales.data[key].items[keyy].qtysold
                              )}
                            <br />
                            by ~{" "}
                            {props.productsales.data[key].items[keyy].attendant}
                          </Typography>
                        </>
                      }
                    />
                    <Divider />
                  </div>
                );
              })}
            </List>
          </ListItem>
        </div>
      );
    });
  }

  console.log("props", props);

  return (
    <div>
      {" "}
      <Loader fullPage loading={props.loading} />
      <div className="row">
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item xs>
            <Typography align="center">Total Cash</Typography>
            <Typography align="center">
              {props.productsales.total ? props.productsales.total : 0}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center">On Credit</Typography>
            <Typography align="center">
              {props.productsales.credit ? props.productsales.credit : 0}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center">On cash</Typography>
            <Typography align="center">
              {props.productsales.cash ? props.productsales.cash : 0}
            </Typography>
          </Grid>
        </Grid>
        <List style={{ padding: 0, margin: 0 }}>
          {!props.productsales.data ? <NoItems text="No sales yet" /> : ""}
          {salesList}
        </List>
      </div>
    </div>
  );
}
const mapDispacthToProps = (dispatch) => {
  return {
    getSingleProductSales: (id, fromtime, totime, year) =>
      dispatch(getSingleProductSales(id, fromtime, totime, year)),
    dispatch,
  };
};
const mapStateToProps = (state) => ({
  productsales: state.productsummary.productsales,
  loading: state.productsummary.loading,
});

export default connect(mapStateToProps, mapDispacthToProps)(SingleProductSales);
