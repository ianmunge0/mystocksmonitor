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
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Chip from "@material-ui/core/Chip";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import {
  saveSupplier,
  getSuppliers,
  deleteSupplier,
} from "../../Redux/Actions/Suppliers";

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
function SupplierDialog(props) {
  // const [suppliers, setSuppliers] = useState([]);
  const [selectedsupplier, setSelectedSuppliers] = useState({});
  const [chipData, setChipData] = useState([]);

  useEffect(() => {
    props.getSuppliers();
  }, []);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  }
  const selectSupplier = () => {};

  const [supplier, setSuppliers] = useState({
    name: "",
    phone: "",
  });
  const { name, phone } = supplier;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuppliers((supplier) => ({ ...supplier, [name]: value }));
    console.log(supplier);
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const saveSupplier = (event) => {
    event.preventDefault();
    props.saveSupplier(supplier, event.target);
  };
  const handleSupplierDelete = (data) => {
    props.deleteSupplier(data);
  };

  // console.log("dialog", props);
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <Loader fullPage loading={props.waiting.loading} />
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
            Select a Supplier
          </Typography>
        </Toolbar>
      </AppBar>

      <Loader fullPage loading={loading} />
      <Paper component="ul" className={classes.root}>
        {props.suppliers
          ? props.suppliers.map((data, key) => {
              let icon = <TagFacesIcon />;
              return (
                <li
                  key={key}
                  style={{ padding: 5, float: "left", listStyle: "none" }}
                >
                  <Chip
                    icon={icon}
                    label={data.supplier_name}
                    className={classes.chip}
                    onDelete={() => handleSupplierDelete(data)}
                    onClick={() => {
                      setSelectedSuppliers(data);
                      props.getSupplier(data);

                      props.handleClose();
                    }}
                  />
                </li>
              );
            })
          : ""}
      </Paper>
      <form
        className="col s12"
        onSubmit={saveSupplier}
        style={{ margin: 10 }}
        autoComplete="off"
      >
        <Typography style={{ color: "red" }}>{error}</Typography>
        <Grid style={{ margin: 10 }}>
          <Grid item xs={12}>
            <label>Name</label>
            <TextField
              fullWidth
              placeholder="Customer Name"
              id="outlined-basic"
              onChange={handleChange}
              name="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <label>Phone Number</label>
            <TextField
              fullWidth
              placeholder="Phone Number"
              id="outlined-basic"
              name="phone"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20, padding: 15 }}
            className={classes.button}
            type="submit"
            endIcon={<Icon>send</Icon>}
          >
            Save
          </Button>
        </Grid>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  waiting: state.suppliers,
  suppliers: state.suppliers.suppliers,
});

const mapDispacthToProps = (dispatch) => {
  return {
    saveSupplier: (supplier, event) => dispatch(saveSupplier(supplier, event)),
    getSuppliers: () => dispatch(getSuppliers()),
    deleteSupplier: (data) => dispatch(deleteSupplier(data)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(SupplierDialog);
