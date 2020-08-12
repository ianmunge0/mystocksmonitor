import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import { getReport } from "../Redux/Actions/Reports";
import { connect } from "react-redux";
import NavBar from "../components/Navigations/NavBar";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import moment from "moment";

function StockFilter(props) {
  // const [cash, setCash] = useState(0);
  var fromtimeStamp = props.location.state.fromdate;
  var totimestamp = props.location.state.todate;
  console.log("StockFilter", (fromtimeStamp, totimestamp));

  useEffect(() => {
    M.Modal.init(document.querySelectorAll(".modal"), {
      onOpenEnd: function (el) {},
    });
    console.log(fromtimeStamp, totimestamp);
    props.getReport(fromtimeStamp, totimestamp);
  }, []);

  // var fromdateString = moment(Date.parse(props.startDate)).format("LLLL");

  const deleteProduct = (item) => {
    // props.deleteStock(item);
  };

  return (
    <>
      {/* <NavBar titleone="Stock in Report  " titletwo={fromdateString} /> */}

      <div>
        <Loader fullPage loading={props.reports.loading} />
        {props.reports.stocks.items && props.reports.stocks.items.length ? (
          <>
            <div
              className="nav-wrapper z-depth-3"
              style={{ padding: 5, marginTop: 10 }}
            >
              <form>
                <div className="input-field">
                  <input
                    placeholder="quick search"
                    id="search"
                    // onChange={onText}
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
            <div className="container">
              <div className="row">
                <div className="col s3 center">
                  <h6>Entries</h6>
                  <h6>
                    {props.reports.stocks.items
                      ? props.reports.stocks.items.length
                      : 0}
                  </h6>
                </div>
                <div className="col s5 center">
                  <h6>On Credit</h6>
                  <h6>{props.reports.stocks.credit}</h6>
                </div>
                <div className="col s4 center">
                  <h6>On cash</h6>
                  <h6>{props.reports.stocks.cash}</h6>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h5>no products</h5>
        )}
        <div className="section modal-trigger " data-target="editmodal">
          <div className="container">
            {props.reports.stocks.items
              ? props.reports.stocks.items.map((value, index) => (
                  <div className="row" key={index}>
                    <div className="col s12">
                      <h6 style={{ fontWeight: "bold" }}>
                        {value.name} ~{" "}
                        <span className="green-text">{value.status}</span>
                      </h6>
                      <div>
                        qty {value.stock_qty} x {value.buyingprice} =
                        {value.stock_qty * value.buyingprice}/=
                      </div>
                    </div>
                    <div className="col s12">
                      <div className="col s6 stocktxt">
                        {/* <p>~ by fred</p> */}
                        <p>supplier ~ {value.supplier_name} </p>
                      </div>
                      <div className="col s6 stocktxt">
                        <p className="stocktxt right" style={{ fontSize: 10 }}>
                          {value.date_time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="divider"></div>
      </div>

      <div className="col s12">
        <div id="editmodal" className="modal bottom-sheet">
          <div className="modal-content sidenav bottom-modal">
            <ul>
              <li>
                <Link to="editstock">
                  <i className="material-icons">edit</i>Product History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  reports: state.reports,
});
const mapDispacthToProps = (dispatch) => {
  return {
    getReport: (timeStamp, totimestamp) =>
      dispatch(getReport(timeStamp, totimestamp)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(StockFilter));
