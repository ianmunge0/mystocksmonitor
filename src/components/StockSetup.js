import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import NewStock from "./Stock/NewStock";
import { Link } from "react-router-dom";

export default class StockSetup extends Component {
  componentDidMount() {
    M.Tabs.init(document.querySelector(".tabs"), {
      swipeable: true,
    });
    M.Modal.init(document.querySelectorAll(".modal"), {
      onOpenEnd: function (el) {},
    });
  }
  render() {
    return (
      <div className="row">
        <ul id="tabs-swipe-demo" className="tabs">
          <li className="tab col s4">
            <a className="active" href="#test-swipe-1">
              <span>New Stock</span>
            </a>
          </li>
          <li className="tab col s4">
            <a href="#test-swipe-2">All Stocks</a>
          </li>
          <li className="tab col s4">
            <a href="#test-swipe-3">Count</a>
          </li>
        </ul>

        <div id="test-swipe-1" className="col s12">
          <div className="container">
            <div className="row">
              <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                <p>
                  Adding product forfirst time, attendants with the role of add
                  stock and admin will be able to manage product positions.
                </p>
              </div>
              <NewStock />
            </div>
          </div>
        </div>
        <div id="test-swipe-2" className="col s12">
          <div className="container">
            <div className="row">
              <table className="highlight">
                <thead>
                  <tr>
                    <th>
                      Name <br /> Buying Price
                    </th>
                    <th className="right">
                      <span className="right">Qty</span>
                      <br />
                      Selling Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="modal-trigger " data-target="editmodal">
                    <td>
                      Hammer <br />
                      299/=
                    </td>
                    <td className="right">
                      <div className="left">
                        200 pieces
                        <br />
                        100/=,200/=,300/=
                      </div>
                      <a href="!#" className="secondary-content ">
                        <i className="material-icons valign">more_vert</i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="test-swipe-3" className="col s12">
          <Link
            to="/counthistory"
            clLinkssName="btn btn-primary"
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            <i className="material-icons left">remove_red_eye</i>View Count
            History
          </Link>
          <ul class="collection">
            <li class="collection-item">
              <div className="row  valign-wrapper">
                <div className="col s4">
                  <div className="col s12">
                    <p style={{ fontSize: 16 }}>Hammer</p>
                    <p style={{ fontSize: 12 }}>System Count (3)</p>
                  </div>
                </div>
                <div className="col s5">
                  <div className="col s12">
                    <div className="row valign-wrapper">
                      <div className="col s3">
                        <i className="material-icons editicons">
                          control_point
                        </i>
                      </div>
                      <div className="col s6">
                        <input type="text" className="editinput" />
                      </div>
                      <div className="col s3">
                        <i className="material-icons editicons">
                          remove_circle_outline
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s3">
                  <button className="btn btn-small">update</button>
                </div>
              </div>
            </li>
            <li class="collection-item">
              <div className="row  valign-wrapper">
                <div className="col s4">
                  <div className="col s12">
                    <p style={{ fontSize: 16 }}>Hammer</p>
                    <p style={{ fontSize: 12 }}>System Count (3)</p>
                  </div>
                </div>
                <div className="col s5">
                  <div className="col s12">
                    <div className="row valign-wrapper">
                      <div className="col s3">
                        <i className="material-icons editicons">
                          control_point
                        </i>
                      </div>
                      <div className="col s6">
                        <input type="text" className="editinput" />
                      </div>
                      <div className="col s3">
                        <i className="material-icons editicons">
                          remove_circle_outline
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s3">
                  <button className="btn btn-small">update</button>
                </div>
              </div>
            </li>
            <li class="collection-item">
              <div className="row  valign-wrapper">
                <div className="col s4">
                  <div className="col s12">
                    <p style={{ fontSize: 16 }}>Hammer</p>
                    <p style={{ fontSize: 12 }}>System Count (3)</p>
                  </div>
                </div>
                <div className="col s5">
                  <div className="col s12">
                    <div className="row valign-wrapper">
                      <div className="col s3">
                        <i className="material-icons editicons">
                          control_point
                        </i>
                      </div>
                      <div className="col s6">
                        <input type="text" className="editinput" />
                      </div>
                      <div className="col s3">
                        <i className="material-icons editicons">
                          remove_circle_outline
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s3">
                  <button className="btn btn-small">update</button>
                </div>
              </div>
            </li>
            <li class="collection-item">
              <div className="row  valign-wrapper">
                <div className="col s4">
                  <div className="col s12">
                    <p style={{ fontSize: 16 }}>Hammer</p>
                    <p style={{ fontSize: 12 }}>System Count (3)</p>
                  </div>
                </div>
                <div className="col s5">
                  <div className="col s12">
                    <div className="row valign-wrapper">
                      <div className="col s3">
                        <i className="material-icons editicons">
                          control_point
                        </i>
                      </div>
                      <div className="col s6">
                        <input type="text" className="editinput" />
                      </div>
                      <div className="col s3">
                        <i className="material-icons editicons">
                          remove_circle_outline
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s3">
                  <button className="btn btn-small">update</button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="col s12">
          <div id="editmodal" className="modal bottom-sheet">
            <div className="modal-content sidenav bottom-modal">
              <ul>
                <li>
                  <a href="#!">
                    <i className="material-icons">format_list_bulleted</i>
                    Product History
                  </a>
                </li>
                <li>
                  <Link to="editstock">
                    <i className="material-icons">edit</i>Edit
                  </Link>
                </li>
                <li>
                  <a
                    href="#!"
                    className="modal-trigger "
                    data-target="deletealert"
                  >
                    <i className="material-icons">delete</i>Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div id="deletealert" className="modal">
            <div className="modal-content">
              Are you sure you want to delete this product?
            </div>
            <div class="modal-footer">
              <a
                href="#!"
                class="modal-close waves-effect waves-green btn-flat"
              >
                NO
              </a>
              <a
                href="#!"
                class="modal-close waves-effect waves-green btn-flat"
              >
                YES
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
