import React, { useEffect, useState } from "react";
import NewStock from "./NewStock";
import { getSingleStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import NavBar from "../../components/Navigations/NavBar";
import { reactLocalStorage } from "reactjs-localstorage";
import Api from "../../api/api";
import moment from "moment";

function EditStock(props) {
  const id = props.match.params.id;
  const [error, setError] = useState("");
  useEffect(() => {
    getSingleStock(id);
  }, []);

  const getSingleStock = (id) => {
    setLoading(true);
    Api.get(`/stocks.php`, {
      params: {
        id,
        action: "single",
      },
    })
      .then((res) => {
        setStock(res.data);
        setLoading(false);
      })
      .catch((error) => {});
  };

  const [stock, setStock] = useState({});
  const [loading, setLoading] = useState();

  const handleStockData = (e) => {
    setStock({
      ...stock,
      [e.target.id]: e.target.value,
    });
    console.log(stock);
  };

  const addNewStock = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log(stock);

    var send = true;
    Object.keys(stock).map((key) => {
      if (
        stock[key] === "" &&
        key !== "unit_data" &&
        key !== "unit" &&
        key !== "supplier_data" &&
        key !== "supplier"
      ) {
        send = false;
        setError(key.split("_").join(" ") + " cannot be empty");
      }
    });
    if (send) {
      stock.action = "updatestock";
      var dd = new Date().getTime();
      stock.date_time = moment(dd).format("YYYY-MM-DD hh:mm:ss");
      stock.time_ = parseInt((dd / 1000).toFixed(0));
      stock.shopid = reactLocalStorage.getObject("userdata").default_shop;
      stock.stockrelationidid = stock.serialno;

      console.log(stock);

      Api.get(`/stocks.php`, {
        params: stock,
      })
        .then((res) => {
          const stockrespose = res.data;
          console.log("addNewStock", stockrespose);
          // console.log("sdfd", stockrespose);

          setLoading(false);
          // props.history.push("/stocksetup");
          console.log(stockrespose);
        })
        .catch((error) => {});
    }
  };
  console.log(loading);

  return (
    <div className="row">
      <Loader fullPage loading={loading} />
      <form className="col s12 forminput" onSubmit={addNewStock}>
        <p className="red-text">{error}</p>
        <div className="row">
          <div className="input-field col s6">
            <div>Name </div>
            <input
              onChange={handleStockData}
              id="name"
              type="text"
              defaultValue={stock.name}
              placeholder="Name"
              className="validate"
            />
          </div>
          <div className="input-field col s6">
            <div>Quantity </div>
            <input
              onChange={handleStockData}
              id="stock_qty"
              placeholder="Qty"
              inputMode="numeric"
              defaultValue={stock.stock_qty}
              pattern="[0-9]*"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <div>Buying Price </div>
            <input
              onChange={handleStockData}
              defaultValue={stock.buyingprice}
              id="buyingprice"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Buying Price"
              className="validate"
            />
          </div>

          <div className="input-field col s6">
            <div>Selling price </div>
            <input
              onChange={handleStockData}
              type="text"
              id="sellingprice"
              defaultValue={stock.sellingprice}
              inputMode="numeric"
              pattern="[0-9]*"
              className="validate"
              placeholder="Selling Price"
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <div>Re-Order Level </div>
            <input
              onChange={handleStockData}
              id="reorder_level"
              defaultValue={stock.reorder_level}
              type="text"
              className="validate"
              placeholder="Re-Order Level"
            />
          </div>
          {reactLocalStorage.getObject("userdata").user_type === "attendant" ? (
            <div className="input-field col s6">
              <select
                defaultValue={props.item ? props.item.type : ""}
                id="type"
                onChange={handleStockData}
              >
                <option value="" disabled>
                  Choose Type
                </option>
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
              </select>
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          className="btn btn-primary btn-large col s12"
          style={{ marginTop: 10 }}
          type="submit"
          name="action"
        >
          {props.stock ? "Update " : "Save"}
          <i className="material-icons right">send</i>
        </button>
      </form>

      <div id="unitsmodal" className="modal">
        <div className="modal-content unitsmodalcontent">
          <ul className="collection">
            {props.units
              ? props.units.map(({ unit_name, id }) => (
                  <li
                    onClick={() => {
                      setStock({
                        ...stock,
                        unit: id,
                        unit_name,
                      });
                    }}
                    key={id + ""}
                    value={unit_name}
                    className="collection-item modal-close"
                  >
                    {unit_name}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  load: state.stock,
  item: state.stock.item,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getSingleStock: (id) => dispatch(getSingleStock(id)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(EditStock);
