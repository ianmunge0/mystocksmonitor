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
import Slide from "@material-ui/core/Slide";
import moment from "moment";
import { withRouter } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const ITEM_HEIGHT = 48;
const options = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const year = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => index + year);

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
const d = new Date();
function Months(props) {
  useEffect(() => {}, []);
  const classes = useStyles();

  const getMonth = (monthStr) => {
    return new Date(monthStr + "-1-01").getMonth() + 1;
  };

  const selectMonth = (month) => {
    const input = getMonth(month) + "-" + year;
    const output = moment(input, "MM-YY");
    console.log(input);

    props.history.push({
      pathname: props.pathname,
      state: {
        fromdate: moment(output.startOf("month").format("LL")).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
        todate: moment(output.endOf("month").format("LL")).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
        type: "monthly",
      },
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (typestring) => {
    setOpen(true);
    setType(typestring);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenYear = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  const [year, setYear] = useState(d.getFullYear());
  const [type, setType] = useState("");
  function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  }

  const handleCloseYear = (option) => {
    setAnchorEl(null);
    setYear(option);
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
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
            Select a month
          </Typography>
        </Toolbar>
      </AppBar>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        style={{ width: "100%" }}
        aria-haspopup="true"
        onClick={handleOpenYear}
      >
        Current Year ~ {year}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openn}
        onClose={handleCloseYear}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
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
      <List>
        {options.map((value, index) => (
          <div key={index}>
            <ListItem button onClick={() => selectMonth(value)}>
              <ListItemText primary={value} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Dialog>
  );
}
export default withRouter(Months);
