import React, { useState, useEffect } from "react";
import {
  addStock,
  saveUnit,
  getUnits,
  saveSupplier,
  getSuppliers,
} from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link, withRouter } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function NewProduct(props) {
  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll("select"), {});

    M.Modal.init(document.querySelectorAll(".modal"), {});
    props.getUnits();
    props.getSuppliers();

    setStock(props.stock);
    console.log("all ", props.stock);
  }, [props.stock]);

  const [error, setError] = useState("");
  const [modalerror, setModalerror] = useState("");

  const [stock, setStock] = useState({
    name: "",
    stock_qty: "",
    buying_price: "",
    selling_price: "",
    type: "",
    unit_name: "",
  });

  const [unit, setUnit] = useState({
    unit_name: "",
  });
  const [supplier, setSupplier] = useState({
    supplier_name: "",
  });

  const handleUnitData = (e) => {
    setUnit({
      ...unit,
      [e.target.id]: e.target.value,
    });
  };
  const handleSupplierData = (e) => {
    setSupplier({
      ...supplier,
      [e.target.id]: e.target.value,
    });
  };

  const handleStockData = (e) => {
    setStock({
      ...stock,
      [e.target.id]: e.target.value,
    });
  };

  const addNewStock = (e) => {
    e.preventDefault();

    setError("");
    Object.keys(stock).map((key) => {
      if (stock[key] === "") {
        setError(key.split("_").join(" ") + " cannot be empty");
        return;
      }
    });
    props.addStock(stock);
  };

  const addUnit = (e) => {
    e.preventDefault();
    setModalerror("");
    if (unit.unit_name !== "") {
      props.saveUnit(unit);
    } else {
      setModalerror("Enter unit to add");
    }
  };

  const addSupplier = (e) => {
    e.preventDefault();
    // console.log(supplier);
    setModalerror("");
    if (supplier.supplier_name !== "") {
      props.saveSupplier(supplier.supplier_name);
    } else {
      setModalerror("Enter supplier name");
    }
  };

  return (
    <div>
      <Loader fullPage loading={props.stockresponse.loading} />
      <form className="col s12 forminput" onSubmit={addNewStock}>
        <input
          onChange={handleStockData}
          id="action"
          type="hidden"
          defaultValue={props.stock ? "update" : "save"}
          className="validate"
        />

        <p className="red-text">{error}</p>
        <div className="row">
          <div className="input-field col s6">
            <input
              onChange={handleStockData}
              id="name"
              type="text"
              defaultValue={props.stock ? props.stock.name : ""}
              placeholder="Name"
              className="validate"
            />
          </div>
          <div className="input-field col s6">
            <input
              onChange={handleStockData}
              id="stock_qty"
              placeholder="Qty"
              inputMode="numeric"
              defaultValue={props.stock ? props.stock.quantity : ""}
              pattern="[0-9]*"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              onChange={handleStockData}
              defaultValue={props.stock ? props.stock.buyingprice : ""}
              id="buying_price"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Buying Price"
              className="validate"
            />
          </div>

          <div className="input-field col s6">
            <input
              onChange={handleStockData}
              type="text"
              id="selling_price"
              defaultValue={props.stock ? props.stock.sellingprice : ""}
              inputMode="numeric"
              pattern="[0-9]*"
              className="validate"
              placeholder="Selling Price"
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <input
              onChange={handleStockData}
              id="reorder_level"
              defaultValue={props.stock ? props.stock.re_order : ""}
              type="text"
              className="validate"
              placeholder="Re-Order Level"
            />
          </div>
          <div className="input-field col s6">
            <select
              defaultValue={props.stock ? props.stock.type : ""}
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
        </div>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <p style={{ margin: 0 }}>
                  {props.stock ? "unit: " + props.stock.unit_name : ""}
                </p>
              </div>
              <div className="input-field col s6">
                <a
                  style={{ fontSize: 10 }}
                  href="#unitsmodal"
                  className="btn modal-trigger"
                >
                  {props.stock ? "Change" : "Select unit"}
                </a>
              </div>
              <div className="input-field col s6 ">
                <a href="#modal1" className="modal-trigger">
                  Add New
                  <i className="material-icons left">add</i>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <p style={{ margin: 0 }}>
                  {props.stock ? "Supplier: " + props.stock.supplier_name : ""}
                </p>
              </div>
              <div className="input-field col s6">
                <a
                  style={{ fontSize: 10 }}
                  href="#suppliersmodal"
                  className="btn modal-trigger"
                >
                  {props.stock ? "Change" : "Select Supplier"}
                </a>
              </div>
              <div className="input-field col s6 ">
                <a href="#newsuppliermodal" className="modal-trigger">
                  Add New
                  <i className="material-icons left">add</i>
                </a>
              </div>
            </div>
          </div>
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

      <div id="newsuppliermodal" className="modal">
        <div className="modal-content">
          <h6>Add Supplier</h6>
          <form className="col s12 forminput" onSubmit={addSupplier}>
            <p className="red-text">{modalerror}</p>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={handleSupplierData}
                  id="supplier_name"
                  type="text"
                  placeholder="Name"
                  className="validate"
                />
              </div>
            </div>

            <button
              className={
                modalerror === ""
                  ? "btn  btn-primary btn-large col s12"
                  : "btn modal-close btn-primary btn-large col s12"
              }
              style={{ marginTop: 10 }}
              type="submit"
              name="action"
            >
              Save
              <i className="material-icons right">send</i>
            </button>
            <br />
            <br />
            <br />
            <br />
            <a className="col s12 modal-close">Close</a>
          </form>
        </div>
      </div>

      <div id="modal1" className="modal">
        <div className="modal-content">
          <h6>Add Unit</h6>
          <form className="col s12 forminput" onSubmit={addUnit}>
            <p className="red-text">{modalerror}</p>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={handleUnitData}
                  id="unit_name"
                  type="text"
                  placeholder="Name"
                  className="validate"
                />
              </div>
            </div>

            <button
              className={
                modalerror === ""
                  ? "btn  btn-primary btn-large col s12"
                  : "btn modal-close btn-primary btn-large col s12"
              }
              style={{ marginTop: 10 }}
              type="submit"
              name="action"
            >
              Save
              <i className="material-icons right">send</i>
            </button>
            <br />
            <br />
            <br />
            <br />
            <a className="col s12 modal-close">Close</a>
          </form>
        </div>
      </div>

      <div id="suppliersmodal" className="modal">
        <div className="modal-content unitsmodalcontent">
          <ul className="collection">
            {props.suppliers
              ? props.suppliers.map(({ supplier_name, id }) => (
                  <li
                    onClick={() => {
                      setStock({
                        ...stock,
                        supplier: id,
                        supplier_name,
                      });
                    }}
                    key={id + ""}
                    value={supplier_name}
                    className="collection-item modal-close"
                  >
                    {supplier_name}
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
  stockresponse: state.stock,
  waiting: state.loading,
  units: state.stock.units,
  suppliers: state.stock.suppliers,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addStock: (stock) => dispatch(addStock(stock)),
    saveUnit: (unit) => dispatch(saveUnit(unit)),
    getUnits: () => dispatch(getUnits()),
    saveSupplier: (supplier) => dispatch(saveSupplier(supplier)),
    getSuppliers: () => dispatch(getSuppliers()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(NewProduct);
