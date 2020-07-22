import AuthenticationReducer from "./Auth";
import stockReducer from "./Stock";
import reportReducer from "./Reports";
import attendantsReducer from "./Attendants";
import attendantsShops from "./shops";
import getCashAtHand from './ProfitExpenseReducer';

import { combineReducers } from "redux";

const allReducers = combineReducers({
  login: AuthenticationReducer,
  stock: stockReducer,
  reports: reportReducer,
  attendants: attendantsReducer,
  shops: attendantsShops,
  cashAtHand: getCashAtHand
});

export default allReducers;
