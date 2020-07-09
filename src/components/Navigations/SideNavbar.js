import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SideNavbar extends Component {
  render() {
    return (
      <div className="">
        <ul
          id="slide-out"
          className="sidenav main-sidebar"
          style={{ transform: "translateX(0%)", position: "relative" }}
        >
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
            <Link>
              <i className="material-icons">lock</i>LOGOUT
            </Link>
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
      </div>
    );
  }
}
