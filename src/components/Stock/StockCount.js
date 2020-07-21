import React, { useEffect, useState } from "react";
import { getStock, saveStockCount } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import NavBar from "../../components/Navigations/NavBar";

function StockCount(props) {
  useEffect(() => {
    props.getStock(34);
  }, []);
  //   console.log(props.stocks.quantity);

  const [count, setCount] = useState([]);

  const handleCount = (v, e) => {
    console.log(e.target.id);

    setCount({
      ...count,
      [e.target.id]: e.target.value,
    });
  };

  const saveCount = (e, item, count) => {
    e.preventDefault();
    var countt = count[item.stockserial_key];
    props.saveStockCount(countt, item);
  };

  return (
    <div>
      <NavBar titleone="Stock Count" />
      <Loader fullPage loading={props.updateresponse.stock.loading} />
      <ul className="collection">
        <div className="collection-item">
          <Link
            to="/counthistory"
            className="btn btn-primary"
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            <i className="material-icons left">remove_red_eye</i>View Count
            History
          </Link>
        </div>
        {props.stocks.length > 0
          ? props.stocks.map((item, key) => (
              <li className="collection-item" key={key}>
                <form onSubmit={(e) => saveCount(e, item, count)}>
                  <div className="row  valign-wrapper">
                    <div className="col s4">
                      <div className="col s12">
                        <p style={{ fontSize: 16 }}>{item.name}</p>
                        <p style={{ fontSize: 12 }}>
                          System Count ({item.stock_qty} )
                        </p>
                      </div>
                    </div>
                    <div className="col s12">
                      <input
                        type="text"
                        className="editinput center"
                        onChange={(e) => handleCount(item.stockserial_key, e)}
                        defaultValue={item.stock_qty}
                        id={item.stockserial_key}
                      />
                    </div>
                    <div className="col s3">
                      <button type="submit" className="btn btn-small">
                        Ok
                      </button>
                    </div>
                  </div>
                </form>
              </li>
            ))
          : ""}
      </ul>
      {props.stocks.length == 0 ? <h5>No counts at the moment</h5> : " "}
    </div>
  );
}

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
  updateresponse: state,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getStock: (shopid) => dispatch(getStock(shopid)),
    saveStockCount: (count, item) => dispatch(saveStockCount(count, item)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(StockCount);
