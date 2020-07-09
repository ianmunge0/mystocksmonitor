import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
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
import CountHistory from "./components/CountHistory";
import Count from "./components/Counts";
import DefaultPage from "./components/Initial/index";
import Login from "./components/Initial/Login";
import { useSelector } from "react-redux";

import CashSalesHistory from "./components/CashSales/CashSalesHistory";
import StockFilter from "./components/StockFilter";
import Register from "./components/Initial/Register";
function App() {
  const loggedin = useSelector((state) => state.login);

  return (
    <React.Fragment>
      <div className="container" style={{ background: "#EE6E73" }}>
        <NavBar />
        <div className="row">
          {loggedin.loggedin ? (
            <div className="col s12 m4 l4 xl4 side-Wrap hide-on-med-and-down">
              <SideNavbar />
            </div>
          ) : (
            ""
          )}
          <div
            className={
              loggedin.loggedin
                ? "col s12 m12 l8 xl8 content-wrap"
                : "col s12 m12 l12 xl12 content-wrap"
            }
          >
            <Switch>
              <Route exact path="/" component={DefaultPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/stocksetup" component={StockSetup} />
              <Route path="/stockinmanager" component={StockInManager} />
              <Route path="/salesmanager" component={SalesManager} />
              <Route path="/profitexpense" component={ProfitExpensesManager} />
              <Route path="/attendants" component={Attendants} />
              <Route path="/attendantsprofile" component={AttendantsProfile} />

              <Route
                path="/profitexpensesummary"
                component={ProfitExpenseSummary}
              />
              <Route path="/cashsaleshistory" component={CashSalesHistory} />

              <Route path="/editstock" component={EditStock} />
              <Route path="/cashflow" component={Singlecashflow} />
              <Route path="/counthistory" component={CountHistory} />
              <Route path="/count" component={Count} />
              <Route path="/stockfilter" component={StockFilter} />
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(App);

// export default App;
