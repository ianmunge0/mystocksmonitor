import React, { useEffect } from "react";
import Item from "./Item";
import M from "materialize-css/dist/js/materialize.min.js";
import NavBar from "../components/Navigations/NavBar";

function Dashboard(props) {
  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
    var selectelems = document.querySelectorAll("select");
  }, []);

  return (
    <>
      <NavBar titleone="Store Admin" />
      <div class="card">
        <div class="card-content">
          <div className="row">
            <div className="s6">
              <h6>Current Shop: Shop One</h6>
            </div>
            <div className="s6">
              <button className="btn btn-info">Change</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <Item
          description="add, View all shops"
          className="datepicker"
          title="Shops management"
          route="shops"
          icon="arrow_downward"
        />
        <Item
          description="add, count and view all stocks"
          title="Stocks"
          route="stocksetup"
          icon="settings"
        />
        <Item
          description="Stock reports view/print"
          className="datepicker"
          title="Stock-in Report"
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
          route="/"
        />
      </div>
    </>
  );
}

export default Dashboard;
