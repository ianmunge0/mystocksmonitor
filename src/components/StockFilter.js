import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

export default class StockFilter extends Component {
  componentDidMount() {
    M.Modal.init(document.querySelectorAll(".modal"), {
      onOpenEnd: function (el) {},
    });
  }
  render() {
    return (
      <>
        <div
          className="nav-wrapper z-depth-3"
          style={{ padding: 5, marginTop: 10 }}
        >
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

        <div>
          <div>
            <div className="container">
              <div className="row">
                <div className="col s3 center">
                  <h6>Entries</h6>
                  <h6>3</h6>
                </div>
                <div className="col s5 center">
                  <h6>On Credit</h6>
                  <h6>3</h6>
                </div>
                <div className="col s4 center">
                  <h6>On cash</h6>
                  <h6>3</h6>
                </div>
              </div>
            </div>
            <div class="section modal-trigger " data-target="editmodal">
              <h5>Hammer </h5>
              <div>qty 2 x 22 = 44/=</div>
              <div className="container">
                <div className="row">
                  <div className="col s4 stocktxt">
                    <p>~ by fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>supplied by ~ fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>30 days a go</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="section modal-trigger " data-target="editmodal">
              <h5>Hammer </h5>
              <div>qty 2 x 22 = 44/=</div>
              <div className="container">
                <div className="row">
                  <div className="col s4 stocktxt">
                    <p>~ by fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>supplied by ~ fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>30 days a go</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="section modal-trigger " data-target="editmodal">
              <h5>Hammer </h5>
              <div>qty 2 x 22 = 44/=</div>
              <div className="container">
                <div className="row">
                  <div className="col s4 stocktxt">
                    <p>~ by fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>supplied by ~ fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>30 days a go</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="section modal-trigger " data-target="editmodal">
              <h5>Hammer </h5>
              <div>qty 2 x 22 = 44/=</div>
              <div className="container">
                <div className="row">
                  <div className="col s4 stocktxt">
                    <p>~ by fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>supplied by ~ fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>30 days a go</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="section modal-trigger " data-target="editmodal">
              <h5>Hammer </h5>
              <div>qty 2 x 22 = 44/=</div>
              <div className="container">
                <div className="row">
                  <div className="col s4 stocktxt">
                    <p>~ by fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>supplied by ~ fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>30 days a go</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="section modal-trigger " data-target="editmodal">
              <h5>Hammer </h5>
              <div>qty 2 x 22 = 44/=</div>
              <div className="container">
                <div className="row">
                  <div className="col s4 stocktxt">
                    <p>~ by fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>supplied by ~ fred</p>
                  </div>
                  <div className="col s4 stocktxt">
                    <p>30 days a go</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
          </div>
        </div>

        <div className="col s12">
          <div id="editmodal" className="modal bottom-sheet">
            <div className="modal-content sidenav bottom-modal">
              <ul>
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
      </>
    );
  }
}
