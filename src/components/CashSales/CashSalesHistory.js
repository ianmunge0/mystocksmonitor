import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import SearchBar from "material-ui-search-bar";
import { Divider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  // },
});
function CashSalesHistory(props) {
  var items = props.location.state.items;
  useEffect(() => {
    props.dispatch({
      type: "GET_EXPENSES",
      response: items,
    });
  }, []);
  // render() {
  // console.log(props.location.state);
  const filterStock = (e) => {
    // if (e.target.value.length === " ") return;
    props.dispatch({
      type: "FILTER_SALES",
      payload: {
        items: props.location.state.items,
        text: e.target.value,
      },
    });
  };
  const classes = useStyles();
  console.log("profitnexpense", props.profitnexpense);
  return (
    <div className="row" style={{ margin: 10 }}>
      <SearchBar onChange={filterStock} />
      {props.profitnexpense.profitnexpense.length > 0 ? (
        <>
          <Grid container style={{ margin: 10 }}>
            <Grid item xs={4} align="center">
              Entries:
              <br />
              {props.profitnexpense.profitnexpense.length}
            </Grid>
            <Grid item xs={4} align="center">
              On Credit: <br />
              {props.profitnexpense.profitnexpense.length > 0
                ? props.profitnexpense.profitnexpense.filter((p) =>
                    p.cashorcredit.includes("credit")
                  ).length
                : "0"}
            </Grid>
            <Grid item xs={4} align="center">
              Cash Sales: <br />
              {props.profitnexpense.profitnexpense.length > 0
                ? props.profitnexpense.profitnexpense.filter((p) =>
                    p.cashorcredit.includes("cash")
                  ).length
                : "0"}
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Name <br /> Qty @ item cost = total
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    <span>Served By </span>
                    <br />
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.profitnexpense.profitnexpense.length > 0
                  ? props.profitnexpense.profitnexpense.map((value, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {value.name} <br />
                          {value.qtysold} @ {value.onsalesellprice} ={" "}
                          {parseInt(value.qtysold) *
                            parseInt(value.onsalesellprice)}{" "}
                          /=
                        </TableCell>
                        <TableCell align="right">
                          {value.username}
                          <br />
                          <span style={{ fontSize: 12 }}>
                            {value.date_time}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h6 className="center" style={{ padding: 20 }}>
          No sales yet
        </h6>
      )}
    </div>
  );
  // }
}
const mapStateToProps = (state) => ({
  profitnexpense: state.profitnexpense,
});
export default connect(mapStateToProps)(CashSalesHistory);
