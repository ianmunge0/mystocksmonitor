import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import { getShops } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
function ShopsDialog(props) {
  useEffect(() => {
    props.getShops();
  }, []);

  const changeDefaultShop = (shopid) => {
    props.setDeafultShop(shopid, props);
  };

  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullScreen={fullScreen}
    >
      <Button onClick={() => handleClose()} className="btn btn-primary">
        Close
      </Button>
      <DialogTitle id="simple-dialog-title">Set Shop</DialogTitle>
      <List>
        {props.shops.shops.length > 0
          ? props.shops.shops.map((value, index) => (
              <ListItem
                button
                onClick={() => handleListItemClick(value)}
                key={index}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={value.shopname} />
              </ListItem>
            ))
          : ""}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

ShopsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  shops: state.shops,
  error: state.shops,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getShops: (shopid) => dispatch(getShops(shopid)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(ShopsDialog);
