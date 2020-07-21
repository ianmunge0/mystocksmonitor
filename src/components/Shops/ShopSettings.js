import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navigations/NavBar";
import M from "materialize-css/dist/js/materialize.min.js";
import { getShop, updateShop, deleteShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

function ShopSettings(props) {
  useEffect(() => {
    M.Tabs.init(document.querySelector(".tabs"), {
      swipeable: true,
    });

    document.addEventListener("DOMContentLoaded", function () {
      M.FormSelect.init(document.querySelectorAll("select"), {});
    });
    console.log(props.match.params.id);

    props.getShop(props.match.params.id);
  }, []);

  const [error, setError] = useState("");

  const updateShop = (e) => {
    e.preventDefault();
    setError("");
    console.log(shop);

    if (shop["password"] === "" && shop["shopname"] === "") {
      setError("you have not changed anything");
    } else {
      shop.id = props.shop.shop.serialno;
      props.updateShop(shop);
    }
  };

  const deleteShop = () => {
    props.deleteShop(props.shop.shop.shopid);

    props.history.push("/shops");
  };

  const [shop, setShop] = useState({
    shopname: "",
    password: "",
  });
  const handleShopData = (e) => {
    setShop({
      ...shop,
      [e.target.id]: e.target.value,
    });
    console.log(shop);
  };
  console.log("settings", props);

  return (
    <div>
      <div className="row">
        <NavBar titleone="Shop settings" />
        <Loader fullPage loading={props.shop.loading} />
        <div className="col s12 m12">
          <form className="col s12" onSubmit={updateShop}>
            <div className="row">
              <div className="col s12">
                <p className="red-text">{error}</p>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="shopname"
                  type="text"
                  placeholder="shopname"
                  onChange={handleShopData}
                  defaultValue={props.shop.shop ? props.shop.shop.shopname : ""}
                  className="validate"
                />
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="region"
                  type="text"
                  placeholder="region"
                  onChange={handleShopData}
                  defaultValue={props.shop.shop ? props.shop.shop.region : ""}
                  className="validate"
                />
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="shoptype"
                  type="text"
                  placeholder="shoptype"
                  onChange={handleShopData}
                  defaultValue={props.shop.shop ? props.shop.shop.shoptype : ""}
                  className="validate"
                />
              </div>
              <div className="input-field col s12">
                <h5>Settings</h5>

                <div className="switch">
                  <label>
                    <div className="row valign-wrapper">
                      <div className="col s8">
                        <h6>Send Backup</h6>
                      </div>
                      <div className="col s4">
                        <input
                          type="checkbox"
                          defaultChecked={
                            props.shop.shop
                              ? props.shop.shop.backup === "1"
                                ? true
                                : false
                              : false
                          }
                        />
                        <span className="lever"></span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="input-field col s12">
                <input
                  id="shoptype"
                  type="text"
                  placeholder="shoptype"
                  onChange={handleShopData}
                  defaultValue={
                    props.shop.shop ? props.shop.shop.emailaddress : ""
                  }
                  className="validate"
                />
                <label>Backup email</label>
              </div>
            </div>

            <Link
              to="#"
              onClick={() => {
                deleteShop();
              }}
              className="collection-item"
            >
              <h5 className="red-text">Delete Shop</h5>
            </Link>
            <div className="row">
              <div className="input-field col s12 center">
                <button className="btn btn-primary">
                  <i className="material-icons left ">save</i>Update
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
  shop: state.shops,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getShop: (id) => dispatch(getShop(id)),
    updateShop: (data) => dispatch(updateShop(data)),
    deleteShop: (shopid) => dispatch(deleteShop(shopid)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(ShopSettings);
