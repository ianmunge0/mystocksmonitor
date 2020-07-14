import React, { Component } from "react";

import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Loader(props) {
  return (
    <div className="container">
      <div className="sweet-loading">
        <MoonLoader css={override} size={60} color={"#123abc"} loading={true} />
      </div>
    </div>
  );
}
