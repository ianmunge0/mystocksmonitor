import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { logout } from "./Redux/Actions";

import { Switch, Route, Router } from "react-router-dom";
import EditStock from "./components/Stock/EditStock";
import Dashboard from "./components/Dashboard";
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
import Units from "./components/Units";
import CashSalesHistory from "./components/CashSales/CashSalesHistory";
import StockFilter from "./components/StockFilter";
import Register from "./components/Initial/Register";
import StockCount from "./components/Stock/StockCount";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Shops from "./components/Shops/Shops";
import ShopSettings from "./components/Shops/ShopSettings";
import NewCashSale from "./components/CashSales/NewCashSale";
import SalesReceipts from "./components/Sales/SalesReceipts";
import SingleSales from "./components/Sales/SingleSales";
import StockSetup from "./components/Stocks/StockSetup";
import Expenses from "./components/ProfitExpenses/Expenses";
import Profile from "./components/Profile/Profile";
import InititalPage from "./components/Initial/Initialpage";
import Reset from "./components/Initial/Reset";
import ProductsAnalysis from "./components/Analysis/ProductsAnalysis";
import ProfitandExpenseAnalysis from "./components/Analysis/ProfitandExpenseAnalysis";
import Customers from "./components/Sales/Customers";
import Suppliers from "./components/Stocks/Suppliers";
import CustomerProfile from "./components/Sales/CustomerProfile";
import SupplierProfile from "./components/Stocks/SupplierProfile";
import PartialPayment from "./components/Sales/PartialPayment";
import InvoicePayments from "./components/Stocks/InvoicePayments";

import ProductHistory from "./components/Stocks/Product/ProductHistory";
import SingleProductSales from "./components/Stocks/Product/SingleProductSales";
import Export from "./components/Shops/Export";
import Index from "./components/Users/Index";
import BadStock from "./components/CashSales/BadStock";
import ExpesensesList from "./components/CashSales/ExpesensesList";
import StockIn from "./components/Stocks/StockIn";
import NetworkDetector from "./components/Common/NetworkDetector";

