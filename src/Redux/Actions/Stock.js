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

export const addStock = (stockinput, e) => {
  return (dispatch) => {
    dispatch({
      type: ADDING_STOCK,
      loading: true,
    });

    var dd = new Date().getTime();
    stockinput.date_time = moment(dd).format("YYYY-MM-DD hh:mm:ss");
    stockinput.time_ = parseInt((dd / 1000).toFixed(0)); //new Date().getTime();
    stockinput.action = "insert";
    stockinput.shopid = reactLocalStorage.getObject("userdata").default_shop;
    if (reactLocalStorage.get("user_type") === "attendant") {
      stockinput.attendantserial_key = reactLocalStorage.getObject(
        "userdata"
      ).serialno;
    }

    console.log("stockinput", stockinput);

    Api.get(`/stocks.php`, {
      params: stockinput,
    })
      .then((res) => {
        const stockrespose = res.data;
        console.log("stockrespose ", stockrespose);
        if (stockrespose.status === true) {
          e.reset();
        }

        dispatch({
          type: ADD_STOCK,
          stockrespose: stockrespose,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getSuppliers = () => {
  console.log("getSuppliers");

  return (dispatch) => {
    dispatch({
      type: LOADING,
    });
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

export const saveSupplier = (supplier, e) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    console.log({
      supplier_name: supplier.name,
      supplier_phone: supplier.phone,
      action: "add",
      owner: reactLocalStorage.getObject("userdata").serialno,
    });

    Api.get(`/supplier.php`, {
      params: {
        supplier_name: supplier.name,
        supplier_phone: supplier.phone,
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
        e.reset();
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const saveUnit = (unit, e) => {
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
        e.reset();
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

export const deleteUnit = (unit) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    console.log({
      id: unit.id,
      action: "delete",
      owner: reactLocalStorage.getObject("userdata").serialno,
    });

    Api.get(`/units.php`, {
      params: {
        id: unit.id,
        action: "delete",
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
    console.log("getUnits ", {
      action: "get",
      owner: reactLocalStorage.getObject("userdata").serialno,
    });
    Api.get(`/units.php`, {
      params: {
        action: "get",
        owner: reactLocalStorage.getObject("userdata").serialno,
      },
    })
      .then((res) => {
        console.log("units database", res.data);
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
export const getBadStocks = (objectparam) => {
  return (dispatch) => {
    console.log("calling loading");
    dispatch({
      type: LOADING,
    });

    Api.get(`/stocks.php`, {
      params: {
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        attendantserial_key:
          reactLocalStorage.get("user_type") === "attendant"
            ? reactLocalStorage.getObject("userdata").serialno
            : "",
        action: "badstocks",
        fromtimestamp: objectparam.fromtimestamp,
        totimestamp: objectparam.totimestamp,
      },
    })
      .then((res) => {
        console.log("getBadStocks", res.data);
        dispatch({
          type: "GET_BAD_STOCKS",
          stocks: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getStock = () => {
  return (dispatch) => {
    console.log("calling loading");
    dispatch({
      type: LOADING,
    });

    Api.get(`/stocks.php`, {
      params: {
        currentshopidkey: reactLocalStorage.getObject("userdata").default_shop,
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

export const deleteBadStock = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    console.log({
      id,
      currentshopidkey: reactLocalStorage.getObject("userdata").default_shop,
      action: "deletebadstock",
    });

    Api.get(`/stocks.php`, {
      params: {
        id,
        currentshopidkey: reactLocalStorage.getObject("userdata").default_shop,
        attendantserial_key:
          reactLocalStorage.get("user_type") === "attendant"
            ? reactLocalStorage.getObject("userdata").serialno
            : "",
        action: "deletebadstock",
      },
    })
      .then((res) => {
        console.log("deleteStock ", res.data);
        dispatch({
          type: "GET_BAD_STOCKS",
          stocks: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const deleteStock = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    console.log({
      id,
      currentshopidkey: reactLocalStorage.getObject("userdata").default_shop,
      action: "delete",
    });

    Api.get(`/stocks.php`, {
      params: {
        id,
        currentshopidkey: reactLocalStorage.getObject("userdata").default_shop,

        action: "delete",
      },
    })
      .then((res) => {
        console.log("deleteStock ", res.data);
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

export const exportItems = (data) => {
  return (dispatch) => {
    console.log("exporting", data);
    dispatch({
      type: "LOADING",
    });

    Api.get(`/stocks.php`, {
      params: {
        data,
        action: "export",
      },
    })
      .then((res) => {
        const exporteditems = res.data;
        console.log("exporteditems", exporteditems);
        dispatch({
          type: "EXPORT_ITEMS",
          exporteditems: exporteditems,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
