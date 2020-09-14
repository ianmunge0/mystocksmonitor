import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SupplierItem(props) {
  const classes = useStyles();
  const { value, invoiceid, supplierid } = props;
  console.log("bb ", props);
  return (
    <List
      className={classes.root}
      key={invoiceid}
      onClick={() => {
        props.history.push({
          pathname: `/invoicepayment`,
          state: { data: value, invoiceno: invoiceid, supplierid },
        });
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={invoiceid} src="" />
        </ListItemAvatar>
        <ListItemText
          primary={"Invoice No#" + invoiceid}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                <span style={{ color: "green", fontSize: 13 }}>
                  Totals: {value.total} /={" "}
                </span>
                <span style={{ color: "green", fontSize: 13 }}>
                  Paid: {value.totalpaid} /={" "}
                </span>
                {value.totalunpaid > 0 && (
                  <span style={{ color: "red", fontSize: 13 }}>
                    UnPaid: {value.totalunpaid} /={" "}
                  </span>
                )}
                <br />
                <span style={{ fontSize: 13 }}>Date: {value.date}</span> <br />
                <span>Total Items: {value.items.length}</span>
              </Typography>
            </React.Fragment>
          }
        />
        <ArrowForwardIosIcon />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
export default withRouter(SupplierItem);