import Subscription from "./components/Subscription/Subscription";
import Packages from "./components/Subscription/Packages";
import PaymentOptions from "./components/Subscription/PaymentOptions";
function App(props) {
  return (
    <React.Fragment>
      <>
        <Switch>
          <Route path="/initialshopspage" component={InititalPage} />
          <Route path="/login/:type" component={Login} />
          <Route path="/reset" component={Reset} />
          <Route path="/register" component={Register} />
          //START SHOPS ROUTES
          <ProtectedRoute
            roles={["SHOPS_MANAGER"]}
            title="All Shops"
            backlink="dashboard"
            path="/shops"
            component={Shops}
          />
          <ProtectedRoute
            roles={["SHOPS_MANAGER"]}
            path="/shopsettings/:id"
            component={ShopSettings}
          />
          //END SHOPS ROUTE //START SALES REPORT ROUTES
          <ProtectedRoute
            path="/salesmanager"
            backlink="dashboard"
            roles={["SALES_MANAGER"]}
            title="Sales"
            settings="sales"
            component={SalesManager}
          />
          <ProtectedRoute
            title="Sales Receipts"
            path="/salesreceipts"
            roles={["SALES_MANAGER"]}
            component={SalesReceipts}
          />
          <ProtectedRoute
            title="Product Sales"
            path="/productssales"
            roles={["SALES_MANAGER"]}
            component={SingleProductSales}
          />
          <ProtectedRoute
            title="Product Analysis"
            path="/productsanalysis"
            roles={["SALES_MANAGER"]}
            component={ProductsAnalysis}
          />
          <ProtectedRoute
            title="Receipt"
            path="/singlereceipt"
            roles={["SALES_MANAGER", "ADD_SALES"]}
            component={SingleSales}
          />
          <ProtectedRoute
            title="Customers Management"
            roles={["SALES_MANAGER", "ADD_SALES"]}
            path="/customers"
            component={Customers}
          />
          <ProtectedRoute
            title="Suppliers Management"
            roles={["STOCK_MANAGER", "STOCK_IN"]}
            path="/suppliers"
            component={Suppliers}
          />
          <ProtectedRoute
            title="Customer Profile"
            roles={["SALES_MANAGER", "ADD_SALES"]}
            path="/customerprofile/:id"
            component={CustomerProfile}
          />
          <ProtectedRoute
            title="Supplier Profile"
            roles={["STOCK_MANAGER", "STOCK_IN"]}
            path="/supplierprofile/:id"
            component={SupplierProfile}
          />
          <ProtectedRoute
            backlink="dashboard"
            roles={["SALES_MANAGER", "ADD_SALES"]}
            title="Enter New Sales"
            path="/newsale"
            component={NewCashSale}
          />
          //END SALES REPORT ROUTES //START STOCK ROUTES
          <ProtectedRoute
            title="Stocks"
            path="/stockfilter"
            roles={["STOCK_REPORT_MANAGER"]}
            component={StockFilter}
          />
          <ProtectedRoute
            title="Bad Stocks"
            path="/badstocks"
            roles={["STOCK_REPORT_MANAGER"]}
            component={BadStock}
          />
          <ProtectedRoute
            title="Product History"
            path="/productsummary/:id"
            roles={["STOCK_REPORT_MANAGER"]}
            backlink="stocksetup"
            component={ProductHistory}
          />
          <ProtectedRoute
            title="Stock Report"
            roles={["STOCK_REPORT_MANAGER"]}
            path="/stockinmanager"
            settings="stockin" //this is if you want to have a button at the app bar
            component={StockInManager}
          />
          <ProtectedRoute
            title="Stock Setup"
            path="/stocksetup"
            backlink="dashboard"
            roles={["STOCK_MANAGER", "STOCK_IN"]}
            component={StockSetup}
          />
          //END STOCK ROUTES
          <ProtectedRoute
            title="Dashboard"
            roles={[]}
            path="/dashboard"
            settings="dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            title="Invoice Payment"
            path="/invoicepayment"
            roles={["STOCK_MANAGER", "STOCK_IN"]}
            component={InvoicePayments}
          />
          <ProtectedRoute
            title="Partial Payment"
            path="/partialpayment"
            roles={["SALES_MANAGER", "ADD_SALES"]}
            component={PartialPayment}
          />
          <ProtectedRoute
            path="/expenseslists"
            title="Expenses "
            roles={["PROFIT_EXPENSES_MANAGER"]}
            component={ExpesensesList}
          />
          <ProtectedRoute
            path="/profitexpense"
            title="Profit "
            roles={["PROFIT_EXPENSES_MANAGER"]}
            settings="profitnexpenses"
            component={ProfitExpensesManager}
          />
          <ProtectedRoute
            title="Attendants"
            path="/attendants"
            roles={["ADMIN_ROLE"]}
            component={Attendants}
          />
          <ProtectedRoute
            title="Attendant Profile"
            roles={["ADMIN_ROLE"]}
            path="/attendantsprofile/:id"
            component={AttendantsProfile}
          />
          {/* <ProtectedRoute
            path="/user"
            title="User DashBoard"
            component={Index}
          /> */}
          <ProtectedRoute
            path="/export"
            title="Transfer Stock"
            roles={["STOCK_MANAGER"]}
            component={Export}
          />
          <ProtectedRoute
            path="/myprofile"
            title="My Profile"
            roles={["ATTENDANT"]}
            component={Profile}
          />
          <ProtectedRoute
            roles={["ADD_STOCK"]}
            path="/units"
            component={Units}
          />
          <ProtectedRoute
            title="Add Expenses"
            path="/expenses"
            roles={["EXPENSES_MANAGER"]}
            component={Expenses}
          />
          <ProtectedRoute
            title="Day's Count"
            roles={["STOCK_COUNT"]}
            path="/counts/:timestamp"
            component={Counts}
          />
          <ProtectedRoute
            roles={["STOCK_COUNT"]}
            path="/stockcount"
            component={StockCount}
          />
          <ProtectedRoute
            path="/profitexpensesummary"
            title="Profit and Expenses summary"
            roles={["PROFIT_EXPENSES_MANAGER"]}
            component={ProfitExpenseSummary}
          />
          <ProtectedRoute
            path="/profitandexpenseanalysis"
            roles={["PROFIT_EXPENSES_MANAGER"]}
            component={ProfitandExpenseAnalysis}
          />
          <ProtectedRoute
            title="Cash Sales Summary"
            path="/cashsaleshistory"
            roles={["SALES_MANAGER"]}
            component={CashSalesHistory}
          />
          <ProtectedRoute
            title="Edit Product"
            path="/editstock/:id"
            roles={["EDIT_PRODUCT,STOCK_MANAGER"]}
            component={EditStock}
          />
          <ProtectedRoute
            title="Cash Flow"
            path="/cashflow"
            roles={["CASH_FLOW"]}
            component={Singlecashflow}
          />
          <ProtectedRoute
            title="Counts History"
            path="/counthistory"
            roles={["STOCK_COUNT"]}
            component={CountHistory}
          />
          <ProtectedRoute
            title="Customers Manager"
            path="/customermanager"
            roles={["ADD_SALES"]}
            component={Customers}
          />
          {/* <ProtectedRoute
            title="Bad Stocks"
            path="/badstock"
            roles={["ADD_SALES"]}
            component={BadStock}
          /> */}
          <ProtectedRoute
            title="STOCK IN"
            path="/stockin"
            roles={["STOCK_IN"]}
            component={StockIn}
          />
          //SUBSCRIPTIONS ROUTE
          <ProtectedRoute
            roles={["ADMIN_ROLE"]}
            title="Subscriptions"
            path="/subscriptions"
            component={Subscription}
          />
          <ProtectedRoute
            roles={["ADMIN_ROLE"]}
            title="Packages"
            path="/subscriptionpackages"
            component={Packages}
          />
          <ProtectedRoute
            roles={["ADMIN_ROLE"]}
            title="Payment Options"
            path="/paymentoptions"
            component={PaymentOptions}
          />
          <Route exact basename="/" component={DefaultPage} />
          
        </Switch>
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
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(NetworkDetector(App));

// export default App;
