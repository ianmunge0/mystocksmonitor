import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountHistory, filter } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import NavBar from "../../components/Navigations/NavBar";

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
      <NavBar titleone="Stock Count" />
      <div className="nav-wrapper z-depth-3" style={{ padding: 5 }}>
        <Loader fullPage loading={props.loading} />
        <form>
          <div className="input-field">
            <input
              placeholder="quick search"
              id="search"
              onChange={onText}
              type="search"
              required
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>

      <h5 style={{ padding: 15, background: "#F4F5F8" }}>
        {props.stocks.title ? props.stocks.title : "vv"}
        <ul className="row">
          <li className="col s4" style={{ fontSize: 10 }}>
            Over Stocked: {props.stocks.over_stocked}
          </li>
          <li className="col s4" style={{ fontSize: 10 }}>
            Under Stocked: {props.stocks.under_stocked}
          </li>
          <li className="col s4" style={{ fontSize: 10 }}>
            Balanced: {props.stocks.balanced}
          </li>
        </ul>
      </h5>
      <ul className="collection">
        {data
          ? data.map((item, key) => (
              <li className="collection-item countitem" key={key}>
                <div className="row">
                  <div className="col s6">
                    <div className="row">
                      <div className="col s12">
                        <span className="title left ">{item.name}</span>
                        <br />
                        <div className="left">
                          Previous count {item.previouscount}, current count{" "}
                          {item.currentcount},
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col s6">
                    <Link to="count" className="secondary-content right">
                      <i className="material-icons">remove_red_eye</i>
                    </Link>
                  </div>

                  <div className="col s12">
                    Status:
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
                  </div>
                </div>
              </li>
            ))
          : ""}
      </ul>
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
