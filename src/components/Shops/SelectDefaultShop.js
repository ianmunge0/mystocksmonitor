import React, { useEffect } from "react";
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
function ShopsDialog(props) {
  useEffect(() => {
    props.getShops();
  }, []);
  const classes = useStyles();

  const changeDefaultShop = (shopid) => {
    props.setDeafultShop(shopid, props);
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <Loader fullPage loading={props.shops.loading} />
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
            Select a shop
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {props.shops.shops.length > 0
          ? props.shops.shops.map((value, index) => (
              <div key={index}>
                <ListItem
                  button
                  onClick={() => changeDefaultShop(value.serialno)}
                >
                  <ListItemText
                    primary={value.shopname}
                    secondary={`${value.region} ${value.shoptype}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))
          : ""}
      </List>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  shops: state.shops,
  error: state.shops,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getShops: (shopid) => dispatch(getShops(shopid)),
    setDeafultShop: (shopid, props) => dispatch(setDeafultShop(shopid, props)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(ShopsDialog);
