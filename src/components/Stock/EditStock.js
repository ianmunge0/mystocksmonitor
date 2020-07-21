import React, { useEffect } from "react";
import NewStock from "./NewStock";
import { getSingleStock } from "../../Redux/Actions/Stock";
import { connect } from "react-redux";

function EditStock(props) {
  const id = props.match.params.id;
  useEffect(() => {
    props.getSingleStock(id);
  }, []);
  console.log(props.item);

  return <NewStock stock={props.item} />;
}

const mapStateToProps = (state) => ({
  stock: state.stock.stock,
  item: state.stock.item,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getSingleStock: (id) => dispatch(getSingleStock(id)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(EditStock);
