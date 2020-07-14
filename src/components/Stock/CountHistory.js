import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getStockCountHistory } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function CountHistory() {
  return (
    <ul className="collection">
      <li className="collection-item countitem">
        <div className="row">
          <span className="title left ">Monday, July 6, 2020</span>
          <br />
          <div className="left">
            <h6>1/10 items counted</h6> 0 - over stocked, 10 - under stocked,
          </div>
          <Link to="count" className="secondary-content right">
            <i className="material-icons">remove_red_eye</i>
          </Link>
        </div>
      </li>
    </ul>
  );
}

const mapStateToProps = (state) => ({
  stocks: state,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getStockCountHistory: (shopid) => dispatch(getStockCountHistory(shopid)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(CountHistory);
