import React, { useEffect, useState } from "react";
import { getShops, addShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function NewShop(props) {
  useEffect(() => {
    props.getShops();
  }, []);

  const [shop, setShop] = useState({
    shop_name: "",
  });
  const [error, setError] = useState("");

  const addShop = (e) => {
    e.preventDefault();
    setError("");
    // console.log(shop, props);
    if (shop.shop_name !== "") {
      props.addShop(shop, props);
    } else {
      setError("shop name must be set");
    }
  };

  const handleShopData = (e) => {
    setShop({
      ...shop,
      [e.target.id]: e.target.value,
    });
    console.log(shop);
  };

  return (
    <div>
      <div className="container">
        <Loader fullPage loading={props.shops.loading} />
        <div className="row">
          <span className="red-text">{error}</span>
          <form className="col s12" onSubmit={addShop}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  onChange={handleShopData}
                  id="shop_name"
                  type="text"
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
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shops: state.shops,
  error: state.shops,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getShops: (shopid) => dispatch(getShops(shopid)),
    addShop: (shop, props) => dispatch(addShop(shop, props)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(NewShop);
