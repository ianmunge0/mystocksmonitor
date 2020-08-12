import React, { Component } from "react";

import NavBar from "../../components/Navigations/NavBar";
export default function SingleSales(props) {
  console.log(props.location.state);
  var items = props.location.state.data.items;
  var receiptno = props.location.state.receiptno;
  var user = props.location.state.user;

  return (
    <>
      {/* <NavBar titleone={"Receipt #" + receiptno + " by ~ " + user} /> */}
      <div className="container">
        <div className="row">
          <h5 style={{ paddingLeft: 10 }}>
            {"Receipt #" + receiptno + " by ~ " + user}
          </h5>
          <ul className="collection">
            {items.map((value, index) => (
              <li className="collection-item avatar" key={index}>
                <img
                  alt="test"
                  className="circle responsive-img"
                  src="/images/product.png"
                />
                <span className="title" style={{ fontWeight: "bold" }}>
                  {value.name}
                </span>
                <p>
                  Qty {value.qtysold} @ {value.onsalesellprice} ={" "}
                  {parseInt(value.qtysold) * parseInt(value.onsalesellprice)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
