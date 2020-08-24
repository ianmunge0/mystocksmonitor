import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { logout } from "./Redux/Actions";

import { Switch, Route } from "react-router-dom";
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
import Customers from "./components/Sales/Customers";
import CustomerProfile from "./components/Sales/CustomerProfile";
import PartialPayment from "./components/Sales/PartialPayment";
import ProductHistory from "./components/Stocks/Product/ProductHistory";
import SingleProductSales from "./components/Stocks/Product/SingleProductSales";
import Export from "./components/Shops/Export";
import Index from "./components/Users/Index";
function App(props) {
  return (
    <React.Fragment>
      <>
        <Switch>
          <Route exact path="/" component={DefaultPage} />
          <Route path="/initialshopspage" component={InititalPage} />
          <Route path="/login/:type" component={Login} />
          <Route path="/reset" component={Reset} />
          <Route path="/register" component={Register} />

          <ProtectedRoute
            title="Stock Setup"
            path="/stocksetup"
            backlink="dashboard"
            roles={["ADMIN_ROLE"]}
            component={StockSetup}
          />
          <ProtectedRoute
            title="Product History"
            path="/productsummary/:id"
            backlink="stocksetup"
            component={ProductHistory}
          />
          <ProtectedRoute
            title="Dashboard"
            path="/dashboard"
            roles={[]}
            component={Dashboard}
          />
          <ProtectedRoute title="All Shops" path="/shops" component={Shops} />
          <ProtectedRoute path="/shopsettings/:id" component={ShopSettings} />
          <ProtectedRoute
            title="Stock Report"
            roles={["ADMIN_ROLE"]}
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
            title="Customers Management"
            path="/customers"
            component={Customers}
          />
          <ProtectedRoute
            title="Customer Profile"
            path="/customerprofile/:id"
            component={CustomerProfile}
          />
          <ProtectedRoute
            backlink="salesmanager"
            title="Enter New Sales"
            path="/newsale"
            component={NewCashSale}
          />
          <Route path="/salesproductlist" component={SalesProductList} />
          <ProtectedRoute
            title="Product Sales"
            path="/productssales"
            component={SingleProductSales}
          />
          <ProtectedRoute
            title="Sales Receipts"
            path="/salesreceipts"
            component={SalesReceipts}
          />
          <ProtectedRoute
            title="Partial Payment"
            path="/partialpayment"
            component={PartialPayment}
          />
          <ProtectedRoute
            title="Receipt"
            path="/singlereceipt"
            component={SingleSales}
          />
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
            path="/user"
            title="User DashBoard"
            component={Index}
          />
          <ProtectedRoute
            path="/export"
            title="Transfer Stock"
            component={Export}
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
          <ProtectedRoute
            title="Day's Count"
            path="/counts/:timestamp"
            component={Counts}
          />
          <ProtectedRoute path="/stockcount" component={StockCount} />

          <ProtectedRoute
            path="/profitexpensesummary"
            title="Profit and Expenses summary"
            component={ProfitExpenseSummary}
          />
          <ProtectedRoute
            path="/profitandexpenseanalysis"
            component={ProfitandExpenseAnalysis}
          />
          <ProtectedRoute
            title="Cash Sales Summary"
            path="/cashsaleshistory"
            component={CashSalesHistory}
          />

          <ProtectedRoute
            title="Edit Product"
            // backlink="stocksetup"
            path="/editstock/:id"
            component={EditStock}
          />
          <ProtectedRoute
            title="Cash Flow"
            path="/cashflow"
            component={Singlecashflow}
          />
          <ProtectedRoute
            title="Counts History"
            path="/counthistory"
            component={CountHistory}
          />
          <ProtectedRoute
            title="Stocks"
            path="/stockfilter"
            component={StockFilter}
          />
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
