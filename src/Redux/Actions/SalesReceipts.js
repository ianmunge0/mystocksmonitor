import { LOADING, GET_RECEIPTS, ADD_SALES } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

export const getSalesReceipts = (fromtimeStamp, totimeStamp, type) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });

    Api.get(`/sales.php`, {
      params: {
        fromtimeStamp: moment(fromtimeStamp).format("YYYY-MM-DD hh:mm:ss"),
        totimeStamp: moment(totimeStamp).format("YYYY-MM-DD hh:mm:ss"),
        shop: reactLocalStorage.getObject("userdata").default_shop,
        userid: reactLocalStorage.getObject("userdata").serialno,
        action: "getsales",
        type,
      },
    })
      .then((res) => {
        const receipts = res.data;
        console.log("getSales", receipts);

        dispatch({
          type: GET_RECEIPTS,
          receipts,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const deleteReceipt = (receiptno, props) => {
  return (dispatch) => {
    console.log("deleting receipt ", {
      receiptno,
      action: "delete_customer_receipt",
    });
    dispatch({
      type: "LOADING",
    });

    Api.get(`/sales.php`, {
      params: {
        receiptno,
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        action: "delete_customer_receipt",
      },
    })
      .then((res) => {
        const receiptpayments = res.data;
        console.log("receiptpayments ", receiptpayments);
        // props.history.goBack();
        dispatch({
          type: "GET_RECEIPT_PAYMENTS",
          receiptpayments,
          deleted_receiptno: receiptno,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
