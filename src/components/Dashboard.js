import React, { Component } from "react";
import SideNavbar from "./SideNavbar";
import Item from "./Item";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, {});
      var selectelems = document.querySelectorAll("select");
      M.FormSelect.init(selectelems, {
        classes: "custom-wrap",
      });
    });
  }
  render() {
    return (
      <>
        <div className="row">
          <div className="input-field col s12">
            <select>
              <option value="dd" disabled selected>
                Select current shop
              </option>
              <option value="1">Shop 1</option>
              <option value="2">Shop 2</option>
              <option value="3">Shop 3</option>
            </select>
            <label>Current Shop</label>
          </div>
        </div>
        <div className="row">
          <Link to="/products">
            <Item title="Stock Setup" icon="settings" />
          </Link>
          <Item title="Stockin Manager" icon="arrow_downward" />
          <Item title="Sales Manager" icon="cloud_download" />
          <Item title="Profit & Expenses manager" icon="call_missed_outgoing" />
          <Item title="Attendants" icon="person_add" />
          <Item title="Cash Flow" icon="subdirectory_arrow_right" />
          <Item title="Subscriptions" icon="subscriptions" />
        </div>
      </>
    );
  }
}
