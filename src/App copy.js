import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

// DISPATCH

// store.dispatch(incerement(3));

function App() {
  const counter = useSelector((state) => state.counter);
  const loggedin = useSelector((state) => state.loggedin);

  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">item one</div>
        <div className="col-md-12">item one</div>
        <div className="col-md-12">item one</div>
        <div className="col-md-12">item one</div>
        <div className="col-md-12">item one</div>
        <div className="col-md-12">item one</div>
      </div>
      <h1>Counter: {counter}</h1>

      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>

      {loggedin && <h1>hidden content</h1>}
    </div>
  );
}

export default App;
