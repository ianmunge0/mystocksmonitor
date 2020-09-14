import React, { Component, useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function (ComposedComponent) {
  function NetworkDetector(props) {
    const [isDisconnected, setisDisconnected] = useState(false);

    useEffect(() => {
      handleConnectionChange();
      window.addEventListener("online", handleConnectionChange);
      window.addEventListener("offline", handleConnectionChange);
    }, []);

    // componentDidMount() {
    //   this.handleConnectionChange();
    //   window.addEventListener("online", this.handleConnectionChange);
    //   window.addEventListener("offline", this.handleConnectionChange);
    // }

    // componentWillUnmount() {
    //   window.removeEventListener("online", this.handleConnectionChange);
    //   window.removeEventListener("offline", this.handleConnectionChange);
    // }

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      if (condition === "online") {
        const webPing = setInterval(() => {
          fetch("//google.com", {
            mode: "no-cors",
          })
            .then(() => {
              setisDisconnected(false);
              navigator.serviceWorker.controller.postMessage("updatedatabase");
              return clearInterval(webPing);
            })
            .catch(() => {
              setisDisconnected(true);
            });
        }, 2000);
        return;
      }

      return setisDisconnected(true);
    };

    // render() {
    const useStyles = makeStyles((theme) => ({
      "@global": {
        body: {
          backgroundColor: theme.palette.background.paper,
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      snackbar: {
        [theme.breakpoints.down("xs")]: {
          bottom: 30,
        },
        width: "100%",
      },
    }));
    const classes = useStyles();
    return (
      <div>
        {isDisconnected && (
          <Snackbar
            open={true}
            // autoHideDuration={6000}
            message="Your on an offline mode"
            action={
              <Button color="inherit" size="small">
                Okay
              </Button>
            }
            className={classes.snackbar}
          />
        )}
        <ComposedComponent {...props} />
      </div>
    );
    // }
  }

  return NetworkDetector;
}
