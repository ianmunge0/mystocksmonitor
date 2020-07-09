import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

export default class Attendantprofile extends Component {
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
        <div className="col s12 m12">
          <div class="card">
            <div class="card-content">
              <div className="container">
                <div className="row  valign-wrapper">
                  <div className="col s6 m3">
                    <img
                      alt="test"
                      className="circle left responsive-img"
                      src="http://demo.geekslabs.com/materialize/v2.3/layout03/images/avatar.jpg"
                    />
                  </div>
                  <div className="col s6 m3">
                    <div className="row">
                      <div className="col s12">
                        <h6>Total Sales</h6>
                      </div>
                      <div className="col s12">
                        <h6 style={{ fontSize: 12 }}>200</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col s6 m3">
                    <div className="row">
                      <div className="col s12">
                        <h6>Stocks</h6>
                      </div>
                      <div className="col s12">
                        <h6 style={{ fontSize: 12 }}>0</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col s6 m3">
                    <div className="row">
                      <div className="col s12">
                        <h6>Last Seen</h6>
                      </div>
                      <div className="col s12">
                        <h6 style={{ fontSize: 12 }}>20 minutes ago</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-tabs">
              <ul class="tabs tabs-fixed-width">
                <li class="tab">
                  <a href="#test4">Profile</a>
                </li>
                <li class="tab">
                  <a href="#test6">Settings</a>
                </li>
              </ul>
            </div>
            <div class="card-content grey lighten-4">
              <div id="test4">
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
                            <i class="material-icons left ">save</i>Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div id="test6">
                <form className="col s12">
                  <div className="switch">
                    <label>
                      <div className="row valign-wrapper">
                        <div className="col s8">
                          <h6>Sales notification </h6>
                        </div>
                        <div className="col s4">
                          <input type="checkbox" />
                          <span className="lever"></span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="switch">
                    <label>
                      <div className="row valign-wrapper">
                        <div className="col s8">
                          <h6>Block fred </h6>
                        </div>
                        <div className="col s4">
                          <input type="checkbox" />
                          <span className="lever"></span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <p>
                    <h6>Roles</h6>
                    <div className="container">
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
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
