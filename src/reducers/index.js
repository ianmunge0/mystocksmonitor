import loggedReducer from "./islogged";
import counterReducer from "./counter";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  loggedin: loggedReducer,
  counter: counterReducer,
});

export default allReducers;
