import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { getShops, setDeafultShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Slide from "@material-ui/core/Slide";
import Api from "../../api/api";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CountryDialog(props) {
  useEffect(() => {
    Api.get(`/myprofile.php`, {
      params: { action: "countries" },
    })
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  }, []);
  const classes = useStyles();
  const [countries, setCountries] = useState({});

  const changeDefaultShop = (country) => {
    // setCountry(country);
    props.setdcountry(country);
    props.handleClose();
  };
  // const [country, setCountry] = useState({});

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      setdcountry={props.setdcountry}
      TransitionComponent={Transition}
    >
      {/* <Loader fullPage loading={props.shops.loading} /> */}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Select Country
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {countries.length > 0
          ? countries.map((value, index) => (
              <div key={index}>
                <ListItem button onClick={() => changeDefaultShop(value)}>
                  <ListItemText primary={value.name} />
                </ListItem>
                <Divider />
              </div>
            ))
          : ""}
      </List>
    </Dialog>
  );
}
