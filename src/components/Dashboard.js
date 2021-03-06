import React, { useEffect } from "react";
import Item from "./Item";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Button from "@material-ui/core/Button";
import ShopsDialog from "./Shops/SelectDefaultShop";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { UnlockAccess } from "./Common/UnlockAccess";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 30,
    },
  },
}));
function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ifshopexpired = () => {
    var currtime = Math.floor(Date.now() / 1000);
    var remtime = reactLocalStorage.getObject("currentshop").endson - currtime;
    if (remtime < 0) {
      return true;
    }
    return false;
  };

  return (
    <Grid container>
      <UnlockAccess request={["ADMIN_ROLE"]}>
        <Grid item xs={12} style={{ marginLeft: 10, marginRight: 10 }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ padding: 10 }}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 15,
            }}
            onClick={handleClickOpen}
          >
            Current Shop:{" "}
            {reactLocalStorage.getObject("currentshop")
              ? reactLocalStorage.getObject("currentshop").shopname
              : "N/A"}
          </Button>
        </Grid>
      </UnlockAccess>
      <ShopsDialog fullScreen open={open} handleClose={handleClose} />
      <UnlockAccess request={["SHOPS_MANAGER"]}>
        <Grid item xs={12}>
          <Item
            description="add, View all shops"
            className="datepicker"
            title="Shops management"
            route="shops"
            icon="arrow_downward"
          />
        </Grid>
      </UnlockAccess>
      <Grid item xs={12}>
        <UnlockAccess request={["ATTENDANT_ROLE"]}>
          <Grid item xs={12}>
            <Item
              description="add sales"
              disabled={ifshopexpired()}
              title="Add Sales"
              route="newsale"
              icon="arrow_downward"
            />
          </Grid>
          <Grid item xs={12}>
            <Item
              description="add and view customer sales"
              title="Customers Manager"
              disabled={ifshopexpired()}
              route="customermanager"
              icon="settings"
            />
          </Grid>
        </UnlockAccess>
        <UnlockAccess request={["STOCK_MANAGER"]}>
          <Grid item xs={12}>
            <Item
              description="add, count and view all stocks"
              title="Stock Setup"
              disabled={ifshopexpired()}
              route="stocksetup"
              icon="settings"
            />
          </Grid>
        </UnlockAccess>
        <UnlockAccess request={["ATTENDANT_ROLE"]}>
          <Grid item xs={12}>
            <Item
              description="add, count and view all stocks"
              title="Stock In"
              disabled={ifshopexpired()}
              route="stockin"
              icon="settings"
            />
          </Grid>
        </UnlockAccess>
        <UnlockAccess request={["STOCK_REPORT_MANAGER"]}>
          <Grid item xs={12}>
            <Item
              description="Stock reports view/print"
              className="datepicker"
              disabled={ifshopexpired()}
              title="Stock In"
              route="stockinmanager"
              icon="arrow_downward"
            />
          </Grid>
        </UnlockAccess>
        <UnlockAccess request={["SALES_MANAGER"]}>
          <Grid item xs={12}>
            <Item
              description="Sales reports view/print"
              title="Sales Reports"
              disabled={ifshopexpired()}
              route="salesmanager"
              icon="cloud_download"
            />
          </Grid>
        </UnlockAccess>
        <UnlockAccess request={["PROFIT_EXPENSES_MANAGER"]}>
          <Grid item xs={12}>
            <Item
              description="Profit and expenses management"
              title="Profit & Expenses Reports"
              disabled={ifshopexpired()}
              icon="call_missed_outgoing"
              route="profitexpense"
            />
          </Grid>
        </UnlockAccess>
        <UnlockAccess request={["ADMIN_ROLE"]}>
          <Grid item xs={12}>
            <Item
              description="add or remove attendants"
              title="Attendants"
              route="attendants"
              disabled={ifshopexpired()}
              icon="person_add"
            />
          </Grid>
        </UnlockAccess>
        <UnlockAccess request={["CASH_FLOW"]}>
          <Grid item xs={12}>
            <Item
              description="Cash Flow Management"
              title="Cash Flow"
              disabled={ifshopexpired()}
              icon="subdirectory_arrow_right"
              route="cashflow"
            />
          </Grid>
        </UnlockAccess>
      </Grid>
      <UnlockAccess request={["ADMIN_ROLE"]}>
        <Grid item xs={12}>
          <Item
            description="manage your subscription for better experience"
            title="Subscriptions"
            icon="subscriptions"
            route="/subscriptions"
          />
        </Grid>
      </UnlockAccess>
      <UnlockAccess request={[]}>
        <Snackbar
          onClick={handleClickOpen}
          open={
            reactLocalStorage.getObject("userdata").default_shop === "" ||
            reactLocalStorage.getObject("userdata").default_shop === null
              ? true
              : false
          }
          autoHideDuration={6000}
          message="Set Default Shop"
          action={
            <Button color="inherit" size="small">
              SetUp
            </Button>
          }
          className={classes.snackbar}
        />
      </UnlockAccess>
    </Grid>
  );
}

export default Dashboard;
