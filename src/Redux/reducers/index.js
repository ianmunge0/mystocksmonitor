import AuthenticationReducer from "./Auth";
import stockReducer from "./Stock";
import reportReducer from "./Reports";
import attendantsReducer from "./Attendants";
import attendantsShops from "./shops";
import addSales from "./sales";
import SalesReceipts from "./SalesReceipts";
import ProfitnExpenses from "./ProfitnExpenses";
import Customers from "./Customers";

import { combineReducers } from "redux";
import ProductSummary from "./Product";

const allReducers = combineReducers({
  login: AuthenticationReducer,
  stock: stockReducer,
  reports: reportReducer,
  attendants: attendantsReducer,
  shops: attendantsShops,
  sales: addSales,
  receipts: SalesReceipts,
  profitnexpense: ProfitnExpenses,
  customers: Customers,
  productsummary: ProductSummary,
});

export default allReducers;
