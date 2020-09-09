import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import Alert from "@material-ui/lab/Alert";
import ImageIcon from "@material-ui/icons/Image";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Divider, Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));
export default function BadStockItem(props) {
  const classes = useStyles();
  const { row, toggleDrawer } = props;
  return (
    <List className={classes.root} onClick={toggleDrawer("bottom", true, row)}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: "#ff9800" }}>
            <CancelIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={row.name}
          secondary={
            <>
              <Grid container>
                <Grid item xs={8}>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {"Qty: " +
                      `${row.stock_qty} ${
                        row.unit_data ? row.unit_data.unit_name : ""
                      }`}
                    <br /> {row.reason}
                  </Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {row.date_time}
                    <br /> {"by ~ " + row.username}
                  </Typography>
                </Grid>
              </Grid>
            </>
          }
        />
      </ListItem>
      <Divider />
    </List>
  );
}
