import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CountHistory extends Component {
  render() {
    return (
      <ul class="collection">
        <li class="collection-item countitem">
          <div className="row">
            <span class="title left ">Monday, July 6, 2020</span>
            <br />
            <p className="left">
              <h6>1/10 items counted</h6> 0 - over stocked, 10 - under stocked,
            </p>
            <Link to="count" class="secondary-content right">
              <i class="material-icons">remove_red_eye</i>
            </Link>
          </div>
        </li>
      </ul>
    );
  }
}
