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
    console.log("Adding", shop);

    shop.adminserial_key = reactLocalStorage.getObject("userdata").serialno;
    Api.get(`/shops.php`, {
      params: shop,
    })
      .then((res) => {
        const shops = res.data;
        console.log("ADDED SHOP", shops);

        if (
          shop.id === reactLocalStorage.getObject("userdata").default_shop ||
          reactLocalStorage.getObject("userdata").default_shop == ""
        ) {
          var initialdata = reactLocalStorage.getObject("userdata");
          initialdata.default_shop =
            shops.shops[shops.shops.length - 1]["serialno"];
          initialdata.currentshop = shops.shops[shops.shops.length - 1];
          reactLocalStorage.setObject("userdata", initialdata);
        }
        reactLocalStorage.setObject("shops", shops.shops);
        dispatch({
          type: ADDED_SHOP,
          shops,
        });
        window.location = "/dashboard";
        // props.history.push("/dashboard");
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

    console.log({
      id: reactLocalStorage.getObject("userdata").serialno,
      action: "all",
    });

    dispatch({
      type: LOADING,
      loading: true,
    });

    if (reactLocalStorage.getObject("userdata").serialno) {
      Api.get(`/shops.php`, {
        params: {
          id: reactLocalStorage.getObject("userdata").serialno,
          action: "all",
        },
      })
        .then((res) => {
          const shops = res.data;
          console.log("getShops", shops);

          dispatch({
            type: GET_SHOPS,
            shops,
          });
        })
        .catch((error) => {
          // your error handling goes here}
          console.log("error", error);
        });
    } else {
      window.location = "/login/admin";
    }
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
        var data = reactLocalStorage.getObject("userdata");
        data.currentshop = response.currentshop;
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
