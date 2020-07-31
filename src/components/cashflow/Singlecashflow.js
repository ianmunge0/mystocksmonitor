import React, { useEffect, useState } from "react";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import NavBar from "../../components/Navigations/NavBar";

import M from "materialize-css/dist/js/materialize.min.js";
function Singlecashflow() {
  useEffect(() => {
    M.Modal.init(document.querySelectorAll(".modal"), {});
  }, []);
  const [inputs, setInputs] = useState({
    email: "",
    country: "",
    password: "",
    phone: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    Api.get(`/cashin.php`, {
      params: {},
    })
      .then((res) => {})
      .catch((error) => {});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  return (
    <>
      <NavBar titleone="Cash In" />
      <div className="row  z-depth-3" style={{ paddingBottom: 20 }}>
        <div className="col s12 center">
          <h5>
            Cash in hand <br /> 0/=
          </h5>
        </div>
        <div className="col s12">
          <div className="col s6">
            <a
              className="waves-effect waves-light btn btn-primary left modal-trigger"
              href="#modal1"
            >
              <i className="material-icons left ">add</i>cash In
            </a>

            {/* <button className="btn btn-primary left">
                <i className="material-icons left ">add</i>cash In
              </button> */}
          </div>
          <div className="col s6">
            <button className="btn btn-warning orange right">
              <i className="material-icons left">remove</i>cash Out
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <a href="!#">
            <i className="material-icons left">fast_rewind</i> june 2020
          </a>
        </div>
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>In</th>
                <th>Out</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Previous balance</td>
                <td>0</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Sales</td>
                <td>0</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Purchases</td>
                <td>-</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>-</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <p className="left col s6" style={{ fontWeight: "bold" }}>
          Total cash In 00.00
        </p>
        <p className="right col s6" style={{ fontWeight: "bold" }}>
          Total cash Out 00.00
        </p>
      </div>

      <div className="row">
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Add Cash in</h4>
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    placeholder="Name"
                    id="cashin_name"
                    onChange={handleChange}
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="cashin_name">Name</label>
                </div>
                <div className="input-field col s12">
                  <input
                    placeholder="Amount"
                    id="cashin_amount"
                    onChange={handleChange}
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="cashin_amount">Amount</label>
                </div>
                <div className="input-field col s12">
                  <input
                    placeholder="Amount"
                    id="cashin_date"
                    onChange={handleChange}
                    type="date"
                    className="validate"
                  />
                  <label htmlFor="cashin_date">Date</label>
                </div>
                <div className="input-field col s12">
                  <div className="input-field col s12">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Singlecashflow;
