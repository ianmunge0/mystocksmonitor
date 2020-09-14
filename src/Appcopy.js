import React, { Component } from 'react'

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
import Dexie from "dexie";

class Appcopy extends Component {
  componentDidMount = () => {
    // //set the database 
    // const db = new Dexie("StockIndexDB");
    // //create the database store
    // db.version(1).stores({
    //     salestable: "++id, item, quantity, price, status, customer",
    //     stocktable: "++id, productname, quantity, buyingprice, sellingprice, reorderlevel, status, supplier"
    // })
    // db.open().catch((err) => {
    //     console.log(err.stack || err)
    // })
  }
  render() {
    return (
      <React.Fragment>
        <>
          <Switch>
            {/* <Main /> */}
            {/* <Route exact path="" component={DefaultPage} /> */}
            {/* <IndexRedirect to="/" /> */}
            <Route exact path="/" component={DefaultPage} />
            <Route path="/initialshopspage" component={InititalPage} />
            <Route path="/login/:type" component={Login} />
            <Route path="/reset" component={Reset} />
            <Route path="/register" component={Register} />
  
            <ProtectedRoute
              title="Stock Setup"
              path="/stocksetup"
              component={StockSetup}
            />
            <ProtectedRoute
              title="Dashboard"
              path="/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              title="Stock Setup"
              path="/stocksetupold"
              component={StockSetupold}
            />
            <ProtectedRoute title="All Shops" path="/shops" component={Shops} />
            <ProtectedRoute path="/shopsettings/:id" component={ShopSettings} />
            <ProtectedRoute
              title="Stock Report"
              path="/stockinmanager"
              component={StockInManager}
            />
            <ProtectedRoute
              path="/salesmanager"
              backlink="dashboard"
              title="Sales"
              settings="sales"
              component={SalesManager}
            />
            <ProtectedRoute
              backlink="salesmanager"
              path="/newsale"
              component={NewCashSale}
            />
            <Route path="/salesproductlist" component={SalesProductList} />
            <ProtectedRoute path="/salesreceipts" component={SalesReceipts} />
            <ProtectedRoute path="/singlereceipt" component={SingleSales} />
            <ProtectedRoute
              path="/profitexpense"
              title="Profit "
              settings="profitnexpenses"
              component={ProfitExpensesManager}
            />
            <ProtectedRoute
              title="Attendants"
              path="/attendants"
              component={Attendants}
            />
            <ProtectedRoute
              title="Attendant Profile"
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
              path="/profitandexpenseanalysis"
              component={ProfitandExpenseAnalysis}
            />
            <ProtectedRoute
              path="/cashsaleshistory"
              component={CashSalesHistory}
            />
  
            <ProtectedRoute path="/editstock/:id" component={EditStock} />
            <ProtectedRoute path="/cashflow" component={Singlecashflow} />
            <ProtectedRoute path="/counthistory" component={CountHistory} />
            <ProtectedRoute path="/stockfilter" component={StockFilter} />
            <ProtectedRoute
              title="Product Analysis"
              path="/productsanalysis"
              component={ProductsAnalysis}
            />
          </Switch>
        </>
      </React.Fragment>
    );
  }
}

export default Appcopy
