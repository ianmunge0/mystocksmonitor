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
  GET_STOCK_COUNT_GROUPED,
  GET_COUNT_HISTORY,
  STOCK_FILTER,
} from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

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
        const item = res.data;
        console.log("single", item);

        dispatch({
          type: GET_SINGLE_ITEM,
          item,
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

    var dd = new Date().getTime();
    stockinput.date_time = moment(dd).format("YYYY-MM-DD hh:mm:ss");
    stockinput.time_ = parseInt((dd / 1000).toFixed(0)); //new Date().getTime();
    stockinput.action = "insert";
    console.log("stockinput", stockinput);

    Api.get(`/stocks.php`, {
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

    console.log({
      unit_name: unit.unit_name,
      action: "add",
      owner: reactLocalStorage.getObject("userdata").serialno,
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
export const filter = (data, string) => {
  return (dispatch) => {
    dispatch({
      type: STOCK_FILTER,
      string: string,
    });
    // let filtered = [];
    // // var copydata = data;
    // if (data) {
    //   console.log("filter ", data);
    //   data.items = data.items.filter((t) => t.name.includes(string));
    //   console.log("after filter ", data);
    // }
    // filtered = data;
    // if (string === "") {
    //   data = [];
    // }

    // dispatch({
    //   type: STOCK_FILTER,
    //   stocks: filtered,
    // });
  };
};

export const saveStockCount = (newcount, item) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    item.newcount = newcount;
    var dd = new Date().getTime();
    item.date_time = moment(dd).format("YYYY-MM-DD hh:mm:ss");
    item.time_ = parseInt((dd / 1000).toFixed(0)); //new Date().getTime();
    item.action = "updatecount";
    console.log("saveStockCount ", moment(dd).format("YYYY-MM-DD hh:mm:ss"));

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

export const getStockCountHistory = (shopid) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    Api.get(`/stocks.php`, {
      params: {
        currentshopidkey: shopid,
        action: "countdayhistory",
      },
    })
      .then((res) => {
        console.log("getStockCountHistory " + res.data.items);
        dispatch({
          type: GET_STOCK_COUNT_GROUPED,
          stocks: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getCountHistory = (timestamp) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });
    console.log({
      timestamp,
      action: "counthistory",
    });

    Api.get(`/stocks.php`, {
      params: {
        timestamp,
        action: "counthistory",
      },
    })
      .then((res) => {
        console.log("getCountHistory " + res.data);
        dispatch({
          type: GET_COUNT_HISTORY,
          stocks: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
