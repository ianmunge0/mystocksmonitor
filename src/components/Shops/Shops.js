import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { getShops } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ShopForm from "./ShopForm";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import FolderIcon from "@material-ui/icons/Folder";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Divider, Typography } from "@material-ui/core";
function Shops(props) {
  useEffect(() => {
    props.getShops();
  }, []);

  const [error, setError] = useState();
  var errortxt = "";

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
      padding: 0,
    },
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Loader fullPage loading={props.shops.loading} />
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="All Shops" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="New Shop" href="/trash" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <List>
            {props.shops.shops.length > 0 ? (
              props.shops.shops.map((value, index) => (
                <>
                  <ListItem
                    key={index}
                    onClick={() =>
                      props.history.push({
                        pathname: `/shopsettings/${value.serialno}`,
                        myCustomProps: value,
                      })
                    }
                  >
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={value.shopname}
                      secondary={
                        <span>
                          Type: {value.shoptype}, Location: {value.region}
                        </span>
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              ))
            ) : (
              <div style={{ position: "relative" }}>
                <Typography
                  variant={"h5"}
                  align="center"
                  style={{ position: "absolute", top: "50%", margin: 20 }}
                >
                  No Shops yet
                </Typography>
              </div>
            )}
          </List>
          {/* <ul className="collection">
            {props.shops.shops.length > 0
              ? props.shops.shops.map((value, index) => (
                  <Link
                    to={{
                      pathname: `/shopsettings/${value.serialno}`,
                      myCustomProps: value,
                    }}
                    className="collection-item avatar"
                    key={index}
                  >
                    <div className="col s10">
                      <i className="material-icons circle">folder</i>
                      <span className="title">{value.shopname}</span>
                      <br />
                      <span>
                        Type: {value.shoptype}, Location: {value.region}
                      </span>
                    </div>
                    <div className="col s2">
                      <i className="material-icons right ">more_vert</i>
                    </div>
                  </Link>
                ))
              : ""}
          </ul> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ShopForm />
        </TabPanel>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  shops: state.shops,
  error: state.shops,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getShops: (shopid) => dispatch(getShops(shopid)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Shops);
