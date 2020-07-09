import AuthenticationReducer from "./Auth";
// import counterReducer from "./counter";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  login: AuthenticationReducer,
  // counter: counterReducer,
});

export default allReducers;
