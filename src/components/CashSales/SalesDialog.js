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
import { addSales } from "../../Redux/Actions/NewSales";
import { getStock } from "../../Redux/Actions/Stock";
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
function SalesDialog(props) {
  useEffect(() => {
    props.getStock();
  }, []);
  const classes = useStyles();

  const additemOnsaleList = (item) => {
    props.addSales(item, props);
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      {/* <Loader fullPage loading={props.sales.loading} /> */}
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
            Select a product
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {props.stocks.length > 0
          ? props.stocks.map((value, index) => (
              <div key={index}>
                <ListItem
                  disabled={value.stock_qty > 0 ? false : true}
                  button
                  onClick={() => additemOnsaleList(value)}
                >
                  <ListItemText
                    primary={`${value.name} Qty: ${value.stock_qty}`}
                    secondary={
                      value.stock_qty > 0 ? (
                        ""
                      ) : (
                        <span className="red-text">Out of stock</span>
                      )
                    }
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
  sales: state,
  stocks: state.stock.stocks,
  stockresponse: state.stock,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addSales: (item, props) => dispatch(addSales(item, props)),
    getStock: () => dispatch(getStock()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(SalesDialog);
