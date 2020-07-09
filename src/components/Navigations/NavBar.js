import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link, withRouter } from "react-router-dom";
// import { hashHistory } from "react-router";
// import { useHistory } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import { BrowserHistory } from "react-router";
// import { useHistory } from "react-router-dom";

export default withRouter(({ history }) => {
  // let history = useHistory();
  // let history = useHistory();

  return <NavBar history={history} />;
});

class NavBar extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250,
    });
  }

  render() {
    return (
      <nav>
        <div className="container">
          <div className="row">
            {/* <div className="col s4 hide-on-med-and-down">
              <a href="#!" className="brand-logo ">
                My Profile
              </a>
            </div> */}
            <div className="col s8 ">
              {this.props.history.location.pathname !== "/" ? (
                <Link to="" onClick={() => this.props.history.goBack()}>
                  <i className="material-icons" style={{ fontSize: 60 }}>
                    keyboard_arrow_left
                  </i>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="nav-wrapper">
          <ul id="slide-out" className="sidenav">
            <li className="center-align">
              <div className="user-view">
                <a href="#user" className="profile-image">
                  <img
                    className="circle profile"
                    src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4080540331548233623-512.png"
                    alt=""
                  />
                  <i className="material-icons edit-icon">edit</i>
                </a>
                <a href="#name" className="text-black">
                  <span className="name">John Doe</span>
                </a>
                <a href="#email">
                  <span className="email">jdandturk@gmail.com </span>
                </a>
              </div>
            </li>
            <li>
              <a href="#!">
                <i className="material-icons">edit</i>EDIT PROFILE
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="material-icons">lock</i>LOGOUT
              </a>
            </li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              <a href="/" className="subheader">
                My Shops
              </a>
            </li>
            <li>
              <a className="waves-effect" href="#!">
                Shop One
              </a>
            </li>
          </ul>
          {this.props.history.location.pathname === "/" ? (
            <a href="!#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
          ) : (
            ""
          )}
        </div>
      </nav>
    );
  }
}
