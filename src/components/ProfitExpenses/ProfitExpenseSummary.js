import React, { Component } from "react";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import {getCashAtHand} from '../../Redux/Actions/profitAndExpenseActions'
import {sendSalesDetails} from '../../Redux/Actions/profitAndExpenseActions'

class ProfitExpenseSummary extends Component {
  state = {
    startDate: '',
    endDate: '',
    profit: '',
    sales: '',
    purchases: '',
    expenses: '',
    badstock: '',
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    
    console.log("pesummaryprops",this.props.location.state.date);
    
    var cashathandcreds = {
      startDate: this.props.location.state.date.startDate,
      endDate: this.props.location.state.date.endDate
    }
    this.props.getCashAtHand(cashathandcreds);
  }
  dispatchingSales(salesdetails){
    console.log("salestodispatch",this.props);
    //this.props.sendSalesDetails();
    
  }
  render() {

    return (
      <>
        <div class="card blue-grey darken-1">
          <div class="card-content white-text center">
          <p>Profit Today{/*ofperiod */}</p>
            <h5>{this.props.profit}/=</h5>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <h6 align="center">Profit/Loss = (Total Sales - Total Purchase) - Total Expenses - Total Bad Stock</h6>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <ul class="collection">
              <Link to="cashsaleshistory" class="collection-item" onClick={() => this.dispatchingSales(this.props)}>
                <div className="row">
                  <div className="col s6">
                    <h5>Cash sales</h5>
                    <p>sales summary</p>
                  </div>
                  <div className="col s6">
                    <h5 className="right">{this.props.sales}/=</h5>
                  </div>
                </div>
              </Link>
              <Link to="purchases" class="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Total Purchases</h5>
                    <p>Total Purchases</p>
                  </div>
                  <div className="col s6">
                    <h5 className="right">{this.props.purchases}/=</h5>
                  </div>
                </div>
              </Link>
              
              <Link to="expenses" class="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Expenses</h5>
                  </div>
                  <div className="col s6">
                    <h5 className="right">{this.props.expenses}/=</h5>
                  </div>
                </div>
              </Link>
              <Link to="badstock" class="collection-item">
                <div className="row">
                  <div className="col s6">
                    <h5>Bad Stock</h5>
                  </div>
                  <div className="col s6">
                    <h5 className="right">{this.props.badstock}/=</h5>
                  </div>
                </div>
              </Link>
              
            </ul>
          </div>
        </div>
      </>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getCashAtHand: (cashathandcreds) => dispatch(getCashAtHand(cashathandcreds)),
    sendSalesDetails: () => dispatch(sendSalesDetails())
  }
}

const mapStateToProps = (state) => {
  console.log('mappedstatestoprops',state);
  return {
    profit: state.cashAtHand.profit,
    sales: state.cashAtHand.sales,
    purchases: state.cashAtHand.purchases,
    expenses: state.cashAtHand.expenses,
    badstock: state.cashAtHand.badstock,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfitExpenseSummary);
