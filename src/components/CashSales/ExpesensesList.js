import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { reactLocalStorage } from "reactjs-localstorage";
import Api from "../../api/api";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import NoItems from "../NoItems";
function ExpensesList(props) {
  const [expenses, setExpense] = useState([]);
  const [loading, setLoading] = useState([]);
  console.log({
    shopid: reactLocalStorage.getObject("userdata").default_shop,
    fromtimestamp: props.location.state.fromtimestamp,
    totimestamp: props.location.state.totimestamp,
    action: "all",
  });
  useEffect(() => {
    setLoading(true);
    Api.get(`/profitandexpense.php`, {
      params: {
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        fromtimestamp: props.location.state.fromtimestamp,
        totimestamp: props.location.state.totimestamp,
        action: "all",
      },
    })
      .then((res) => {
        var response = res.data;
        setExpense(response);
        setLoading(false);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {expenses.length > 0 ? (
          expenses.map((value, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={value.expensedetails}
                secondary={value.amount}
              />
            </ListItem>
          ))
        ) : (
          <NoItems text="No expenses" />
        )}
      </List>
    </div>
  );
  //   }
}
const mapStateToProps = (state) => ({
  expenses: state,
});
export default connect(mapStateToProps)(ExpensesList);
