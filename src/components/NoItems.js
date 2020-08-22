import React from "react";

import { Typography } from "@material-ui/core";
export default function NoItems(props) {
  return (
    <div style={{ position: "relative" }}>
      <Typography
        variant={"h5"}
        align="center"
        style={{ position: "absolute", top: "50%", margin: 20 }}
      >
        {props.text}
      </Typography>
    </div>
  );
}
