import React, { useState } from "react";
import NavBar from "../../components/Navigations/NavBar";
import { Link } from "react-router-dom";
import { addSales, saveSales } from "../../Redux/Actions/Sales";
import { connect } from "react-redux";

function NewCashSale(props) {
  console.log(props.sales);

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [type, setType] = useState("cash");

  const changePrice = (item, e) => {
    console.log(item, e.target.value);
    setError("");
    if (parseInt(e.target.value) < item.sellingprice) {
      item.salessellingprice = item.sellingprice;
      setError(item.name + " cant be sold less than " + item.sellingprice);
    } else {
      item.salessellingprice = e.target.value;
    }
    props.dispatch({ type: "CHANGE_PRICE", sales: item });
    // props.addSales(item, props);
  };

  const addQty = (item) => {
    props.dispatch({ type: "CHANGE_QTY", sales: item });
  };

  const changeQty = (item, e) => {
    console.log(item, e.target.value);
    item.quantity = e.target.value;
    props.dispatch({ type: "CHANGE_QTY", sales: item });
  };

  const changeType = (item, e) => {
    console.log(item, e.target.id);
    item.type = e.target.id;
    props.dispatch({ type: "CHANGE_TYPE", sales: item });
    setType(e.target.id);
  };

  const saveSales = () => {
    props.saveSales(props.sales.sales);
  };

  console.log("all items", props.sales);

  return (
    <div>
      {/* <NavBar titleone="New Sale" action="sales" /> */}

      <div className="container">
        <div className="row" style={{ paddingLeft: 10, paddingRight: 10 }}>
          <h5>Enter New Sale</h5>
          <p>2020-08-12 5:56:00 am</p>
          <div className="col s6">
            <Link to="salesproductlist" className="btn col s12">
              Add +
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="#"
              onClick={saveSales}
              disabled={props.sales.sales.length > 0 ? false : true}
              className="btn col s12"
            >
              Save
            </Link>
          </div>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col s3 center">
            Total: <br />
            {props.sales.total}
          </div>
          <div className="col s3 center">
            Items: <br />
            {props.sales.sales.length}
          </div>
          <div className="col s3 center">
            On Credit: <br />
            {props.sales.credit}
          </div>
          <div className="col s3 center">
            On Cash: <br />
            {props.sales.cash}
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12">
            <span className="red-text"> {error}</span>
            {props.sales.sales
              ? props.sales.sales.map((value, index) => (
                  <div
                    className="card sticky-action"
                    style={{ padding: 5 }}
                    key={index}
                  >
                    <h5>{value.name}</h5>
                    <div
                      className="card-action"
                      style={{ padding: 0, margin: 0 }}
                    >
                      <div className="row">
                        <div className="col s12" style={{ marginBottom: 10 }}>
                          <div className="col s6">
                            <div className="center">
                              Total Qty: {value.stock_qty}
                            </div>
                          </div>
                          <div className="col s6">
                            <div className="center">
                              Selling price:
                              {value.salessellingprice
                                ? value.salessellingprice
                                : value.sellingprice}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="row "
                        style={{ display: "flex", lineHeight: "40px" }}
                      >
                        <div className="col s8">
                          <div className="row ">
                            <Link
                              to="#"
                              onClick={() =>
                                props.dispatch({
                                  type: "ADD_QTY",
                                  sales: value,
                                })
                              }
                              className="col s3 item-custom"
                              style={{ margin: 0 }}
                            >
                              +
                            </Link>
                            <input
                              type="text"
                              className="col s4 salesinput"
                              defaultValue={value.quantity}
                              onChange={(e) => {
                                changeQty(value, e);
                              }}
                              placeholder="0"
                            />
                            <Link
                              to="#"
                              className="col s3 item-custom"
                              onClick={() =>
                                props.dispatch({
                                  type: "REMOVE_QTY",
                                  sales: value,
                                })
                              }
                              style={{ margin: 0 }}
                            >
                              -
                            </Link>
                          </div>
                        </div>
                        <div className="col s3">
                          <input
                            type="text"
                            className="salesinput"
                            defaultValue={
                              value.salessellingprice
                                ? value.salessellingprice
                                : value.sellingprice
                            }
                            onChange={(e) => {
                              changePrice(value, e);
                            }}
                            placeholder="0"
                          />
                        </div>
                        <div className="col s1">
                          <i
                            onClick={() =>
                              props.dispatch({
                                type: "REMOVE_ITEM",
                                sales: value,
                              })
                            }
                            className="material-icons right"
                          >
                            cancel
                          </i>
                          {/* <Link
                            onClick={() =>
                              props.dispatch({
                                type: "REMOVE_ITEM",
                                sales: value,
                              })
                            }
                            className="right"
                          >
                            <i className="material-icons right">cancel</i>
                          </Link> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s6">
                        <div className="row">
                          <p>{console.log(value.serialno, value.type)}</p>
                          <div className="col s6">
                            <label>
                              <input
                                className="with-gap"
                                name={value.serialno}
                                value="credit"
                                id="credit"
                                onChange={(e) => changeType(value, e)}
                                type="radio"
                              />
                              <span>Credit</span>
                            </label>
                          </div>
                          <div className="col s6">
                            <label>
                              <input
                                className="with-gap"
                                onChange={(e) => changeType(value, e)}
                                name={value.serialno}
                                defaultChecked
                                value="cash"
                                id="cash"
                                type="radio"
                              />
                              <span>Cash</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col s6">
                        <div className="row">
                          <div className="col s12">
                            <span className="right">{value.total}/=</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  sales: state.sales,
  stocks: state.stock.stocks,
  stockresponse: state.stock,
});
const mapDispacthToProps = (dispatch) => {
  return {
    saveSales: (sales) => dispatch(saveSales(sales)),
  };
};

export default connect(mapStateToProps, mapDispacthToProps)(NewCashSale);
