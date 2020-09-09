import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import Chip from "@material-ui/core/Chip";
export default function SingleSales(props) {
  var items = props.location.state.data.items;
  var receiptno = props.location.state.receiptno;
  var user = props.location.state.user;

  return (
    <>
      <List>
        <Typography
          variant="h6"
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            background: "lightgrey",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          {"Receipt #" + receiptno + " by ~ " + user}
        </Typography>
        {items.map((value, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={value.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Qty {value.qtysold} @ {value.onsalesellprice}{" "}
                      {value.currency} ={" "}
                    </Typography>
                    {parseInt(value.qtysold) * parseInt(value.onsalesellprice)}
                    {value.currency}
                  </React.Fragment>
                }
              />
              <br />
              <Chip
                icon={<FaceIcon />}
                size="small"
                label={value.cashorcredit}
                variant="outlined"
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
}
