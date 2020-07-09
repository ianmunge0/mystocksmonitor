import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";

export default class Attendants extends Component {
  componentDidMount() {
    M.Tabs.init(document.querySelector(".tabs"), {
      swipeable: true,
    });
    document.addEventListener("DOMContentLoaded", function () {
      M.FormSelect.init(document.querySelectorAll("select"), {});
    });
  }
  render() {
    return (
      <div className="row">
        <ul id="tabs-swipe-demo" className="tabs">
          <li className="tab col s4">
            <a className="active" href="#test-swipe-1">
              <span>All Attendants</span>
            </a>
          </li>
          <li className="tab col s4">
            <a href="#test-swipe-2">New Attendant</a>
          </li>
        </ul>

        <div id="test-swipe-1" className="col s12">
          <div className="container">
            <div className="row">
              <p className="center">
                You have not added any attendant in this shop
              </p>
              <ul className="collection">
                <Link to="attendantsprofile" className="collection-item avatar">
                  <i className="material-icons circle">folder</i>
                  <span className="title">Fred</span>
                  <p>
                    role ~ Sales,Stock <br />3 months ago
                  </p>
                  <a href="#!" className="secondary-content">
                    <i className="material-icons">more_vert</i>
                  </a>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div id="test-swipe-2" className="col s12">
          <div className="container">
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i class="material-icons prefix">account_circle</i>
                    <input
                      id="attendant_name"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="attendant_name">username</label>
                  </div>
                </div>
                <div className="row">
                  <i class="material-icons valign-wrapper center-align col s2">
                    lock
                  </i>
                  <div class="input-field col s10">
                    <div className="row">
                      <label className="col s6">
                        <input type="checkbox" />
                        <span>Edit product</span>
                      </label>
                      <label className="col s6">
                        <input type="checkbox" />
                        <span>Add Stock</span>
                      </label>
                      <label className="col s6">
                        <input type="checkbox" />
                        <span>Sales</span>
                      </label>
                      <label className="col s6">
                        <input type="checkbox" />
                        <span>View Sales</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i class="material-icons prefix">lock</i>
                    <input
                      id="attendant_password"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="attendant_password">password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 center">
                    <button className="btn btn-primary">
                      <i class="material-icons left ">save</i>Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
