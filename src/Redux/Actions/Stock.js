import {
  ADD_STOCK,
  GET_STOCK,
  ADDING_STOCK,
  ADD_UNIT,
  GET_UNITS,
  ADD_SUPPLIER,
  GET_SUPPLIERS,
  LOADING,
  GET_SINGLE_ITEM,
  UPDATE_STOCK_COUNT,
} from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";

export const getSingleStock = (id) => {
  return (dispatch) => {
    dispatch({
      type: ADDING_STOCK,
      loading: true,
    });

    Api.get(`/stocks.php`, {
      params: {
        id,
        action: "single",
      },
    })
      .then((res) => {
        const stockrespose = res.data;
        console.log("single", stockrespose);

        dispatch({
          type: GET_SINGLE_ITEM,
          stockrespose: stockrespose,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const addStock = (stockinput) => {
  return (dispatch) => {
    dispatch({
      type: ADDING_STOCK,
      loading: true,
    });
    console.log("stockinput", stockinput);

    Api.get(`/newstock.php`, {
      params: stockinput,
    })
      .then((res) => {
        const stockrespose = res.data;
        console.log("stockrespose " + stockrespose);

        dispatch({
          type: ADD_STOCK,
          stockrespose: stockrespose.query_result,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getSuppliers = () => {
  return (dispatch) => {
    Api.get(`/supplier.php`, {
      params: {
        action: "get",
        owner: reactLocalStorage.getObject("userdata").serialno,
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

export const saveSupplier = (supplier) => {
  return (dispatch) => {
    console.log({
      supplier: supplier,
      owner: reactLocalStorage.getObject("userdata").serialno,
    });

    Api.get(`/supplier.php`, {
      params: {
        supplier: supplier,
        action: "add",
        owner: reactLocalStorage.getObject("userdata").serialno,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ADD_SUPPLIER,
          suppliers: res.data.suppliers,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const saveUnit = (unit) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    Api.get(`/units.php`, {
      params: {
        unit_name: unit.unit_name,
        action: "add",
        owner: reactLocalStorage.getObject("userdata").serialno,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ADD_UNIT,
          units: res.data.unit,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getUnits = () => {
  return (dispatch) => {
    Api.get(`/units.php`, {
      params: {
        action: "get",
        owner: reactLocalStorage.getObject("userdata").serialno,
      },
    })
      .then((res) => {
        console.log("database", res.data);
        dispatch({
          type: GET_UNITS,
          units: res.data.unit,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getStock = (shopid) => {
  return (dispatch) => {
    console.log({ currentshopidkey: shopid, action: "all" });

    Api.get(`/stocks.php`, {
      params: {
        currentshopidkey: shopid,
        action: "all",
      },
    })
      .then((res) => {
        console.log("getStock", res.data);
        dispatch({
          type: GET_STOCK,
          stocks: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const saveStockCount = (newcount, item) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    item.newcount = newcount;
    item.action = "updatecount";
    console.log("saveStockCount ", { item });

    console.log({
      item,
      action: "updatecount",
    });

    Api.get(`/stocks.php`, {
      params: item,
    })
      .then((res) => {
        console.log("from db ", res.data);
        dispatch({
          type: UPDATE_STOCK_COUNT,
          stocks: res.data.items,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getStockCountHistory = (newcount, item) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    item.newcount = newcount;
    item.action = "updatecount";
    console.log("saveStockCount ", { item });

    console.log({
      item,
      action: "updatecount",
    });

    Api.get(`/stocks.php`, {
      params: item,
    })
      .then((res) => {
        console.log("from db ", res.data);
        dispatch({
          type: UPDATE_STOCK_COUNT,
          stocks: res.data.items,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
