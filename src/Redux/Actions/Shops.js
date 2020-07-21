import { GET_SHOPS, ADDED_SHOP, GET_SHOP, LOADING } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from "react-router-dom";
import React from "react";
export const addShop = (shop) => {
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

        dispatch({
          type: ADDED_SHOP,
          shops,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getShops = (id) => {
  return (dispatch) => {
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
    dispatch({
      type: LOADING,
      loading: true,
    });
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
