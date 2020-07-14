import AuthenticationReducer from "./Auth";
import stockReducer from "./Stock";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  login: AuthenticationReducer,
  stock: stockReducer,
});

export default allReducers;
