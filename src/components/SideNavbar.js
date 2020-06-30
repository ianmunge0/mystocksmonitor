import React, { Component } from "react";

export default class SideNavbar extends Component {
  render() {
    return (
      <div className="side-Wrapper">
        <div className="user-view">
          <div className="background center-align ">
            <img
              className="responsive-img profile  circle"
              alt=""
              src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4080540331548233623-512.png"
            />
          </div>
          <div className="center-align ">
            <span className="white-text name">John Doe</span>
          </div>
          <div className="center-align ">
            <span className="white-text email">jdandturk@gmail.com</span>
          </div>
        </div>

        <ul className="collection avatar">
          <a href="/">
            <li className="collection-item transparent">
              <i className="material-icons left white-text">lock</i>
              <span className="white-text">Logout</span>
            </li>
          </a>
        </ul>
      </div>
    );
  }
}
