import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navigations/NavBar";
import M from "materialize-css/dist/js/materialize.min.js";
import { getShop, updateShop, deleteShop } from "../../Redux/Actions/Shops";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { Redirect } from "react-router-dom";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";

function ShopSettings(props) {
  useEffect(() => {
    M.Tabs.init(document.querySelector(".tabs"), {
      swipeable: true,
    });

    document.addEventListener("DOMContentLoaded", function () {
      M.FormSelect.init(document.querySelectorAll("select"), {});
    });
    console.log(props.match.params.id);

    getShop(props.match.params.id);
  }, []);

  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState({});

  const getShop = (id) => {
    console.log({
      id,
      action: "single",
    });
    setLoading(true);
    Api.get(`/shops.php`, {
      params: {
        id,
        action: "single",
      },
    })
      .then((res) => {
        const shop = res.data;
        setLoading(false);
        setShop(shop);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };

  const [error, setError] = useState("");

  const updateShop = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(shop);
    shop.action = "update";
    Api.get(`/shops.php`, {
      params: shop,
    })
      .then((res) => {
        const profile = res.data;
        setLoading(false);
        console.log("updateShop actions ", profile);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });

    // setError("");
    console.log(shop);

    // if (shop["password"] === "" && shop["shopname"] === "") {
    //   setError("you have not changed anything");
    // } else {
    //   shop.id = props.shop.shop.serialno;
    //   props.updateShop(shop);
    // }
  };

  const deleteShop = (id) => {
    var para = {
      id,
      admin: reactLocalStorage.getObject("userdata").serialno,
      action: "delete",
    };
    console.log("para", para);
    Api.get(`/shops.php`, {
      params: para,
    })
      .then((res) => {
        const shop = res.data;
        console.log("shops deleted", shop);

        //redirect to initialshopspage if all shops has been deleted
        //or to remain in shops page if there are still more shops in this account
        if (shop.length == 0) {
          reactLocalStorage.setObject("shops", "");
          var initialdata = reactLocalStorage.getObject("userdata");
          initialdata.default_shop = "";
          initialdata.currentshop = "";
          reactLocalStorage.setObject("userdata", initialdata);
          props.history.push("/initialshopspage");
        } else {
          //remove this shop from admin default in the localstorage if its has been deleted
          if (
            id === reactLocalStorage.getObject("userdata").default_shop ||
            reactLocalStorage.getObject("userdata").default_shop == ""
          ) {
            var initialdata = reactLocalStorage.getObject("userdata");
            initialdata.default_shop = shop[0]["serialno"];
            initialdata.currentshop = shop[0];
            reactLocalStorage.setObject("userdata", initialdata);
          }
          reactLocalStorage.setObject("shops", shop);
          props.history.push("/shops");
        }
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };

  // const [shop, setShop] = useState({
  //   shopname: "",
  //   password: "",
  // });
  const handleShopData = (e) => {
    setShop({
      ...shop,
      [e.target.id]: e.target.value,
    });
    console.log(shop);
  };
  console.log("settings", shop);

  return (
    <div>
      <div className="row">
        <Loader fullPage loading={loading} />
        <div className="col s12 m12">
          <form className="col s12" onSubmit={updateShop}>
            <div className="row">
              <div className="col s12">
                <p className="red-text">{error}</p>
              </div>
              <div className="input-field col s12">
                <p>Shop name</p>
                <input
                  id="shopname"
                  type="text"
                  placeholder="shopname"
                  onChange={handleShopData}
                  defaultValue={shop.shopname}
                  className="validate"
                />
              </div>
              <div className="input-field col s12">
                <p>Location</p>
                <input
                  id="region"
                  type="text"
                  placeholder="region"
                  onChange={handleShopData}
                  defaultValue={shop.region}
                  className="validate"
                />
              </div>

              <div className="input-field col s12">
                <p>Type</p>
                <input
                  id="shoptype"
                  type="text"
                  placeholder="shoptype"
                  onChange={handleShopData}
                  defaultValue={shop.shoptype}
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
                            shop ? (shop.backup === "1" ? true : false) : false
                          }
                        />
                        <span className="lever"></span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="input-field col s12">
                <div>Backup email</div>
                <input
                  id="shoptype"
                  type="text"
                  placeholder="shoptype"
                  onChange={handleShopData}
                  defaultValue={shop.emailaddress}
                  className="validate"
                />
              </div>
            </div>

            <Link
              to="#"
              onClick={() => {
                deleteShop(props.match.params.id);
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

export default ShopSettings;

// const mapStateToProps = (state) => ({
//   shop: state.shops,
// });

// const mapDispacthToProps = (dispatch) => {
//   return {
//     getShop: (id) => dispatch(getShop(id)),
//     updateShop: (data) => dispatch(updateShop(data)),
//     deleteShop: (shopid) => dispatch(deleteShop(shopid)),
//   };
// };
// export default connect(mapStateToProps, mapDispacthToProps)(ShopSettings);
