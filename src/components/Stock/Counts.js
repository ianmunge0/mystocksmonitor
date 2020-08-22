import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountHistory, filter } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";

function Counts(props) {
  const timestamp = props.match.params.timestamp;
  var data = props.stocks.items;
  useEffect(() => {
    props.getCountHistory(timestamp);
  }, []);

  const [sto, setSto] = useState({});

  const onText = (e) => {
    if (e.target.value === "") {
      props.getCountHistory(timestamp);
    } else {
      props.filter(props.stocks, e.target.value);
    }
  };
  // data = props.filteredstock;
  console.log("all ", props);

  return (
    <>
      {/* <NavBar titleone="Stock Count" /> */}
      <div className="nav-wrapper z-depth-3" style={{ padding: 5 }}>
        <Loader fullPage loading={props.loading} />
        <form>
          <TextField
            onChange={onText}
            variant="outlined"
            fullWidth
            type="search"
            placeholder="quick search"
          />
        </form>
      </div>

      <div style={{ padding: 15, background: "#F4F5F8" }}>
        <Grid item xs={12}>
          <h4 style={{ margin: 7 }}>{props.stocks.title}</h4>
        </Grid>
        <Grid container>
          <Grid item xs align="center">
            Over Stocked: <br />
            {props.stocks.over_stocked}
          </Grid>
          <Grid item xs align="center">
            Under Stocked: <br />
            {props.stocks.under_stocked}
          </Grid>
          <Grid item xs align="center">
            Balanced: <br />
            {props.stocks.balanced}
          </Grid>
        </Grid>
      </div>
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        {data
          ? data.map((item, key) => (
              <div key={key}>
                <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                  <Grid item xs={12}>
                    <h3 style={{ margin: 5 }}>{item.name}</h3>
                  </Grid>
                  Previous count ~ {item.previouscount}, current count ~{" "}
                  {item.currentcount}, Status ~
                  {item.currentcount < item.previouscount ? (
                    <span className="orange-text">
                      {" "}
                      overstocked - {item.quantitysupplied}
                    </span>
                  ) : item.currentcount === item.previouscount ? (
                    <span className="green-text"> balanced</span>
                  ) : (
                    <span className="red-text">
                      {" "}
                      under stocked - {item.quantitysupplied}
                    </span>
                  )}
                </Grid>
                <Divider />
              </div>
            ))
          : ""}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  stocks: state.stock.stockcounthistory,
  filteredstock: state.stock.filteredstocks,
  loading: state.stock.loading,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getCountHistory: (shopid) => dispatch(getCountHistory(shopid)),
    filter: (data, string) => dispatch(filter(data, string)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Counts);
