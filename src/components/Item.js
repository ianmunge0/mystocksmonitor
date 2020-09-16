import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";

function Item(props) {
  const { title, icon, route, description, data, onClick, disabled } = props;
  return (
    <>
      {disabled && (
        <Grid container>
          <Grid>
            <Button
              style={{
                position: "absolute",
                right: 5,
                fontSize: 12,
                color: "#931a25",
              }}
            >
              Upgrade
            </Button>
          </Grid>
        </Grid>
      )}

      <ListItem
        button
        onClick={() => {
          if (disabled && route != "shops" && route != "subscriptions") {
            props.history.push("subscriptions");
          } else {
            if (onClick) {
              props.onClick(true);
            } else {
              props.history.push({
                pathname: route,
                state: data,
              });
            }
          }
        }}
      >
        <Icon fontSize="large" style={{ marginRight: 10 }}>
          {icon}
        </Icon>

        <ListItemText
          primary={
            <div style={{ fontSize: 17, fontWeight: "bold" }}>{title}</div>
          }
          secondary={description}
        />
      </ListItem>
      <Divider />
    </>
  );
}
export default withRouter(Item);
