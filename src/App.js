import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { logout } from "./Redux/Actions";

import { Switch, Route, IndexRedirect } from "react-router-dom";
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
import InititalPage from "./components/Initial/Initialpage";
import Reset from "./components/Initial/Reset";
import ProductsAnalysis from "./components/Analysis/ProductsAnalysis";
import ProfitandExpenseAnalysis from "./components/Analysis/ProfitandExpenseAnalysis";
import Appcopy from "./Appcopy";

function App(props) {
  const loggedin = useSelector((state) => state.login);

  // console.log(props);
  return (
    <Appcopy/>
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
