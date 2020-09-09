import {
  GET_SHOPS,
  ADDED_SHOP,
  GET_SHOP,
  LOADING,
  SET_DEFAULT,
} from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from "react-router-dom";
import React from "react";
export const addShop = (shop, props) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });
    shop.action = "add";
    //check if its an attendant with role ADD_SHOP and change shop admin to attendant admin
    if (reactLocalStorage.get("user_type") === "admin") {
      shop.adminserial_key = reactLocalStorage.getObject("userdata").serialno;
    } else {
      shop.user_type = "attendant";
      shop.adminserial_key = reactLocalStorage.getObject(
        "userdata"
      ).adminserial_key;
    }

    Api.get(`/shops.php`, {
      params: shop,
    })
      .then((res) => {
        const shops = res.data;
        console.log("ADDED SHOP", shops);

        console.log("shop ", shop);
        console.log(
          "default_shop ",
          reactLocalStorage.getObject("userdata").default_shop
        );
        //check if its an attendant with role ADD_SHOP
        if (reactLocalStorage.get("user_type") === "admin") {
          if (
            reactLocalStorage.getObject("userdata").default_shop == null ||
            reactLocalStorage.getObject("userdata").default_shop === ""
          ) {
            var initialdata = reactLocalStorage.getObject("userdata");
            initialdata.default_shop =
              shops.shops[shops.shops.length - 1]["serialno"];
            initialdata.currentshop = shops.shops[shops.shops.length - 1];
            reactLocalStorage.setObject("userdata", initialdata);
            reactLocalStorage.setObject(
              "currentshop",
              shops.shops[shops.shops.length - 1]
            );
          }
          reactLocalStorage.setObject("shops", shops.shops);
        }

        dispatch({
          type: ADDED_SHOP,
          shops,
        });
        props.history.push("/dashboard");
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getShops = (id) => {
  return (dispatch) => {
    console.log("getting shops ");

    // dispatch({
    //   type: LOADING,
    // });

    var admin_id = reactLocalStorage.getObject("userdata").serialno;
    if (reactLocalStorage.getObject("userdata").serialno) {
      if (reactLocalStorage.get("user_type") === "attendant") {
        admin_id = reactLocalStorage.getObject("userdata").adminserial_key;
      }
    } else {
      window.location = "/login/admin";
    }
    Api.get(`/shops.php`, {
      params: {
        id: admin_id,
        action: "all",
      },
    })
      .then((res) => {
        const shops = res.data;

        dispatch({
          type: GET_SHOPS,
          shops,
        });
      })
      .catch((error) => {
        // console.log("error", error);
      });
  };
};

export const deleteShop = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });

    Api.get(`/shops.php`, {
      params: {
        id,
        admin: reactLocalStorage.getObject("userdata").serialno,
        action: "delete",
      },
    })
      .then((res) => {
        const shop = res.data;
        //check if the deleted shop is the same as the currenct shop
        // if (reactLocalStorage.get("user_type") === "admin") {
        if (id === reactLocalStorage.getObject("userdata").default_shop) {
          var initialdata = reactLocalStorage.getObject("userdata");
          var prevShops = reactLocalStorage.getObject("shops");
          if (prevShops.length > 0) {
            initialdata.default_shop = prevShops[0].serialno;
            initialdata.currentshop = prevShops[0];
          } else {
            initialdata.default_shop = "";
            initialdata.currentshop = "";
            reactLocalStorage.setObject("currentshop", "");
          }
          reactLocalStorage.setObject("userdata", initialdata);
          if (reactLocalStorage.getObject("userdata").default_shop == "") {
            reactLocalStorage.setObject("currentshop", prevShops[0]);
          }
        }
        // reactLocalStorage.setObject("shops", shops.shops);
        // }
        // if (id === reactLocalStorage.getObject("userdata").default_shop) {
        // }
        console.log("delete shop actions ", shop);

        dispatch({
          type: GET_SHOP,
          shop,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getShop = (id) => {
  return (dispatch) => {
    // dispatch({
    //   type: LOADING,
    //   loading: true,
    // });
    console.log({
      params: {
        id,
        action: "single",
      },
    });

    Api.get(`/shops.php`, {
      params: {
        id,
        action: "single",
      },
    })
      .then((res) => {
        const shop = res.data;
        console.log("getShop actions ", shop);

        dispatch({
          type: GET_SHOP,
          shop,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const updateShop = (data) => {
  return (dispatch) => {
    data.action = "update";
    console.log(data);

    Api.get(`/shops.php`, {
      params: data,
    })
      .then((res) => {
        const profile = res.data;
        console.log("updateShop actions ", profile);

        dispatch({
          type: ADDED_SHOP,
          profile,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const setDeafultShop = (shopid, props) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });
    Api.get(`/shops.php`, {
      params: {
        shopid,
        owner: reactLocalStorage.getObject("userdata").serialno,
        action: "default",
      },
    })
      .then((res) => {
        const response = res.data;
        console.log("setDeafultShop actions ", response);
        reactLocalStorage.setObject("currentshop", response.currentshop);
        var data = reactLocalStorage.getObject("userdata");
        data.default_shop = response.currentshop.serialno;
        reactLocalStorage.setObject("userdata", data);
        dispatch({
          type: SET_DEFAULT,
          currentshop: response,
        });

        props.handleClose();
        props.history.push("/dashboard");
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
