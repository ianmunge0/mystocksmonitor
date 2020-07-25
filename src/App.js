import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { logout } from "./Redux/Actions";

import { Switch, Route } from "react-router-dom";
import StockSetup from "./components/StockSetup";
import EditStock from "./components/Stock/EditStock";
import NavBar from "./components/Navigations/NavBar";
import Dashboard from "./components/Dashboard";
import SideNavbar from "../src/components/Navigations/SideNavbar";
import StockInManager from "./components/StockInManager";
import SalesManager from "./components/SalesManager";
import ProfitExpensesManager from "./components/ProfitExpenses/ProfitExpensesManager";
import Singlecashflow from "./components/cashflow/Singlecashflow";
import ProfitExpenseSummary from "./components/ProfitExpenses/ProfitExpenseSummary";
import Attendants from "./components/Attendants/Attendants";
import AttendantsProfile from "./components/Attendants/Attendantprofile";
import CountHistory from "./components/Stock/CountHistory";
import Counts from "./components/Stock/Counts";
// import Count from "./components/Counts";
import DefaultPage from "./components/Initial/index";
import Login from "./components/Initial/Login";
import { useSelector } from "react-redux";
import Units from "./components/Units";
import CashSalesHistory from "./components/CashSales/CashSalesHistory";
import StockFilter from "./components/StockFilter";
import Register from "./components/Initial/Register";
import NewStock from "./components/Stock/NewStock";
import StockCount from "./components/Stock/StockCount";
import Auth from "./components/AuthCheck";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Shops from "./components/Shops/Shops";
import ShopSettings from "./components/Shops/ShopSettings";
import Purchases from './components/Purchases';
import Expenses from './components/Expenses';
import BadStock from './components/BadStock';

function App(props) {
  const loggedin = useSelector((state) => state.login);

  console.log("loggedin", props.logoutres.loggedin);

  return (
    <React.Fragment>
      <div className="row">
        {loggedin.loggedin ? (
          <div className=" s12 m4 l4 xl4 side-Wrap hide-on-med-and-down">
            <SideNavbar />
          </div>
        ) : (
          ""
        )}
        <div
          className={
            loggedin.loggedin ? " s12 m12 l8 xl8" : " s12 m12 l12 xl12"
          }
        >
          <Switch>
            <Route exact path="/" component={DefaultPage} />
            {/* <ProtectedRoute exact path="" component={DefaultPage} /> */}
            <Route path="/login/:type" component={Login} />
            <Route path="/register" component={Register} />

            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/stocksetup" component={StockSetup} />
            <ProtectedRoute path="/shops" component={Shops} />
            <ProtectedRoute path="/shopsettings/:id" component={ShopSettings} />
            <ProtectedRoute path="/stockinmanager" component={StockInManager} />
            <ProtectedRoute path="/salesmanager" component={SalesManager} />
            <ProtectedRoute
              path="/profitexpense"
              component={ProfitExpensesManager}
            />
            <ProtectedRoute path="/attendants" component={Attendants} />
            <ProtectedRoute
              path="/attendantsprofile/:id"
              component={AttendantsProfile}
            />
            <ProtectedRoute path="/units" component={Units} />
            <ProtectedRoute path="/newstock" component={NewStock} />
            <ProtectedRoute path="/counts/:timestamp" component={Counts} />
            <ProtectedRoute path="/stockcount" component={StockCount} />

            <ProtectedRoute
              path="/profitexpensesummary"
              component={ProfitExpenseSummary}
            />
            <ProtectedRoute
              path="/cashsaleshistory"
              component={CashSalesHistory}
            />
            <ProtectedRoute
              path="/purchases"
              component={Purchases}
            />
            <ProtectedRoute
              path="/expenses"
              component={Expenses}
            />
            <ProtectedRoute
              path="/badstock"
              component={BadStock}
            />

            <ProtectedRoute path="/editstock/:id" component={EditStock} />
            <ProtectedRoute path="/cashflow" component={Singlecashflow} />
            <ProtectedRoute path="/counthistory" component={CountHistory} />
            {/* <ProtectedRoute path="/count" component={Count} /> */}
            <ProtectedRoute path="/stockfilter" component={StockFilter} />
            <Route path="*" component={DefaultPage} />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  logoutres: state.login,
});

const mapDispacthToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(App);

// export default App;
