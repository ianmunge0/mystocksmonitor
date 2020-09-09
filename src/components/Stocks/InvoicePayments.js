import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";
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
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  deletePayment,
  getReceiptsPayment,
  savePayment,
} from "../../Redux/Actions/Suppliers";
import { deleteReceipt } from "../../Redux/Actions/SalesReceipts";
import { UnlockAccess } from "../Common/UnlockAccess";

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

function InvoicePayments(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    props.dispatch({ type: "STOPLOADING", loading: false });
    console.log("data", props.location.state);
    //setPayments(props.location.state.data);
    props.getReceiptsPayment(props.location.state.invoiceno);
  }, [props.location.state.data]);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [inputs, setInputs] = useState({
    date_time: "",
    amount: "",
  });
  const { date_time, amount } = inputs;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    console.log(inputs);
  };

  const [error, setError] = useState("");
  const savePayment = (e) => {
    e.preventDefault();
    setError("");
    if (amount === "" || date_time === "") {
      setError("you have to enter amount and date");
      return;
    }
    if (amount > props.location.state.data.totalunpaid) {
      setError(
        "you cannot pay more than " + props.location.state.data.totalunpaid
      );
      return;
    }

    setLoading(true);

    props.savePayment(
      date_time,
      amount,
      props.location.state.supplierid,
      props.location.state.invoiceno,
      e.target
    );
  };
  const deletePayment = (item) => {
    props.deletePayment(item);
  };
  console.log("props ", props);
  // return <></>;
  return (
    <div>
      <Loader fullPage loading={props.payments.loading} />
      {props.payments.invoicepayments && (
        <div className={classes.root}>
          <Card style={{ marginLeft: 10, marginRight: 10 }}>
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                style={{
                  margin: 0,
                }}
              >
                <Grid item xs={9}>
                  <Typography variant="h6">
                    Invoice No#{props.location.state.invoiceno}
                  </Typography>{" "}
                </Grid>
                <Grid item xs={3}>
                  <UnlockAccess request={["DELETE_SALES"]}>
                    <IconButton
                      onClick={() => {
                        props.deleteInvoice(
                          props.location.state.invoiceno,
                          props
                        );
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </UnlockAccess>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>
                        Total:{" "}
                        {props.payments.invoicepayments.invoicedetails.total}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        <span style={{ color: "green" }}>
                          Paid:{" "}
                          {
                            props.payments.invoicepayments.invoicedetails
                              .totalpaid
                          }
                        </span>
                      </Typography>
                    </Grid>

                    {props.payments.invoicepayments.invoicedetails
                      .totalunpaid && (
                      <Grid item xs={12}>
                        <Typography>
                          <span style={{ color: "red" }}>
                            UnPaid:{" "}
                            {
                              props.payments.invoicepayments.invoicedetails
                                .totalunpaid
                            }
                          </span>
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {props.payments.invoicepayments.invoicedetails.totalunpaid > 0 ? (
            <form onSubmit={savePayment}>
              <Grid container style={{ padding: 10 }}>
                <Grid item xs={12}>
                  <h4>Add Payment</h4>
                </Grid>
                <span style={{ color: "red" }}>{error}</span>
                <Grid xs={6} style={{ paddingRight: 10 }}>
                  <Typography>Paid Date</Typography>
                  <div>
                    <TextField
                      onChange={handleChange}
                      variant="outlined"
                      name="date_time"
                      fullWidth
                      type="date"
                    />
                  </div>
                </Grid>
                <Grid xs={4}>
                  <Typography>Amount</Typography>
                  <div>
                    <TextField
                      onChange={handleChange}
                      variant="outlined"
                      name="amount"
                      fullWidth
                      type="number"
                    />
                  </div>
                </Grid>
                <Grid xs={2} style={{ position: "relative" }}>
                  <Button
                    type="submit"
                    variant="outline"
                    color="primary"
                    style={{
                      top: "42%",
                      position: "absolute",
                      fontStyle: "bold",
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            ""
          )}

          <Grid item xs={12}>
            <div className={classes.demo}>
              <List dense={dense}>
                {props.payments.invoicepayments.payments.map((value, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText
                        primary={value.date_time}
                        secondary={`${value.amount_paid}` + "/="}
                      />
                      <UnlockAccess request={["DELETE_SALES"]}>
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => {
                              value.supplierid =
                                props.location.state.supplierid;
                              deletePayment(value);
                            }}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>{" "}
                      </UnlockAccess>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </div>
          </Grid>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  payments: state.suppliers,
});

const mapDispacthToProps = (dispatch) => {
  return {
    deleteReceipt: (receiptno, props) =>
      dispatch(deleteReceipt(receiptno, props)),
    deletePayment: (item) => dispatch(deletePayment(item)),
    getReceiptsPayment: (invoiceno) => dispatch(getReceiptsPayment(invoiceno)),
    savePayment: (date_time, amount, customer_id, receiptno, e) =>
      dispatch(savePayment(date_time, amount, customer_id, receiptno, e)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(InvoicePayments);
