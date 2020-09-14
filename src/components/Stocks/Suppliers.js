import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { getSuppliers, saveSupplier } from "../../Redux/Actions/Suppliers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { reactLocalStorage } from "reactjs-localstorage";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Api from "../../api/api";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Messages from "../Common/Messages";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabwrap"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  inputs: {
    width: "100%",
    float: "left",
  },
}));

function Suppliers(props) {
  const classes = useStyles();
  const [valueinner, setValueInner] = React.useState(0);
  const handleChangeInnerTabs = (event, newValueInner) => {
    setValueInner(newValueInner);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    props.getSuppliers("manageall");
  }, []);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
  });

  const handleChangeSupplierInputs = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const saveSupplier = (event) => {
    event.preventDefault();
    var send = true;

    Object.keys(inputs).forEach(function (key) {
      if (inputs[key] === "") {
        setError(key + " must not be empty");
        send = false;
      }
    });

    if (send) {
      setLoading(true);
      props.saveSupplier(inputs, event);

      // props.register(name, phone, amount, duedate, props.match.params.type);
    }
  };

  const handleSearch = (e) => {
    console.log("search", e.target.value);
    props.dispatch({
      type: "SEARCH_SUPPLIER",
      payload: {
        text: e.target.value,
        displaysuppliers: props.suppliers.suppliers,
      },
    });
    // props.searchCustomer(e.target.value);
  };

  console.log("cu", props.suppliers);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="All" href="/trash" {...a11yProps(1)} />
          <LinkTab label="New" href="/drafts" {...a11yProps(0)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              {valueinner == 0
                ? "Unpaid Invoices " + props.suppliers.unpaid
                : "Paid Invoices " + props.suppliers.suppliertotaldebt}
              /=
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <div style={{ padding: 10 }} className={classes.searchinputwrap}>
          <form>
            <TextField
              variant="outlined"
              fullWidth
              type="search"
              onChange={(e) => handleSearch(e)}
              placeholder="quick search"
            />
          </form>
        </div>
        <Tabs
          variant="fullWidth"
          value={valueinner}
          onChange={handleChangeInnerTabs}
          aria-label="nav tabs example"
        >
          <LinkTab
            label={`On Credit (${props.suppliers.debtors})`}
            href="/trash"
            {...a11yProps(3)}
          />
          <LinkTab
            label={`Others (${props.suppliers.nodebtors})`}
            href="/drafts"
            {...a11yProps(4)}
          />
        </Tabs>
        <TabPanel value={valueinner} index={0}>
          <Loader fullPage loading={props.suppliers.loading} />
          {props.suppliers.suppliers ? (
            props.suppliers.suppliers.map((value, index) =>
              value.supplierdebt > 0 ? (
                <List
                  className={classes.root}
                  key={index}
                  onClick={() => {
                    props.history.push({
                      pathname: `/supplierprofile/${value.id}`,
                      state: {
                        data: value,
                      },
                    });
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={value.supplier_name} src="" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={value.supplier_name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            ({value.supplierinvoicescount}) Invoices, (
                            {value.supplieritemscount}) Products,
                            <span style={{ color: "red" }}>
                              Total Due: {value.supplierdebt} /=
                            </span>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ArrowForwardIosIcon />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ) : (
                ""
              )
            )
          ) : (
            <h5>No suppliers yet</h5>
          )}
        </TabPanel>
        <TabPanel value={valueinner} index={1}>
          {props.suppliers.suppliers ? (
            props.suppliers.suppliers.map((value, index) =>
              value.supplierdebt == 0 ? (
                <List
                  className={classes.root}
                  key={index}
                  onClick={() => {
                    props.history.push({
                      pathname: `/supplierprofile/${value.id}`,
                    });
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={value.supplier_name} src="" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={value.supplier_name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            ({value.supplierallinvoicescount}) Invoices, (
                            {value.supplierallitemscount}) Products
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ArrowForwardIosIcon />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ) : (
                ""
              )
            )
          ) : (
            <h5>No suppliers yet</h5>
          )}
        </TabPanel>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Loader fullPage loading={props.suppliers.loading} />
        <form
          className="col s12"
          onSubmit={saveSupplier}
          autoComplete="off"
          style={{ margin: 10 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.inputs}
                fullWidth
                name="name"
                label="Full Names"
                onChange={handleChangeSupplierInputs}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                className={classes.inputs}
                name="phone"
                label="Phone Number"
                onChange={handleChangeSupplierInputs}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className="row">
            <Messages text={error} type="error" />
            <Messages text={props.suppliers.addingerror} type="error" />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20, padding: 15 }}
              className={classes.button}
              type="submit"
              endIcon={<Icon>send</Icon>}
            >
              Save
            </Button>
          </div>
        </form>
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  suppliers: state.suppliers,
  error: state.suppliers.ddingerror,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getSuppliers: (action) => dispatch(getSuppliers(action)),
    saveSupplier: (supplier, target) =>
      dispatch(saveSupplier(supplier, target)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Suppliers);
