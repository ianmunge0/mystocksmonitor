import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { getStock, deleteStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navigations/NavBar";

import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function AllStocks(props) {
  useEffect(() => {
    props.getStock();

    // var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(
      document.querySelectorAll(".fixed-action-btn"),
      {}
    );

    M.Modal.init(document.querySelectorAll(".modal"), {
      onOpenEnd: function (el) {},
    });
  }, []);

  const [editid, setEditid] = useState("");

  console.log(props.stocks);

  const deleteProduct = (id) => {
    props.deleteStock(id);
  };

  return (
    <div>
      <NavBar titleone="Stock Setup" />
      <Loader fullPage loading={props.stockresponse.loading} />
      <table className="highlight">
        <thead>
          <tr>
            <th>
              Name <br /> Buying Price
            </th>
            <th className="right">
              <span className="right">Qty</span>
              <br />
              Selling Price
            </th>
          </tr>
        </thead>

        <tbody>
          <Link to="/stockcount" className="btn" style={{ marginTop: 10 }}>
            Products Count
          </Link>
          {props.stocks.length > 0 ? (
            props.stocks.map((item, key) => (
              <tr
                key={key}
                className="modal-trigger "
                onClick={() => setEditid(item.stockserial_key)}
                data-target="editmodal"
              >
                <td>
                  {item.name} <br />
                  {item.buyingprice} /=
                </td>
                <td className="right">
                  <div className="left">
                    {item.stock_qty} {item.unit_name}
                    <br />
                    {item.sellingprice}/=
                  </div>
                  <a href="!#" className="secondary-content ">
                    <i className="material-icons valign">more_vert</i>
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <h5>No stock added yet</h5>
          )}
        </tbody>
      </table>
      <div className="fixed-action-btn">
        <Link to="newstock" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>

      <div id="editmodal" className="modal bottom-sheet">
        <div className="modal-content sidenav bottom-modal">
          <ul>
            <li>
              <a href="#!">
                <i className="material-icons">format_list_bulleted</i>
                Product History
              </a>
            </li>
            <li>
              <Link to={`/editstock/${editid}`}>
                <i className="material-icons">edit</i>Edit
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => deleteProduct(editid)}
                className="modal-trigger "
                data-target="deletealert"
              >
                <i className="material-icons">delete</i>Delete
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
  stockresponse: state.stock,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getStock: () => dispatch(getStock()),
    deleteStock: (id) => dispatch(deleteStock(id)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(AllStocks);
