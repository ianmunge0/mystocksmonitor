import React, { useEffect, useState } from "react";
import { addShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";

function ShopForm(props) {
  const [error, setError] = useState();
  const [shopinput, setShopInput] = useState({
    shop_name: "",
  });

  const addShop = (e) => {
    e.preventDefault();
    console.log(shopinput);
    setError("");
    if (shopinput.shop_name === "") {
      setError("shop name is required");
    } else {
      props.addShop(shopinput);
      e.target.reset();
    }
  };

  const handleShopData = (e) => {
    console.log("", e.target.id);
    setShopInput({
      ...shopinput,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form className="col s12" onSubmit={addShop} noValidate autoComplete="off">
      <div className="row">
        {error}
        <div className="input-field col s12">
          <i className="material-icons prefix">account_circle</i>
          <input
            onChange={handleShopData}
            id="shop_name"
            type="text"
            defaultValue={shopinput.shop_name}
            className="validate"
          />
          <label htmlFor="shop_name">Name</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">account_circle</i>
          <input
            onChange={handleShopData}
            id="shop_type"
            type="text"
            className="validate"
          />
          <label htmlFor="shop_type">Type</label>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">account_circle</i>
          <input
            onChange={handleShopData}
            id="shop_location"
            type="text"
            className="validate"
          />
          <label htmlFor="shop_location">Location</label>
        </div>
      </div>

      <div className="row">
        <p className="red-text" style={{ marginLeft: 20 }}>
          {props.shops.addingerror}
        </p>
        <div className="input-field col s12 center">
          <button className="btn btn-primary">
            <i className="material-icons left ">save</i>Save
          </button>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  shops: state.shops,
  error: state.shops,
});

const mapDispacthToProps = (dispatch) => {
  return {
    addShop: (shop) => dispatch(addShop(shop)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(ShopForm);
