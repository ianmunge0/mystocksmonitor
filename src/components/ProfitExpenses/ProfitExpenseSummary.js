import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProfitExpenseSummary extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <div class="card blue-grey darken-1">
          <div class="card-content white-text center">
            <p>Profit Today</p>
            <h5>0/=</h5>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <ul class="collection">
              <Link to="cashsaleshistory" class="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Cash sales</h5>
                    <p>sales summary</p>
                  </div>
                  <div className="col s6">
                    <h5 className="right">0/=</h5>
                  </div>
                </div>
              </Link>
              <li class="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Sales profit</h5>
                    <p>sales profie</p>
                  </div>
                  <div className="col s6">
                    <h5 className="right">0/=</h5>
                  </div>
                </div>
              </li>
              <li class="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Bad Stock</h5>
                  </div>
                  <div className="col s6">
                    <h5 className="right">0/=</h5>
                  </div>
                </div>
              </li>
              <li class="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Expenses</h5>
                  </div>
                  <div className="col s6">
                    <h5 className="right">0/=</h5>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
