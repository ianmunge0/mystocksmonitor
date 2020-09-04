import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Alert from "@material-ui/lab/Alert";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import NoItems from "../NoItems";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import StockItem from "./StockItem";
function AllStocks(props) {
  const rows = props.stocks;
  useEffect(() => {
    props.getStock();
  }, []);

  const [all, setAll] = useState(false);

  const [stocks, setStocks] = useState([]);

  const outofstock =
    props.stocks.length > 0
      ? props.stocks.filter((row) => parseInt(row.stock_qty) == 0)
      : "";
  const runningoutofstock =
    props.stocks.length > 0
      ? props.stocks.filter(
          (row) => parseInt(row.stock_qty) <= parseInt(row.reorder_level)
        )
      : [];
  return (
    <>
      <Button
        variation="outline"
        onClick={() => {
          props.history.push({
            pathname: "export",
          });
        }}
      >
        Export
      </Button>
      <Loader fullPage loading={props.waiting.loading} />
      {all ? (
        <Alert
          icon={false}
          severity="success"
          onClick={() => {
            props.dispatch({
              type: "GET_STOCK",
              stocks: stocks,
            });
            setAll(false);
          }}
        >
          Show All({stocks.length})
        </Alert>
      ) : (
        ""
      )}
      {outofstock.length > 0 ? (
        <Alert
          variant="filled"
          severity="error"
          onClick={() => {
            if (stocks.length === 0) {
              setStocks(props.stocks);
            }
            props.dispatch({
              type: "GET_STOCK",
              stocks: outofstock,
            });
            setAll(true);
          }}
          action={<ArrowForwardIosIcon />}
        >
          {outofstock.length} products are out of stock
        </Alert>
      ) : (
        ""
      )}
      {runningoutofstock.length > 0 ? (
        <Alert
          variant="filled"
          severity="warning"
          action={<ArrowForwardIosIcon />}
          onClick={() => {
            if (stocks.length === 0) {
              setStocks(props.stocks);
            }

            props.dispatch({
              type: "GET_STOCK",
              stocks: runningoutofstock,
            });
            setAll(true);
          }}
          style={{ marginTop: 10 }}
        >
          {runningoutofstock.length} products going out of stock
        </Alert>
      ) : (
        ""
      )}
      {props.stocks.length > 0 ? (
        props.stocks.map((row, index) => {
          return <StockItem row={row} key={index} />;
        })
      ) : (
        <NoItems text="No stocks yet" />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
  waiting: state.stock,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getStock: () => dispatch(getStock()),
    dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(AllStocks));
