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
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import {
  getsupplier,
  updateSupplier,
  deleteSupplier,
} from "../../Redux/Actions/Suppliers";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

import Slide from "@material-ui/core/Slide";
import Messages from "../Common/Messages";
import SupplierItem from "./SupplierItem";
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

function SupplierProfile(props) {
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
    console.log(props.match.params.id);
    if (action === "delete") {
      if (props.supplier.supplier.unpaidinvoices.length > 0) {
        setError("you cant delete supplier with active credit sales");
      } else {
        props.deleteSupplier(props.match.params.id, props);
      }
    }
  };
  useEffect(() => {
    props.getsupplier(props.match.params.id);
  }, []);
  if (props.supplier.loading) {
    return <Loader fullPage loading={props.supplier.loading} />;
  }
  var unpaidinvoices =
    props.supplier.supplier &&
    Object.keys(props.supplier.supplier.unpaidinvoices).map(function (key) {
      var value = props.supplier.supplier.unpaidinvoices[key];
      console.log(key);
      return (
        <SupplierItem
          value={value}
          key={key}
          invoiceid={key}
          supplierid={props.match.params.id}
        />
      );
    });
  var allinvoices =
    props.supplier.supplier &&
    Object.keys(props.supplier.supplier.allinvoices).map(function (key) {
      var value = props.supplier.supplier.allinvoices[key];
      return (
        <SupplierItem
          value={value}
          key={key}
          invoiceid={key}
          supplierid={props.match.params.id}
        />
      );
    });
  var paidinvoices =
    props.supplier.supplier &&
    Object.keys(props.supplier.supplier.paidinvoices).map(function (key) {
      var value = props.supplier.supplier.paidinvoices[key];
      console.log(key);
      return (
        <SupplierItem
          value={value}
          key={key}
          invoiceid={key}
          supplierid={props.match.params.id}
        />
      );
    });

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
            {props.supplier.supplier
              ? props.supplier.supplier.supplier_name
              : ""}
          </Typography>
          <Typography>
            {props.supplier.supplier ? props.supplier.supplier.phone : ""}
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
        {unpaidinvoices ? unpaidinvoices : <Messages text="No Invoices" />}
      </TabPanel>
      <TabPanel value={valueinner} index={1}>
        {paidinvoices ? paidinvoices : <Messages text="No Invoices" />}
      </TabPanel>
      <TabPanel value={valueinner} index={2}>
        {allinvoices ? allinvoices : <Messages text="No Invoices" />}
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
          {"Are you sure you want to delete supplier?"}
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
  supplier: state.suppliers,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getsupplier: (id) => dispatch(getsupplier(id)),
    deleteSupplier: (id, props) => dispatch(deleteSupplier(id, props)),
    updateSupplier: (data) => dispatch(updateSupplier(data)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(SupplierProfile);
