import { LOADING } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

export const addStockIn = (item, props) => {
  return (dispatch) => {
    item.quantity = 1;
    item.type = "cash";
    item.total = item.buyingprice;
    item.stockinbuyingprice = item.buyingprice;
    dispatch({
      type: "ADD_STOCKIN",
      stocksin: item,
    });

    props.handleClose();
  };
};

export const getStocksIn = () => {
  return (dispatch) => {
    console.log("calling loading");
    dispatch({
      type: LOADING,
    });

    Api.get(`/stocks.php`, {
      params: {
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        attendant_id: reactLocalStorage.getObject("userdata").serialno,
        user_type: reactLocalStorage.get("user_type"),
        action: "allstocksin",
      },
    })
      .then((res) => {
        console.log("allstocksin", res.data);
        dispatch({
          type: "GET_STOCKS_IN",
          stocksin: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const saveStockIn = (stocks, supplier, type, invoiceno) => {
  return (dispatch) => {
    console.log("stockin", stocks);
    var dd = new Date().getTime();
    dispatch({
      type: LOADING,
      loading: true,
    });
    var attendant_id = "";
    if (reactLocalStorage.get("user_type") === "attendant") {
      attendant_id = reactLocalStorage.getObject("userdata").serialno;
    }

    console.log("saving stock", {
      stocks,
      supplier_id: supplier ? supplier.id : 0,
      invoiceno,
      attendant_id,
      type,
      user_type: reactLocalStorage.get("user_type"),
      shopid: reactLocalStorage.getObject("userdata").default_shop,
      action: "stockin",
      date_time: moment(dd).format("YYYY-MM-DD hh:mm:ss"),
    });

    Api.get(`/stocks.php`, {
      params: {
        stocks,
        supplier_id: supplier ? supplier.id : 0,
        invoiceno,
        attendant_id,
        user_type: reactLocalStorage.get("user_type"),
        type,
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        action: "stockin",
        date_time: moment(dd).format("YYYY-MM-DD hh:mm:ss"),
      },
    })
      .then((res) => {
        const response = res.data;
        console.log("stockin response", response);

        dispatch({
          type: "CLEAR_STOCKIN",
        });

        dispatch({
          type: "GET_STOCKS_IN",
          stocksin: response,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const deleteStockIn = (stock, fromtime, totime) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    console.log({
      stock,
      action: "deletestockin",
      fromtimeStamp: fromtime,
      totimeStamp: totime,
    });

    Api.get(`/stocks.php`, {
      params: {
        stock,
        action: "deletestockin",
        fromtimeStamp: fromtime,
        totimeStamp: totime,
      },
    })
      .then((res) => {
        const response = res.data;
        // props.history.goBack();
        console.log("After deleting ", response);
        dispatch({
          type: "GET_REPORTS",
          item: response,
        });
        dispatch({
          type: "GET_STOCKS_IN",
          deletedstock: stock,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
