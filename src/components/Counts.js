import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Counts extends Component {
  render() {
    return (
      <>
        <div className="nav-wrapper z-depth-3" style={{ padding: 5 }}>
          <form>
            <div className="input-field">
              <input
                placeholder="quick search"
                id="search"
                type="search"
                required
              />
              <label className="label-icon" for="search">
                <i className="material-icons">search</i>
              </label>
              <i class="material-icons">close</i>
            </div>
          </form>
        </div>

        <ul class="collection">
          <li class="collection-item countitem">
            <div className="row">
              <div className="col s6">
                <div className="row">
                  <div className="col s12">
                    <span class="title left ">Hammer</span>
                    <br />
                    <div className="left">
                      Previous count 0, current count 0,
                    </div>
                  </div>

                  <div className="col s12">
                    <span class="new badge">Status: overstocked</span>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <Link to="count" class="secondary-content right">
                  <i class="material-icons">remove_red_eye</i>
                </Link>
              </div>
            </div>
          </li>
          <li class="collection-item countitem">
            <div className="row">
              <div className="col s6">
                <div className="row">
                  <div className="col s12">
                    <span class="title left ">Hammer</span>
                    <br />
                    <div className="left">
                      Previous count 0, current count 0,
                    </div>
                  </div>

                  <div className="col s12">
                    <span class="new red badge">Status: under stocked</span>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <Link to="count" class="secondary-content right">
                  <i class="material-icons">remove_red_eye</i>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </>
    );
  }
}
