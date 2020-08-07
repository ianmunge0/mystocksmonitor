import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { logout } from "./Redux/Actions";

import { Switch, Route } from "react-router-dom";
import StockSetupold from "./components/StockSetup";
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
import NewShops from "./components/Shops/NewShop";
import NewCashSale from "./components/CashSales/NewCashSale";
import SalesProductList from "./components/CashSales/SalesProductList";
import SalesReceipts from "./components/Sales/SalesReceipts";
import SingleSales from "./components/Sales/SingleSales";
import StockSetup from "./components/Stocks/StockSetup";
import Expenses from "./components/ProfitExpenses/Expenses";
import Profile from "./components/Profile/Profile";

function App(props) {
  const loggedin = useSelector((state) => state.login);

  console.log(props);
  return (
    <React.Fragment>
      <>
        {/* {loggedin.loggedin ? (
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
        > */}
        <Switch>
          {/* <Main /> */}
          <Route exact path="/" component={DefaultPage} />
          {/* <Route path="" component={DefaultPage} /> */}
          <Route path="/login/:type" component={Login} />
          <Route path="/register" component={Register} />

          <ProtectedRoute path="/stocksetup" component={StockSetup} />
          <ProtectedRoute
            title="Dashboard"
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute path="/stocksetupold" component={StockSetupold} />
          <ProtectedRoute title="All Shops" path="/shops" component={Shops} />
          <ProtectedRoute path="/shopsettings/:id" component={ShopSettings} />
          <ProtectedRoute path="/stockinmanager" component={StockInManager} />
          <ProtectedRoute
            path="/salesmanager"
            title="Sales"
            settings="sales"
            component={SalesManager}
          />
          <ProtectedRoute path="/newsale" component={NewCashSale} />
          <ProtectedRoute path="/newsale" component={NewCashSale} />
          <Route path="/salesproductlist" component={SalesProductList} />
          <ProtectedRoute path="/salesreceipts" component={SalesReceipts} />
          <ProtectedRoute path="/singlereceipt" component={SingleSales} />
          <ProtectedRoute
            path="/profitexpense"
            title="Profit & Expenses"
            settings="profitnexpenses"
            component={ProfitExpensesManager}
          />
          <ProtectedRoute path="/attendants" component={Attendants} />
          <ProtectedRoute
            path="/attendantsprofile/:id"
            component={AttendantsProfile}
          />
          <ProtectedRoute
            path="/myprofile"
            title="My Profile"
            component={Profile}
          />
          <ProtectedRoute path="/units" component={Units} />
          <ProtectedRoute
            title="Add Expenses"
            path="/expenses"
            component={Expenses}
          />
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

          <ProtectedRoute path="/editstock/:id" component={EditStock} />
          <ProtectedRoute path="/cashflow" component={Singlecashflow} />
          <ProtectedRoute path="/counthistory" component={CountHistory} />
          <ProtectedRoute path="/stockfilter" component={StockFilter} />
          <Route path="*" component={DefaultPage} />
        </Switch>
        {/* </div> */}
      </>
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
