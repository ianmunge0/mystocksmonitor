import React, { Component } from "react";

export default class CashSalesHistory extends Component {

  state = {
    
  }

  componentDidMount(){
    console.log("cashsalesprops",this.props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="nav-wrapper z-depth-3" style={{ padding: 5 }}>
            <form>
              <div className="input-field">
                <input
                  placeholder="quick search"
                  id="search"
                  type="search"
                  required
                />
                <label className="label-icon" for="search">
                  <i className="material-icons">search</i>
                </label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>

          <div className="container">
            <div className="row">
              <div className="col s3">
                <h6>Entries</h6>
                <h6>3</h6>
              </div>
              <div className="col s5">
                <h6>On Credit</h6>
                <h6>3</h6>
              </div>
              <div className="col s4 center">
                <h6>cash Sales</h6>
                <h6>3</h6>
              </div>
            </div>
          </div>
          <table className="highlight">
            <thead>
              {/* <tr>
                <th>
                  Name <br /> Qty @ item cost = total
                </th>
                <th className="right">
                  <span className="right">Served By: </span>
                  <br />
                  Selling Price
                </th>
              </tr> */}
            </thead>

            <tbody>
              <tr className="modal-trigger " data-target="editmodal">
                <td>
                  Name: Hammer <br />3 @ 200 = 600/=
                </td>
                <td className="right">
                  <div>
                    Served by: freddy
                    <br />3 days ago
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
