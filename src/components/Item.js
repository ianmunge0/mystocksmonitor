import React, { Component } from "react";

export default class Item extends Component {
  render() {
    const { title, icon } = this.props;
    return (
      <a href="/">
        <div className="collection-wrap lighten-2">
          <div className="collection avatar">
            <div className="collection-item transparent valign-wrapper">
              <i className="material-icons left medium valign">{icon}</i>
              <span>{title}</span>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
