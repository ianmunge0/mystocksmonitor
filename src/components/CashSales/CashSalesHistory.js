import React, { useEffect } from "react";
import { connect } from "react-redux";

function CashSalesHistory(props) {
  var items = props.location.state.items;
  useEffect(() => {
    props.dispatch({
      type: "GET_EXPENSES",
      response: items,
    });
  }, []);
  // render() {
  // console.log(props.location.state);
  const filterStock = (e) => {
    // if (e.target.value.length === " ") return;
    props.dispatch({
      type: "FILTER_SALES",
      payload: {
        items: props.location.state.items,
        text: e.target.value,
      },
    });
  };
  console.log("profitnexpense", props.profitnexpense);
  return (
    <div className="row">
      <div className="nav-wrapper z-depth-3" style={{ padding: 5 }}>
        <form>
          <div className="input-field">
            <input
              placeholder="quick search"
              id="search"
              autoComplete="off"
              onChange={filterStock}
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
      {props.profitnexpense.profitnexpense.length > 0 ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col s3">
                <h6 className="center">Entries</h6>
                <h6 className="center">
                  {props.profitnexpense.profitnexpense.length}
                </h6>
              </div>
              <div className="col s5">
                <h6 className="center">On Credit</h6>
                <h6 className="center">
                  {props.profitnexpense.profitnexpense.length > 0
                    ? props.profitnexpense.profitnexpense.filter((p) =>
                        p.cashorcredit.includes("credit")
                      ).length
                    : "0"}
                </h6>
              </div>
              <div className="col s4 center">
                <h6 className="center">cash Sales</h6>
                <h6 className="center">
                  {props.profitnexpense.profitnexpense.length > 0
                    ? props.profitnexpense.profitnexpense.filter((p) =>
                        p.cashorcredit.includes("cash")
                      ).length
                    : "0"}
                </h6>
              </div>
            </div>
          </div>
          <table className="highlight">
            <thead>
              <tr>
                <th>
                  Name <br /> Qty @ item cost = total
                </th>
                <th className="right">
                  <span className="right">Served By </span>
                  <br />
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {props.profitnexpense.profitnexpense.length > 0
                ? props.profitnexpense.profitnexpense.map((value, index) => (
                    <tr
                      className="modal-trigger "
                      data-target="editmodal"
                      key={index}
                    >
                      <td>
                        Name: {value.name} <br />
                        {value.qtysold} @ {value.onsalesellprice} ={" "}
                        {parseInt(value.qtysold) *
                          parseInt(value.onsalesellprice)}{" "}
                        /=
                      </td>
                      <td className="right">
                        <div>
                          Served by: {value.username}
                          <br />3 days ago
                        </div>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </>
      ) : (
        <h6 className="center" style={{ padding: 20 }}>
          No sales yet
        </h6>
      )}
    </div>
  );
  // }
}
const mapStateToProps = (state) => ({
  profitnexpense: state.profitnexpense,
});
export default connect(mapStateToProps)(CashSalesHistory);
