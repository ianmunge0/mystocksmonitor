import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import swDev from "./swDev";

import { BrowserRouter as Router } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import allReducers from "./Redux/reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reactLocalStorage } from "reactjs-localstorage";

const store = createStore(
  allReducers,
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={"/"}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
swDev();
