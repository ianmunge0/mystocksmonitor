import React, { useEffect } from "react";
import Item from "./Item";
import M from "materialize-css/dist/js/materialize.min.js";
import NavBar from "../components/Navigations/NavBar";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Button from "@material-ui/core/Button";
import ShopsDialog from "./Shops/SelectDefaultShop";

function Dashboard(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div style={{ marginTop: 20 }}>
        <div className="row">
          <div className="col s12">
            <Button
              variant="outlined"
              color="primary"
              style={{ padding: 10 }}
              className="col s12"
              onClick={handleClickOpen}
            >
              Current Shop:{" "}
              {reactLocalStorage.getObject("userdata").currentshop
                ? reactLocalStorage.getObject("userdata").currentshop.shopname
                : "N/A"}
            </Button>
            <ShopsDialog fullScreen open={open} handleClose={handleClose} />
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
