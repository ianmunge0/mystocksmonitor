import React, { Component } from "react";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import {getCashAtHand} from '../../Redux/Actions/profitAndExpenseActions'

class ProfitExpenseSummary extends Component {
  state = {
    adminemailorphonekey: 'ian@ian.com',
    currentshopkey: 'ashop',
    cfmanagerkey: 'currentcash',
    cashathand: ''
}
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getCashAtHand(this.state);
  }
  render() {

    return (
      <>
        <div class="card blue-grey darken-1">
          <div class="card-content white-text center">
            {/*<p>Profit Today</p> */}
            <p>Cash At Hand</p>
            <h5>{this.props.cashathand}/=</h5>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <h5 align="center">Profit/Loss = (Total Sales - Total Purchase) - Total Expenses - Total Bad Stock</h5>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getCashAtHand: (cashathandcreds) => dispatch(getCashAtHand(cashathandcreds))
  }
}

const mapStateToProps = (state) => {
  console.log('mappedstatestoprops',state.cashAtHand.cashathand);
  return {
     cashathand: state.cashAtHand.cashathand
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfitExpenseSummary);
