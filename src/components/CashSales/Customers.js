import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import moment from "moment";
import { withRouter } from "react-router-dom";
import Api from "../../api/api";
import { Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { reactLocalStorage } from "reactjs-localstorage";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Chip from "@material-ui/core/Chip";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Paper from "@material-ui/core/Paper";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  root: {
    padding: 0,
    margin: 0,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Customers(props) {
  const [customers, setCustomers] = useState([]);
  const [selectedcustomer, setSelectedCustomers] = useState({});
  const [chipData, setChipData] = useState([]);

  const [openalert, setOpenAlert] = React.useState(false);

  const handleAlertClickOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    console.log({
      action: "all",
      shopid: reactLocalStorage.getObject("userdata").default_shop,
    });
    setLoading(true);
    Api.get(`/customers.php`, {
      params: {
        action: "all",
        shopid: reactLocalStorage.getObject("userdata").default_shop,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setCustomers(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  }
  const selectCustomer = () => {};

  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    amount: 0,
    duedate: "",
  });
  const { name, phone, amount, duedate } = inputs;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    console.log(inputs);
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //save customer to the database
  //set the customer object and return back to the cashsales page
  const saveCustomer = (event) => {
    event.preventDefault();
    var send = true;

    //check if this customer is being added for a sale that is on credit,
    //if the sale is on credit then all fields check must be comlied with but
    //if not then no need to comply with field checks
    if (props.type === "credit") {
      Object.keys(inputs).forEach(function (key) {
        if (inputs[key] === "") {
          setError(key + " must not be empty");
          send = false;
        }
      });
    }

    if (send) {
      setLoading(true);
      Api.get(`/customers.php`, {
        params: {
          name,
          phone,
          action: "add",
          duedate,
          shopid: reactLocalStorage.getObject("userdata").default_shop,
        },
      })
        .then((res) => {
          console.log(res.data);
          res.data.amount = amount;
          res.data.duedate = duedate;
          setSelectedCustomers(res.data); //set selected customer state
          props.getCustomer(res.data); //set selected customer to the prop method from the cashsales page
          setLoading(false); //close the loading modal
          props.handleClose(); //close customer dialog box
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      {/* <Loader fullPage loading={props.shops.loading} /> */}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Select a customer
          </Typography>
        </Toolbar>
      </AppBar>

      <Loader fullPage loading={loading} />
      <Paper component="ul" className={classes.root}>
        {customers.length > 0
          ? customers.map((data, key) => {
              let icon = <TagFacesIcon />;
              return (
                <li
                  key={key}
                  style={{ padding: 5, float: "left", listStyle: "none" }}
                >
                  <Chip
                    icon={icon}
                    label={data.name}
                    className={classes.chip}
                    onClick={() => {
                      setSelectedCustomers(data);
                      props.getCustomer(data);

                      if (props.type === "credit") {
                        handleAlertClickOpen();
                      } else {
                        props.handleClose();
                      }
                    }}
                  />
                </li>
              );
            })
          : ""}
      </Paper>
      <form
        className="col s12"
        onSubmit={saveCustomer}
        style={{ margin: 10 }}
        autoComplete="off"
      >
        <Typography style={{ color: "red" }}>{error}</Typography>
        <Grid style={{ margin: 10 }}>
          <Grid item xs={12}>
            <label>Customer Name</label>
            <TextField
              fullWidth
              placeholder="Customer Name"
              id="outlined-basic"
              onChange={handleChange}
              name="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <label>Phone Number</label>
            <TextField
              fullWidth
              placeholder="Phone Number"
              id="outlined-basic"
              name="phone"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          {props.type === "credit" ? (
            <>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <label>Initial Amount</label>
                <TextField
                  fullWidth
                  placeholder="Initial Amount"
                  id="outlined-basic"
                  name="amount"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <label>Due Date</label>
                <TextField
                  fullWidth
                  placeholder="Due Date"
                  id="outlined-basic"
                  type="date"
                  name="duedate"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </>
          ) : (
            ""
          )}
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
        </Grid>

        <Dialog
          open={openalert}
          onClose={handleAlertClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Partial Payment?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If customer is paying initial payment, enter it here
            </DialogContentText>
            <Grid container>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="amount"
                  label="Enter Initial Payment"
                  onChange={handleChange}
                  type="email"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: 10 }}>
                <label>Due Date</label>
                <TextField
                  fullWidth
                  placeholder="Due Date"
                  type="date"
                  name="duedate"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleAlertClose();
                selectedcustomer.amount = inputs.amount;
                selectedcustomer.duedate = inputs.duedate;
                props.getCustomer(selectedcustomer);
                props.handleClose();
              }}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Dialog>
  );
}
export default withRouter(Customers);
