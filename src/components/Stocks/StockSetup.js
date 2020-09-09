import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import NewStock from "../Stocks/NewStock";
import AllStocks from "../Stocks/AllStocks";
import StockCount from "../Stock/StockCount";
import { grantPermission } from "../Common/GrantPermission";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabwrap"
      hidden={value !== index}
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

export default function StockSetup() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {/* <NavBar titleone="Stock in Report  " /> */}
      {/* <NewNav titleone="Stock in Report  " /> */}
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Stocks" href="/drafts" {...a11yProps(0)} />
          {grantPermission(["ADD_STOCK"]) && (
            <LinkTab label="Add New" href="/trash" {...a11yProps(1)} />
          )}
          <LinkTab label="Counts" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <div style={{ margin: 10 }}>
        <TabPanel value={value} index={0}>
          <AllStocks />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NewStock />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StockCount />
        </TabPanel>
      </div>
    </div>
  );
}
