import React, { useEffect, useState } from "react";
import { addSales } from "../../Redux/Actions/Sales";
import { getStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

function SalesProductList(props) {
  useEffect(() => {
    M.FloatingActionButton.init(
      document.querySelectorAll(".fixed-action-btn"),
      {}
    );

    props.getStock();
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems, {});
  }, []);

  const [sales, setSales] = useState([]);

  const onText = (item, e) => {
    props.addSales(item, props);
    // props.dispatch({ type: "CHANGE_TYPE", sales: item });
    // setType(e.target.id);
  };
  console.log(props.sales);

  return (
    <div>
      {/* <NavBar titleone="Select product to sell" /> */}
      <div className="nav-wrapper z-depth-3" style={{ padding: 5 }}>
        {/* <Loader fullPage loading={props.loading} /> */}
        <form>
          <div className="input-field">
            <input
              placeholder="quick search"
              id="search"
              onChange={onText}
              type="search"
              required
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>

      <div className="fixed-action-btn">
        <Link
          to={{
            pathname: "/newsale",
            query: sales,
          }}
          className="btn-floating btn-large red"
        >
          <i className="large material-icons">send</i>
        </Link>
      </div>

      <div className="row" style={{ overflow: "scroll" }}>
        {props.stocks.length > 0 ? (
          props.stocks.map((item, key) => (
            <div className="col s12" style={{ paddingTop: 30 }} key={key}>
              <label className="col s12">
                <input
                  type="checkbox"
                  disabled={item.stock_qty > 0 ? false : true}
                  id={item.stockserial_key}
                  onChange={(e) => onText(item, e)}
                />
                <span>
                  {item.name} Qty: {item.stock_qty}
                </span>
                <br />
                {item.stock_qty > 0 ? (
                  ""
                ) : (
                  <span className="red-text">Out of stock</span>
                )}
              </label>
            </div>
          ))
        ) : (
          <h5>No stock added yet</h5>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sales: state,
  stocks: state.stock.stocks,
  stockresponse: state.stock,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addSales: (item, props) => dispatch(addSales(item, props)),
    getStock: () => dispatch(getStock()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(SalesProductList);
