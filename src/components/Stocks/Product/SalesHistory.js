import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { getProductSummary } from "../../../Redux/Actions/Product";
import { connect } from "react-redux";
import { Divider } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import NoItems from "../../NoItems";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function SalesHistory(props) {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  useEffect(() => {
    // console.log("ss", props.match.params.id);
    //props.getProductSummary(props.itemdata.stockserial_key, d.getFullYear());
  }, []);
  // console.log("sales", props);
  // const handleOpenYear = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const [anchorEl, setAnchorEl] = useState(null);
  // const openn = Boolean(anchorEl);
  // const [year, setYear] = useState(d.getFullYear());

  // const handleCloseYear = (option) => {
  //   // option = option + "";
  //   if (Math.round(option) != option) {
  //     option = d.getFullYear();
  //   }

  //   setAnchorEl(null);

  //   setYear(option);
  //   props.getProductSummary(props.itemdata.stockserial_key, option);
  // };

  const allsales = Object.keys(props.sales.productsummary.summary).map(
    function (key) {
      return (
        <div key={key}>
          <ListItem>
            <ListItemText
              primary={key}
              onClick={() =>
                props.history.push({
                  pathname: "/productssales",
                  state: {
                    data: props.itemdata,
                    monthname: key,
                    year: props.year,
                  },
                })
              }
              secondary={props.sales.productsummary.summary[key].sales}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                {props.sales.productsummary.summary[key].totalsales
                  ? props.sales.productsummary.summary[key].totalsales
                  : 0}
                /=
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      );
    }
  );
  // }
  // console.log("tifOptions", props.sales.productsummary.loading);
  // return <></>;
  var total = 0;
  const totalsales = Object.keys(props.sales.productsummary.summary).map(
    function (key) {
      var tt = props.sales.productsummary.summary[key].totalsales;
      if (Math.round(tt) == tt) {
        return (total += parseInt(tt));
      }
    }
  );

  return (
    <div>
      {/* <Loader fullPage loading={props.sales.productsummary.loading} /> */}
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            {props.itemdata.name}: ({totalsales ? totalsales : 0} / =)
          </Typography>
        </Grid>
      </Grid>
      <List dense={dense}>
        {allsales.length > 0 ? allsales : <NoItems text="No Sales" />}
      </List>
    </div>
  );
}
const mapDispacthToProps = (dispatch) => {
  return {
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
)(withRouter(SalesHistory));
