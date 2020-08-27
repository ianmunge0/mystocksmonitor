import { LOADING, GET_RECEIPTS, ADD_SALES } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

export const addSales = (item, props) => {
  return (dispatch) => {
    console.log(item);
    item.quantity = 1;
    item.type = "cash";
    item.total = item.sellingprice;
    dispatch({
      type: ADD_SALES,
      sales: item,
    });

    props.handleClose();
  };
};

export const saveSales = (sales, customer) => {
  return (dispatch) => {
    console.log("sales", sales);
    var dd = new Date().getTime();
    dispatch({
      type: LOADING,
      loading: true,
    });
    var attendant_key = "";
    if (reactLocalStorage.get("user_type") === "attendant") {
      attendant_key = reactLocalStorage.getObject("userdata").serialno;
    }
    Api.get(`/sales.php`, {
      params: {
        sales,
        customer_id: customer ? customer.serialno : 0,
        attendant_key,
        type: reactLocalStorage.get("user_type"),
        shop: reactLocalStorage.getObject("userdata").default_shop,
        initialamount: customer ? customer.amount : 0,
        oncredit_due_date: customer ? customer.duedate : "",
        action: "save",
        date_time: moment(dd).format("YYYY-MM-DD hh:mm:ss"),
      },
    })
      .then((res) => {
        const response = res.data;
        console.log("single", response);

        // //update stock qty after selling
        // dispatch({
        //   type: "UPDATE_STOCK",
        //   solditems: sales,
        // });

        //clear sales receipt to allow new sale
        dispatch({
          type: "CLEAR_SALES_RECEIPT",
        });

        //update receipts data to show for today
        dispatch({
          type: "GET_RECEIPTS",
          receipts: response,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const deleteSaleReceipt = (receiptno, props) => {
  return (dispatch) => {
    console.log("deleting receipt ", {
      receiptno,
      action: "delete_sale_receipt",
    });
    dispatch({
      type: "LOADING",
    });

    Api.get(`/sales.php`, {
      params: {
        receiptno,
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        type: reactLocalStorage.get("user_type"),
        userid: reactLocalStorage.getObject("userdata").serialno,
        action: "delete_sale_receipt",
      },
    })
      .then((res) => {
        const receiptpayments = res.data;
        console.log("receiptpayments ", receiptpayments);
        // props.history.goBack();
        dispatch({
          type: "GET_RECEIPTS",
          receipts: receiptpayments,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
