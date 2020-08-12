import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getEnPSummary } from "../../Redux/Actions/ProfitnExpenses";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import moment from "moment";

function ProfitExpenseSummary(props) {
  var fromtimestamp = props.location.state.fromdate;
  var totimestamp = props.location.state.todate;

  useEffect(() => {
    var item = {};
    item.action = "profitexpense";

    item.fromtimestamp = moment(fromtimestamp).format("YYYY-MM-DD hh:mm:ss");
    item.totimestamp = moment(totimestamp).format("YYYY-MM-DD hh:mm:ss");
    item.shopid = reactLocalStorage.getObject("userdata").default_shop;
    props.getEnPSummary(item);
  }, []);
  console.log("pp", props.location.state.date);
  return (
    <>
      <Loader fullPage loading={props.loading} />
      {props.profitnexpense.profitnexpense ? (
        <div className="expensetom">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text center">
              <p>Profit Today</p>
              <h5>{props.profitnexpense.profitnexpense.generalprofit}/=</h5>
            </div>
          </div>
          <div className="row">
            <ul className="collection">
              <Link
                to={{
                  pathname: "/cashsaleshistory",
                  state: {
                    items: props.profitnexpense.profitnexpense.cashsalesitems,
                    cash: props.profitnexpense.profitnexpense.oncash,
                    credit: props.profitnexpense.profitnexpense.oncredit,
                  },
                }}
                className="collection-item"
              >
                <div className="row">
                  <div className="col s6">
                    <h5>Cash sales</h5>
                    <p>sales summary</p>
                  </div>
                  <div className="col s6">
                    <h5 className="right">
                      {props.profitnexpense.profitnexpense.cashsales}/=
                    </h5>
                  </div>
                </div>
              </Link>
              <li className="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Total Purchases</h5>
                    <p>Total Purchases</p>
                  </div>
                  <div className="col s6">
                    <h5 className="right">
                      {props.profitnexpense.profitnexpense.salesprofit}/=
                    </h5>
                  </div>
                </div>
              </li>
              <li className="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Expenses</h5>
                  </div>
                  <div className="col s6">
                    <h5 className="right">
                      {props.profitnexpense.profitnexpense.badstockvalue}/=
                    </h5>
                  </div>
                </div>
              </li>
              <li className="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Bad Stock</h5>
                  </div>
                  <div className="col s6">
                    <h5 className="right">
                      {props.profitnexpense.profitnexpense.expense}/=
                    </h5>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  profitnexpense: state.profitnexpense,
  loading: state.profitnexpense.loading,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getEnPSummary: (payload) => dispatch(getEnPSummary(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(ProfitExpenseSummary);
