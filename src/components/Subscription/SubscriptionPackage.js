import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { reactLocalStorage } from "reactjs-localstorage";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: 25,
    margin: "auto",
    maxWidth: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  active: {
    backgroundColor: "#ff7e67",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const useStyles2 = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    // color: "#00ff00",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function SubscriptionPackage(props) {
  const classes1 = useStyles1();
  const classes = useStyles();
  const classes2 = useStyles2();
  const { packageitem } = props;

  return (
    <div style={{ cursor: "pointer" }}>
      <Paper
        className={[
          classes1.paper,
          reactLocalStorage.getObject("currentshop").packageid ===
            packageitem.serialno && classes1.active,
        ]}
        onClick={() => {
          props.history.push({
            pathname: "paymentoptions",
            state: { data: packageitem },
          });
        }}
      >
        <Grid container>
          <Grid item xs direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5">
                <strong>{packageitem.plan}</strong> ~ @KES {packageitem.price}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {/* @KES {packageitem.price} */}
              </Typography>
              <Typography variant="body2" color="textSecondary"></Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                {packageitem.moreinfo}
              </Typography>
            </Grid>
          </Grid>
          <Grid item direction="row" justify="flex-end" alignItems="center">
            <Button
              component={Link}
              to="/subscriptionpackages"
              variant="outlined"
              size="large"
              color="primary"
              className={classes2.margin}
            >
              Upgrade
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default withRouter(withRouter(SubscriptionPackage));
