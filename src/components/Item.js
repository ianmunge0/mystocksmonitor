import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Item extends Component {
  render() {
    const { title, icon, route, description } = this.props;
    return (
      <Link to={route}>
        <div className="collection-wrap">
          <div className="collection avatar">
            <div
              className="collection-item transparent valign-wrapper"
              style={{ borderBottom: 1 }}
            >
              <i className="material-icons black-text left medium valign">
                {icon}
              </i>
              <div className="black-text">
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  {title}
                </span>
                <br />
                <span style={{ fontSize: 12 }}>{description}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
