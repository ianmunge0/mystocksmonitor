import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { getStockCountHistory } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import NavBar from "../../components/Navigations/NavBar";

function CountHistory(props) {
  useEffect(() => {
    props.getStockCountHistory(34);
  }, []);

  console.log("CountHistory ", props.loading);

  return (
    <>
      <NavBar titleone="Stock Count" />
      <ul className="collection">
        <Loader fullPage loading={props.loading} />
        {props.stocks["items"]
          ? props.stocks["items"].map((value, key) => (
              <li className="collection-item countitem" key={key}>
                <div className="row">
                  <span className="title left ">{value.display_day}</span>
                  <br />
                  <div className="left">
                    <h6>
                      {value.count}/{props.stocks["count"]} items counted
                    </h6>
                  </div>
                  <Link
                    to={`/counts/${parseInt(
                      (new Date(value.count_day).getTime() / 1000).toFixed(0)
                    )}`}
                    className="secondary-content right"
                  >
                    <i className="material-icons">remove_red_eye</i>
                  </Link>
                </div>
              </li>
            ))
          : ""}
      </ul>
    </>
  );
}

const mapStateToProps = (state) => ({
  stocks: state.stock.stockcounts,
  loading: state.stock.loading,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getStockCountHistory: (shopid) => dispatch(getStockCountHistory(shopid)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(CountHistory));
