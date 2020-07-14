import React, { useEffect } from "react";
import NewStock from "./NewStock";
import { getSingleStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";

function EditStock(props) {
  const id = props.match.params.id;
  useEffect(() => {
    props.getSingleStock(id);
  }, []);
  return <NewStock stock={props.stock} />;
}

const mapStateToProps = (state) => ({
  stock: state.stock.stock,
  stockresponse: state.stock,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getSingleStock: (id) => dispatch(getSingleStock(id)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(EditStock);
