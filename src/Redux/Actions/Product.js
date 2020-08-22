import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
export const deleteProductStockIn = (id) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
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
        console.log("deleteProductStockIn ", res.data);
        dispatch({
          type: "GET_STOCK",
          stocks: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getProductStockIn = (stockid, year) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    console.log("getProductStockIn", {
      stockid,
      year,
      action: "productstockin",
    });

    Api.get(`/product.php`, {
      params: {
        stockid,
        year,
        action: "productstockin",
      },
    })
      .then((res) => {
        console.log("getProductStockIn", res.data);
        dispatch({
          type: "GET_PRODUCT_STOCK_IN",
          productstockin: res.data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};
export const getProductSummary = (id, year) => {
  return (dispatch) => {
    console.log("getProductSummary", {
      stockid: id,
      year,
      action: "sales",
    });
    dispatch({
      type: "LOADING",
    });

    Api.get(`/product.php`, {
      params: {
        stockid: id,
        year,
        action: "sales",
      },
    })
      .then((res) => {
        console.log("getproductSummary", res.data);
        dispatch({
          type: "GET_PRODUCT_SUMMARY",
          summary: res.data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};
export const getSingleProductSales = (stockid, fromtime, totime, year) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    console.log({
      stockid,
      fromtime,
      totime,
      year,
      action: "productsales",
    });

    Api.get(`/product.php`, {
      params: {
        stockid,
        fromtime,
        totime,
        year,
        action: "productsales",
      },
    })
      .then((res) => {
        console.log("getSingleProductSales", res.data);
        dispatch({
          type: "GET_PRODUCT_SALE",
          productsales: res.data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};
