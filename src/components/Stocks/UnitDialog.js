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
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { saveUnit, getUnits, deleteUnit } from "../../Redux/Actions/Stock";
import { fromUnixTime } from "date-fns";

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
function UnitDialog(props) {
  // const [suppliers, setSuppliers] = useState([]);
  const [chipData, setChipData] = useState([]);

  const [openalert, setOpenAlert] = React.useState(false);

  const handleAlertClickOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    // console.log({
    //   action: "all",
    //   shopid: reactLocalStorage.getObject("userdata").default_shop,
    // });
    // setLoading(true);
    props.getUnits();
  }, []);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);

  const [unit, setUnit] = useState({
    unit_name: "",
  });
  const { unit_name } = unit;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnit((unit) => ({ ...unit, [name]: value }));
    console.log(unit);
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const saveUnit = (event) => {
    event.preventDefault();
    props.saveUnit(unit, event.target);
  };

  const handleUnitDelete = (data) => {
    props.deleteUnit(data);
  };

  console.log("dialog", props);
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
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
            Select a Unit
          </Typography>
        </Toolbar>
      </AppBar>

      <Loader fullPage loading={props.waiting.stock.loading} />
      <Paper component="ul" className={classes.root}>
        {props.units
          ? props.units.map((data, key) => {
              let icon = <TagFacesIcon />;
              return (
                <li
                  key={key}
                  style={{ padding: 5, float: "left", listStyle: "none" }}
                >
                  <Chip
                    icon={icon}
                    label={data.unit_name}
                    className={classes.chip}
                    onDelete={() => handleUnitDelete(data)}
                    onClick={() => {
                      props.getUnit(data);

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
        onSubmit={saveUnit}
        style={{ margin: 10 }}
        autoComplete="off"
      >
        <Typography style={{ color: "red" }}>{error}</Typography>
        <Grid style={{ margin: 10 }}>
          <Grid item xs={12}>
            <label>Name</label>
            <TextField
              fullWidth
              placeholder="Name"
              id="outlined-basic"
              onChange={handleChange}
              name="unit_name"
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
  waiting: state,
  units: state.stock.units,
});

const mapDispacthToProps = (dispatch) => {
  return {
    saveUnit: (unit, e) => dispatch(saveUnit(unit, e)),
    getUnits: () => dispatch(getUnits()),
    deleteUnit: (id) => dispatch(deleteUnit(id)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(UnitDialog);
