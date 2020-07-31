import AuthenticationReducer from "./Auth";
import stockReducer from "./Stock";
import reportReducer from "./Reports";
import attendantsReducer from "./Attendants";
import attendantsShops from "./shops";
import addSales from "./sales";
import SalesReceipts from "./SalesReceipts";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  login: AuthenticationReducer,
  stock: stockReducer,
  reports: reportReducer,
  attendants: attendantsReducer,
  shops: attendantsShops,
  sales: addSales,
  receipts: SalesReceipts,
});

export default allReducers;
