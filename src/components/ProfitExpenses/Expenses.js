import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { reactLocalStorage } from "reactjs-localstorage";
import Api from "../../api/api";
import moment from "moment";

function Expenses(props) {
  const [expenses, setExpense] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    var data = {};

    setLoading(true);
    var dd = new Date().getTime();
    Api.get(`/profitandexpense.php`, {
      params: {
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        date_time: moment(dd).format("YYYY-MM-DD hh:mm:ss"),
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        className="tabwrap"
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
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="New" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Today's" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Loader fullPage loading={loading} />
      <TabPanel value={value} index={0}>
        <ExpenseForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ul className="collection">
          {expenses.map((value, index) => (
            <Link to="#" className="collection-item avatar" key={index}>
              <div className="col s10">
                <i className="material-icons circle">folder</i>
                <span className="title">{value.expensedetails}</span>
                <br />
                <span>{value.amount} /=</span>
              </div>
            </Link>
          ))}
        </ul>
      </TabPanel>
    </div>
  );
  //   }
}
const mapStateToProps = (state) => ({
  expenses: state,
});
export default connect(mapStateToProps)(Expenses);
