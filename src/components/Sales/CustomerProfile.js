import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CallIcon from "@material-ui/icons/Call";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Api from "../../api/api";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { getcustomer, updateCustomer } from "../../Redux/Actions/Customers";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

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

function CustomerProfile(props) {
  const classes = useStyles();
  const [valueinner, setValueInner] = React.useState(0);
  const handleChangeInnerTabs = (event, newValueInner) => {
    setValueInner(newValueInner);
  };

  useEffect(() => {
    props.getcustomer(props.match.params.id);
  }, []);
  console.log("cc", props.customer);
  if (props.customer.loading) {
    return <Loader fullPage loading={props.customer.loading} />;
  }
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        style={{
          background: "#3F51B5",
          margin: 0,
          paddingTop: 30,
          paddingRight: 10,
          paddingLeft: 10,
          paddingBottom: 10,
          color: "#fff",
        }}
      >
        <Grid item xs={3} align="center">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className={classes.large}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {props.customer.customer ? props.customer.customer.name : ""}
          </Typography>
          <Typography>
            {props.customer.customer ? props.customer.customer.phone : ""}
          </Typography>
        </Grid>
        <Grid item xs={3} align="center">
          <Grid container>
            <Grid item xs={4}>
              <MessageIcon />
            </Grid>
            <Grid item xs={4}>
              <CallIcon />
            </Grid>
            <Grid item xs={4}>
              <WhatsAppIcon />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Tabs
        variant="fullWidth"
        value={valueinner}
        onChange={handleChangeInnerTabs}
        aria-label="nav tabs example"
      >
        <LinkTab label="On Credit" href="/trash" {...a11yProps(1)} />
        <LinkTab label="Cleared" href="/drafts" {...a11yProps(2)} />
        <LinkTab label="History" href="/drafts" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={valueinner} index={0}>
        <Loader fullPage loading={props.customer.loading} />
        {props.customer.customer ? (
          props.customer.customer.items.map((value, index) =>
            value.credit_status === "0" ? (
              <List
                className={classes.root}
                key={index}
                onClick={() => {
                  props.history.push({
                    pathname: `/partialpayment`,
                    state: { data: value },
                  });
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={value.name}
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          <span style={{ color: "green", fontSize: 13 }}>
                            Totals: {value.qtysold * value.onsalesellprice} /={" "}
                          </span>
                          <span style={{ color: "green", fontSize: 13 }}>
                            Paid: {value.totalpaid} /={" "}
                          </span>
                          <span style={{ color: "red", fontSize: 13 }}>
                            UnPaid:{" "}
                            {value.qtysold * value.onsalesellprice -
                              value.totalpaid}{" "}
                          </span>
                          /=
                          <br />
                          <span style={{ fontSize: 13 }}>
                            Date: {value.date_time}
                          </span>{" "}
                          <br />
                          <span>
                            Due Date:{" "}
                            {value.oncredit_due_date
                              ? value.oncredit_due_date
                              : "0000:00:00 00:00:00"}
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
          <h5>No customers yet</h5>
        )}
      </TabPanel>
      <TabPanel value={valueinner} index={1}>
        {props.customer.customer ? (
          props.customer.customer.items.map((value, index) =>
            value.credit_status === "1" ? (
              <List
                className={classes.root}
                key={index}
                onClick={() => {
                  props.history.push({
                    pathname: `/partialpayment`,
                    state: { data: value },
                  });
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={value.name}
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          <span style={{ color: "green", fontSize: 13 }}>
                            Totals: {value.qtysold * value.onsalesellprice} /={" "}
                          </span>
                          <span style={{ color: "green", fontSize: 13 }}>
                            Paid: {value.totalpaid} /={" "}
                          </span>
                          <br />
                          <span style={{ fontSize: 13 }}>
                            Date: {value.date_time}
                          </span>{" "}
                          <br />
                          <span>
                            Due Date:{" "}
                            {value.oncredit_due_date
                              ? value.oncredit_due_date
                              : "0000:00:00 00:00:00"}
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
          <h5>No customers yet</h5>
        )}
      </TabPanel>
      <TabPanel value={valueinner} index={2}>
        {props.customer.customer ? (
          props.customer.customer.items.map((value, index) => (
            <List
              className={classes.root}
              key={index}
              onClick={() => {
                props.history.push({
                  pathname: `/partialpayment`,
                  state: { data: value },
                });
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={value.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={value.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        <span style={{ color: "green", fontSize: 13 }}>
                          Totals: {value.qtysold * value.onsalesellprice} /={" "}
                        </span>
                        <span style={{ color: "green", fontSize: 13 }}>
                          Paid: {value.totalpaid} /={" "}
                        </span>{" "}
                        <span style={{ color: "red", fontSize: 13 }}>
                          UnPaid:{" "}
                          {value.qtysold * value.onsalesellprice -
                            value.totalpaid}{" "}
                        </span>
                        /=
                        <br />
                        <span style={{ fontSize: 13 }}>
                          Date: {value.date_time}
                        </span>{" "}
                        <span>
                          Due Date:{" "}
                          {value.oncredit_due_date
                            ? value.oncredit_due_date
                            : "0000:00:00 00:00:00"}
                        </span>
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ArrowForwardIosIcon />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))
        ) : (
          <h5>No customers yet</h5>
        )}
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  customer: state.customers,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getcustomer: (id) => dispatch(getcustomer(id)),
    updateCustomer: (data) => dispatch(updateCustomer(data)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(CustomerProfile);
