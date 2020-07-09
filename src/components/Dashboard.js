import React, { Component } from "react";
import Item from "./Item";
import M from "materialize-css/dist/js/materialize.min.js";

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
          <Item
            description="add, count and view all stocks"
            title="Stocks"
            route="stocksetup"
            icon="settings"
          />
          <Item
            description="Stock reports view/print"
            className="datepicker"
            title="Stock Report"
            route="stockinmanager"
            icon="arrow_downward"
          />
          <Item
            description="Sales reports view/print"
            title="Sales Reports"
            route="salesmanager"
            icon="cloud_download"
          />
          <Item
            description="Profit and expenses management"
            title="Profit & Expenses Reports"
            icon="call_missed_outgoing"
            route="profitexpense"
          />
          <Item
            description="add or remove attendants"
            title="Attendants"
            route="attendants"
            icon="person_add"
          />
          <Item
            description="Cash Flow Management"
            title="Cash Flow"
            icon="subdirectory_arrow_right"
            route="cashflow"
          />
          <Item
            description="manage your subscription for better experience"
            title="Subscriptions"
            icon="subscriptions"
          />
        </div>
      </>
    );
  }
}
