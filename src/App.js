import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import ProductList from "./components/ProductsList";
import Cart from "./components/Cart";
import Details from "./components/Details";
import NavBar from "./components/NavBar";
import Default from "./components/Default";
import Dashboard from "./components/Dashboard";
import SideNavbar from "../src/components/SideNavbar";
function App() {
  return (
    <React.Fragment>
      <NavBar />

      <div className="container lighten-4">
        <div className="row">
          <div className="col s12 m4 l4 xl4 side-Wrap hide-on-med-and-down">
            <SideNavbar />
          </div>
          <div className="col s12 m12 l8 xl8 content-wrap">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/products" component={ProductList} />
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
