import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

import Divider from "@material-ui/core/Divider";

function Item(props) {
  // render() {
  const { title, icon, route, description, data, onClick } = props;
  return (
    <>
      <ListItem
        button
        onClick={() => {
          if (onClick) {
            props.onClick(true);
          } else {
            props.history.push({
              pathname: route,
              state: data,
            });
          }
        }}
      >
        {/* <i size={500} className="material-icons black-text left medium valign">
          {icon}
        </i> */}
        <Icon fontSize="large" style={{ marginRight: 10 }}>
          {icon}
        </Icon>

        <ListItemText
          primary={
            <div style={{ fontSize: 17, fontWeight: "bold" }}>{title}</div>
          }
          secondary={description}
        />
      </ListItem>
      <Divider />
    </>
    // <Link to={route}>
    //   <div className="collection-wrap">
    //     <div className="collection avatar">
    //       <div
    //         className="collection-item transparent valign-wrapper"
    //         style={{ borderBottom: 1 }}
    //       >
    //         <i className="material-icons black-text left medium valign">
    //           {icon}
    //         </i>
    //         <div className="black-text">
    //           <span style={{ fontSize: 18, fontWeight: "bold" }}>
    //             {title}
    //           </span>
    //           <br />
    //           <span style={{ fontSize: 12 }}>{description}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
  // }
}
export default withRouter(Item);
