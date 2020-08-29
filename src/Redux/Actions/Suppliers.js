import { ADD_SUPPLIER, GET_SUPPLIERS, LOADING } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
export const getSuppliers = () => {
  console.log("getSuppliers");

  return (dispatch) => {
    Api.get(`/supplier.php`, {
      params: {
        action: "get",
        owner: reactLocalStorage.getObject("userdata").default_shop,
      },
    })
      .then((res) => {
        console.log("database", res.data);
        dispatch({
          type: GET_SUPPLIERS,
          suppliers: res.data.suppliers,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const deleteSupplier = (supplier) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    console.log({
      id: supplier.id,
      action: "delete",
      owner: reactLocalStorage.getObject("userdata").serialno,
    });

    Api.get(`/supplier.php`, {
      params: {
        id: supplier.id,
        action: "delete",
        owner: reactLocalStorage.getObject("userdata").serialno,
      },
    })
      .then((res) => {
        console.log(res.data);

        dispatch({
          type: GET_SUPPLIERS,
          suppliers: res.data.suppliers,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const saveSupplier = (supplier, e) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    console.log({
      supplier_name: supplier.name,
      supplier_phone: supplier.phone,
      action: "add",
      owner: reactLocalStorage.getObject("userdata").default_shop,
    });

    Api.get(`/supplier.php`, {
      params: {
        supplier_name: supplier.name,
        supplier_phone: supplier.phone,
        action: "add",
        owner: reactLocalStorage.getObject("userdata").default_shop,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ADD_SUPPLIER,
          suppliers: res.data.suppliers,
        });
        e.reset();
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
