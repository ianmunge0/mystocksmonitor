import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getShops } from "../../Redux/Actions/Shops";
import {
  getStock,
  exportItems,
  saveStockCount,
} from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Messages from "../Common/Messages";
import NoItems from "../NoItems";

import Divider from "@material-ui/core/Divider";
import { reactLocalStorage } from "reactjs-localstorage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Select Shop", "Stocks", "Stock SetUp"];
}

function Export(props) {
  useEffect(() => {
    props.getStock();
    props.getShops();
  }, []);

  const classes = useStyles();
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  //export data state
  const [exportdata, setExportData] = useState({
    shop: "",
    stocks: [],
  });

  //stock ui
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    console.log("checked", newChecked);
    setChecked(newChecked);
  };

  const [allchecked, setAllChecked] = useState(false);
  const selectAll = () => () => {
    //remove checkbox from all checked box
    if (allchecked) {
      setAllChecked(false);
      setChecked([]);
    } else {
      setAllChecked(true);
      //start checking all the items
      const newChecked = [...checked];
      props.stocks.map((value, key) => {
        const currentIndex = checked.indexOf(value);
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
      });
      console.log("checked", newChecked);
      setChecked(newChecked);
    }
  };

  const handleQtyChange = (newcount, item) => {
    console.log("new qty", newcount.target.value);
    console.log("item ", item);
    console.log("exportdata ", exportdata);
    var commentIndex = exportdata.stocks.findIndex(function (c) {
      return c.serialno == item.serialno;
    });
    exportdata.stocks[commentIndex]["stock_qty"] = newcount.target.value;
    setExportData({
      ...exportdata,
      stocks: exportdata.stocks,
    });
    console.log("new data", exportdata);
    // var count = count[item.stockserial_key];
    // props.saveStockCount(count, item);
  };

  const removeItem = (item) => {
    checked.splice(item, 1);
    setExportData({
      ...exportdata,
      stocks: checked,
    });

    if (exportdata.stocks.length === 0) {
      handleBack();
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <List>
            {props.shops.shops.length === 1 ? (
              <NoItems text="No Shops to export data to" />
            ) : (
              ""
            )}
            {props.shops.shops.length > 0 ? (
              props.shops.shops.map((value, index) =>
                value.serialno !==
                reactLocalStorage.getObject("userdata").default_shop ? (
                  <div key={index}>
                    <ListItem
                      onClick={() => {
                        console.log("clicked", value);
                        handleComplete(value);
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6">{value.shopname}</Typography>
                        }
                        secondary={
                          <span>
                            Type: {value.shoptype}, Location: {value.region}
                          </span>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ) : (
                  ""
                )
              )
            ) : (
              <NoItems text="No Shops yet" />
            )}
          </List>
        );
      case 1:
        return (
          <List dense className={classes.root}>
            <Divider />
            <ListItem button>
              <ListItemText id={0} primary="Select All" />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={selectAll()}
                  checked={allchecked}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            {props.stocks.map((value, key) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <div key={key}>
                  <ListItem button>
                    <ListItemText
                      id={labelId}
                      primary={value.name}
                      secondary={`Qty: ${value.stock_qty}`}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        );
      case 2:
        return (
          <div>
            {checked.map((item, key) => {
              return (
                <div key={key} className="count-form" style={{ marginTop: 20 }}>
                  <Typography
                    style={{ fontSize: 16, marginTop: 0, marginBottom: 0 }}
                  >
                    {item.name}
                  </Typography>
                  <Grid container>
                    <Grid item xs>
                      <p style={{ fontSize: 12, marginTop: 10 }}>
                        Count ({item.stock_qty} )
                      </p>
                    </Grid>
                    <Grid item xs>
                      <TextField
                        className={classes.inputs}
                        id={item.stockserial_key}
                        defaultValue={item.stock_qty}
                        onChange={(e) => handleQtyChange(e, item)}
                        style={{ paddingTop: 12, paddingBottom: 12 }}
                        variant="outlined"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => removeItem(item)}
                        style={{
                          marginTop: 10,
                          marginLeft: 10,
                          float: "right",
                        }}
                      >
                        X
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider />
                </div>
              );
            })}
          </div>
        );

      default:
        return "Unknown step";
    }
  }

  const totalSteps = () => {
    return getSteps().length;
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (allStepsCompleted()) {
      handleReset();
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleErrors = (text) => {
    setError(text);
  };

  const handleComplete = (data) => {
    setError("");
    if (activeStep === 0) {
      if (data === "") {
        handleErrors("Select Shop First");
        return;
      }
      setExportData({
        ...exportdata,
        shop: data,
      });
    }
    if (activeStep === 1) {
      if (checked.length === 0) {
        handleErrors("Select atleast one item");
        return;
      }
      setExportData({
        ...exportdata,
        stocks: checked,
      });
    }
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  //upload items, final step
  const handleUpload = () => {
    props.exportItems(exportdata);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <div style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
        <Grid container>
          <Grid item xs={6} align="center">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={
                () => handleComplete("")
                // activeStep === totalSteps() - 1
                //   ? handleUpload
                //   : handleComplete("")
              }
            >
              {activeStep === totalSteps() - 1 ? "Export" : "Next"}
            </Button>
          </Grid>
        </Grid>
      </div>
      <Grid align="center" style={{ marginTop: 10, marginBottom: 10 }}>
        <Typography variant="caption" align="center">
          {activeStep === 0 ? "Select shop to transfer stock to" : ""}
          {activeStep === 1 ? "Select stocks to transfer" : ""}
          {activeStep === 2 ? "Setup stock quantity to transfer" : ""}
        </Typography>
      </Grid>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};

          //   if (isStepOptional(index)) {
          //     buttonProps.optional = (
          //       <Typography variant="caption">Optional</Typography>
          //     );
          //   }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <Messages type="error" text={error} />
      <Loader fullPage loading={props.exporteditems.stock.loading} />
      <div>
        {allStepsCompleted() ? (
          <div align="center">
            {props.exporteditems.stock.exporteditems ? (
              <>
                <Typography
                  variant="h6"
                  style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}
                >
                  {props.exporteditems.stock.exporteditems.successful}
                  {" items "}
                  Successfully Exported <br />
                  {props.exporteditems.stock.exporteditems.failed} {" items "}
                  Failed To export
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}
                >
                  You are about to export {exportdata.stocks.length} items to{" "}
                  {exportdata.shop.shopname}
                </Typography>
                <Button
                  style={{ marginTop: 20 }}
                  variant="outlined"
                  color="primary"
                  onClick={handleUpload}
                >
                  Export Now
                </Button>
              </>
            )}
          </div>
        ) : (
          <div style={{ paddingLeft: 15, paddingRight: 15 }}>
            {getStepContent(activeStep)}
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shops: state.shops,
  stocks: state.stock.stocks,
  error: state.shops,
  exporteditems: state,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getShops: (shopid) => dispatch(getShops(shopid)),
    getStock: () => dispatch(getStock()),
    exportItems: (data) => dispatch(exportItems(data)),

    saveStockCount: (count, item) => dispatch(saveStockCount(count, item)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Export);
