import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Api from "../../api/api";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import {
  getcustomer,
  updateCustomer,
  deletecustomer,
} from "../../Redux/Actions/Customers";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Slide from "@material-ui/core/Slide";
import Messages from "../Common/Messages";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => {
    setError("");
    setOpen(false);
    if (action === "delete") {
      if (
        props.customer.customer.items.filter(
          (value) => value.credit_status === "0"
        ).length > 0
      ) {
        setError("you cant delete customer with active credit sales");
      } else {
        props.deletecustomer(props.match.params.id, props);
      }
    }
  };
  useEffect(() => {
    props.getcustomer(props.match.params.id);
  }, []);
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
            <Grid item xs={12}>
              <DeleteIcon
                onClick={() => handleClickOpen()}
                style={{ color: "red" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Messages type="error" text={error} />
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
                            Paid:{" "}
                            {value.totalpaid
                              ? value.totalpaid
                              : value.qtysold * value.onsalesellprice}{" "}
                            /={" "}
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
                        {value.credit_status === "0" ? (
                          <>
                            <span style={{ color: "green", fontSize: 13 }}>
                              Paid:{" "}
                              {value.totalpaid
                                ? value.totalpaid
                                : value.qtysold * value.onsalesellprice}{" "}
                              /={" "}
                            </span>
                            <span style={{ color: "red", fontSize: 13 }}>
                              UnPaid:{" "}
                              {value.qtysold * value.onsalesellprice -
                                value.totalpaid}{" "}
                              /=
                            </span>
                          </>
                        ) : (
                          ""
                        )}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure you want to delete customer?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => handleClose("close")} color="primary">
            Not Yet
          </Button>
          <Button onClick={() => handleClose("delete")} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  customer: state.customers,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getcustomer: (id) => dispatch(getcustomer(id)),
    deletecustomer: (id, props) => dispatch(deletecustomer(id, props)),
    updateCustomer: (data) => dispatch(updateCustomer(data)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(CustomerProfile);
