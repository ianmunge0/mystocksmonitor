import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  getProductSummary,
  getProductStockIn,
  deleteProductStockIn,
} from "../../../Redux/Actions/Product";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SalesHistory from "./SalesHistory";
import BadStocks from "./BadStocks";
import StockIn from "./StockIn";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

const year = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => index + year);
const d = new Date();
const ITEM_HEIGHT = 100;

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
function ProductHistory(props) {
  const classes = useStyles();
  useEffect(() => {
    console.log(value);
    //check the
    loadTabsData(value, d.getFullYear());
  }, []);

  const loadTabsData = (index, year) => {
    //check tab position
    if (index === 0) {
      props.getProductSummary(props.location.state.data.stockserial_key, year);
    }
    if (index === 1) {
      props.getProductStockIn(props.location.state.data.stockserial_key, year);
    }
  };

  //tabs states
  const [value, setValue] = useState(0);
  //change tab state on click
  const handleChange = (event, newValue) => {
    setValue(newValue);
    loadTabsData(newValue, year);
  };

  //this is to handle opening and closing of the year dialog
  const handleOpenYear = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openn = Boolean(anchorEl);
  const [year, setYear] = useState(d.getFullYear());

  const handleCloseYear = (selectedyear) => {
    if (Math.round(selectedyear) != selectedyear) {
      selectedyear = d.getFullYear();
    }

    setAnchorEl(null);

    setYear(selectedyear);
    //check the tab index
    loadTabsData(value, selectedyear);
    // props.getProductSummary(props.itemdata.stockserial_key, option);
  };
  //end of opening and closing of year dialog

  console.log("ProductHistory " + value, props);

  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={openn}
          onClose={handleCloseYear}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "30ch",
            },
          }}
        >
          {years.map((option) => (
            <MenuItem
              key={option}
              selected={option === year}
              onClick={() => handleCloseYear(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth onClick={handleOpenYear}>
            Current Year {year} ~ <FilterListIcon fontSize="large" />
          </Button>
        </Grid>
      </Grid>
      <Loader fullPage loading={props.sales.productsummary.loading} />
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Sales" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="StockIn" href="/spam" {...a11yProps(1)} />
          <LinkTab label="BadStocks" href="/trash" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <div style={{ margin: 10 }}>
        <TabPanel value={value} index={0}>
          <SalesHistory
            shopid={props.match.params.id}
            itemdata={props.location.state.data}
            year={year}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StockIn stocks={props.sales.productsummary} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <BadStocks />
        </TabPanel>
      </div>
    </div>
  );
}
// export default withRouter(ProductHistory);
const mapDispacthToProps = (dispatch) => {
  return {
    getProductStockIn: (id, fromtime, totime, year) =>
      dispatch(getProductStockIn(id, fromtime, totime, year)),
    deleteProductStockIn: (id) => dispatch(deleteProductStockIn(id)),
    getProductSummary: (id, year) => dispatch(getProductSummary(id, year)),
    dispatch,
  };
};
const mapStateToProps = (state) => ({
  sales: state,
});

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(withRouter(ProductHistory));
