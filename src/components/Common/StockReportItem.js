import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { grantPermission } from "../Common/GrantPermission";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import Typography from "@material-ui/core/Typography";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withRouter } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));
function StockReportItem(props, key) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { value, deleteStock } = props;
  var anchor = "bottom";

  const [item, setItem] = useState(null);
  const toggleDrawer = (anchor, open, item) => (event) => {
    console.log("toggleDrawer ", item);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setItem(item);
    setState({ ...state, [anchor]: open });
  };

  const toggleDrawerOne = (anchor, open, type) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });

    if (type === 0) {
      handleClickOpen();
    }
    if (type === 1) {
    }
    if (type === 2) {
      props.history.push({
        pathname: `/productsummary/${item.shopserial_key}`,
        state: {
          data: item,
        },
      });
    }
  };

  var listActionItems = ["Delete", "Edit"];
  if (grantPermission(["SALES_MANAGER"])) {
    listActionItems.push("Products History");
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {listActionItems.map((text, index) => (
          <ListItem
            button
            onClick={toggleDrawerOne(anchor, false, index)}
            button
            key={text}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => {
    setOpen(false);
    if (action === "delete") {
      deleteStock(item);
    }
  };

  return (
    <>
      <List
        className={classes.root}
        key={key}
        onClick={toggleDrawer("bottom", true, value)}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {parseInt(value.stock_qty) <= parseInt(value.reorder_level) ? (
              <Avatar style={{ backgroundColor: "#ff9800" }}>
                <ReportProblemIcon />
              </Avatar>
            ) : (
              <Avatar style={{ backgroundColor: "green" }}>
                <DoneAllIcon />
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={value.name}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {"Qty: " +
                    `${value.stock_qty} ${
                      value.unit_data ? value.unit_data.unit_name : ""
                    } ` +
                    " X " +
                    value.buyingprice +
                    " = " +
                    parseInt(value.buyingprice) * value.stock_qty}
                  {value.supplier_data
                    ? " | Supplier: " + `${value.supplier_data.supplier_name}`
                    : ""}
                  <br />
                </Typography>
                {"By ~ : " + `${value.username}`}
              </>
            }
          />
        </ListItem>
        <Divider />
      </List>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure you want to delete?"}
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
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>

      {/* <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment> */}
    </>
  );
}
export default withRouter(StockReportItem);
