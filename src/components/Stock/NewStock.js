import React, { Component } from "react";

export default class NewProduct extends Component {
  render() {
    return (
      <div>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="stock_name" type="text" className="validate" />
              <label htmlFor="stock_name">Stock Name e.g hammer</label>
            </div>
            <div className="input-field col s6">
              <input id="stock_qty" type="text" className="validate" />
              <label htmlFor="stock_qty">Qty Available</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="buying_price" type="text" className="validate" />
              <label htmlFor="buying_price">Buying Price e.g 100</label>
            </div>

            <div className="input-field col s6">
              <input type="text" id="selling_price" className="validate" />
              <label htmlFor="selling_price">
                Selling Price e.g 100,200,400
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input
                    type="text"
                    id="autocomplete-input"
                    className="autocomplete"
                  />
                  <label htmlFor="autocomplete-input">
                    Supplier e.g toyota
                  </label>
                </div>

                <div className="input-field col s6">
                  <input id="reorder_level" type="text" className="validate" />
                  <label htmlFor="reorder_level">Re Order Level e.g 5</label>
                </div>
                <div className="input-field col s6">
                  <input id="unit" type="text" className="validate unit" />
                  <label htmlFor="unit">Unit e.g kg</label>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn  waves-effect waves-light"
            type="submit"
            name="action"
          >
            Save
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}
