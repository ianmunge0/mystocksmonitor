import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NewShop from "../Shops/ShopForm";
import { reactLocalStorage } from "reactjs-localstorage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "transparent",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Setup Shop"];
}

function getStepContent(stepIndex) {
  return <NewShop />;
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  useEffect(() => {
    console.log("vv ", reactLocalStorage.getObject("currentshop") === "");
    if (reactLocalStorage.getObject("userdata").default_shop !== "") {
      window.location = "/dashboard";
    }
  }, []);

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div> {getStepContent(activeStep)}</div>
        )}
      </div>
    </div>
  );
}
