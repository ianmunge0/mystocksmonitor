import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { getShops, addShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navigations/NavBar";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function Shops(props) {
  useEffect(() => {
    M.Tabs.init(document.querySelector(".tabs"), {
      swipeable: true,
    });
    M.FormSelect.init(document.querySelectorAll("select"), {});
    props.getShops();
  }, []);

  const [error, setError] = useState();
  var errortxt = "";
  const [shop, setShop] = useState({
    shop_name: "",
  });

  const addShop = (e) => {
    e.preventDefault();
    console.log(shop);

    props.addShop(shop);
  };

  const handleShopRoles = (e, role) => {
    var isChecked = e.target.checked;
    var item = e.target.value;
  };

  const handleShopData = (e) => {
    setShop({
      ...shop,
      [e.target.id]: e.target.value,
    });
    console.log(shop);
  };

  console.log("error", props);

  return (
    <div className="row">
      <NavBar titleone="Shops" />
      <Loader fullPage loading={props.shops.loading} />
      <ul id="tabs-swipe-demo" className="tabs">
        <li className="tab col s4">
          <a className="active" href="#test-swipe-1">
            <span>All Shops</span>
          </a>
        </li>
        <li className="tab col s4">
          <a href="#test-swipe-2">New Shop</a>
        </li>
      </ul>

      <div id="test-swipe-1" className="col s12">
        <div className="container">
          <div className="row">
            {props.shops.shops.length == 0 ? (
              <p className="center">You have not added any shop yet</p>
            ) : (
              ""
            )}
            <ul className="collection">
              {props.shops.shops.length > 0
                ? props.shops.shops.map((value, index) => (
                    <Link
                      to={`/shopsettings/${value.serialno}`}
                      className="collection-item avatar"
                      key={index}
                    >
                      <div className="col s10">
                        <i className="material-icons circle">folder</i>
                        <span className="title">{value.shopname}</span>
                        <br />
                        <span>
                          Type: {value.shoptype}, Location: {value.region}
                        </span>
                      </div>
                      <div className="col s2">
                        <i className="material-icons right ">more_vert</i>
                      </div>
                    </Link>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
      <div id="test-swipe-2" className="col s12">
        <div className="container">
          <div className="row">
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
    addShop: (shop) => dispatch(addShop(shop)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Shops);
