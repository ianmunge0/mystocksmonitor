import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
export default function SingleSales(props) {
  console.log(props.location.state);
  var items = props.location.state.data.items;
  var receiptno = props.location.state.receiptno;
  var user = props.location.state.user;

  return (
    <>
      <List>
        <Typography
          h6
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
          <>
            <ListItem alignItems="flex-start" key={index}>
              <ListItemText
                primary={value.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Qty {value.qtysold} @ {value.onsalesellprice} ={" "}
                    </Typography>
                    {parseInt(value.qtysold) * parseInt(value.onsalesellprice)}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
}
