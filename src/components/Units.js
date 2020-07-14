import React, { useEffect } from "react";
import { getUnits } from "../../src/Redux/Actions/Stock";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";

function Units(props) {
  useEffect(() => {
    props.getUnits();
    M.FormSelect.init(document.querySelectorAll("select"), {});
    M.Modal.init(document.querySelectorAll(".modal"), {});
  }, []);

  const options = [
    { value: "flavor", label: "flavor" },
    { value: "yummy", label: "yummy" },
    { value: "red", label: "red" },
    { value: "green", label: "green" },
    { value: "yellow", label: "yellow" },
  ];

  console.log(props.units);

  return (
    <div>
      <ul class="collection">
        <li class="collection-header">
          <h5 style={{ padding: 5 }}>Select One Unit</h5>
        </li>

        {props.units
          ? props.units.map(({ name, id }) => (
              <li key={id + ""} value={name} className="collection-item">
                {name}
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  units: state.stock.units,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getUnits: () => dispatch(getUnits()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Units);
