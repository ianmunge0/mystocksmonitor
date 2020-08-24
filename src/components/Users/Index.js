import React, { useEffect } from "react";
import Item from "../Item";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Button from "@material-ui/core/Button";
// import ShopsDialog from "./Shops/SelectDefaultShop";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
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
function Index(props) {
  useEffect(() => {
    const roles = getUserRole();
  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getUserRole = () => {
    const roles = reactLocalStorage.getObject("userdata");
    console.log("roles", roles);
  };
  return (
    <Grid container>
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
          {reactLocalStorage.getObject("userdata").currentshop
            ? reactLocalStorage.getObject("userdata").currentshop.shopname
            : "N/A"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Item
          description="add, View all shops"
          className="datepicker"
          title="Shops management"
          route="shops"
          icon="arrow_downward"
        />
      </Grid>
      <Grid item xs={12}>
        <Item
          description="add, count and view all stocks"
          title="Stocks"
          route="stocksetup"
          icon="settings"
        />
      </Grid>
      <Grid item xs={12}>
        <Item
          description="Stock reports view/print"
          className="datepicker"
          title="Stock-in Report"
          route="stockinmanager"
          icon="arrow_downward"
        />
      </Grid>
      <Grid item xs={12}>
        <Item
          description="Sales reports view/print"
          title="Sales Reports"
          route="salesmanager"
          icon="cloud_download"
        />
      </Grid>
      <Grid item xs={12}>
        <Item
          description="Profit and expenses management"
          title="Profit & Expenses Reports"
          icon="call_missed_outgoing"
          route="profitexpense"
        />
      </Grid>
      <Grid item xs={12}>
        <Item
          description="add or remove attendants"
          title="Attendants"
          route="attendants"
          icon="person_add"
        />
      </Grid>
      <Grid item xs={12}>
        <Item
          description="Cash Flow Management"
          title="Cash Flow"
          icon="subdirectory_arrow_right"
          route="cashflow"
        />
      </Grid>
      <Grid item xs={12}>
        <Item
          description="manage your subscription for better experience"
          title="Subscriptions"
          icon="subscriptions"
          route="/"
        />
      </Grid>
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
    </Grid>
  );
}

export default Index;
