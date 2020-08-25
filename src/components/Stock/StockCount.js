import React, { useEffect, useState } from "react";
import { getStock, saveStockCount } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  inputs: {
    marginRight: 15,
    paddingTop: 0,
    paddingBottom: 13,
  },
}));
function StockCount(props) {
  useEffect(() => {
    props.getStock(34);
  }, []);
  //   console.log(props.stocks.quantity);

  const [count, setCount] = useState([]);

  const handleCount = (v, e) => {
    console.log(e.target.id);

    setCount({
      ...count,
      [e.target.id]: e.target.value,
    });
  };

  const saveCount = (e, item, count) => {
    e.preventDefault();
    var countt = count[item.stockserial_key];
    props.saveStockCount(countt, item);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Loader fullPage loading={props.updateresponse.stock.loading} />

      <div className="collection-item">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            props.history.push({
              pathname: "/counthistory",
            });
          }}
        >
          <i className="material-icons left">remove_red_eye</i> View Count
          History
        </Button>
      </div>
      {props.stocks.length > 0
        ? props.stocks.map((item, key) => (
            <form
              onSubmit={(e) => saveCount(e, item, count)}
              key={key}
              style={{ marginTop: 20 }}
            >
              <Grid container>
                <Grid item xs>
                  <p style={{ fontSize: 16, marginTop: 0, marginBottom: 0 }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 12, marginTop: 0 }}>
                    System Count ({item.stock_qty} )
                  </p>
                </Grid>
                <Grid item xs>
                  <TextField
                    className={classes.inputs}
                    id={item.stockserial_key}
                    defaultValue={item.stock_qty}
                    onChange={(e) => handleCount(item.stockserial_key, e)}
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </form>
          ))
        : ""}
      {props.stocks.length == 0 ? <h5>No counts at the moment</h5> : " "}
    </div>
  );
}

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
  updateresponse: state,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getStock: (shopid) => dispatch(getStock(shopid)),
    saveStockCount: (count, item) => dispatch(saveStockCount(count, item)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(StockCount));
