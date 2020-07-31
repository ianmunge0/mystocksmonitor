import { ADD_SALES, LOADING, GET_SALES } from "./actions";
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
  };
};

export const saveSales = (sales) => {
  return (dispatch) => {
    var dd = new Date().getTime();
    // sales.action = "save";
    console.log({
      sales,
      action: "save",
      date_time: moment(dd).format("YYYY-MM-DD hh:mm:ss"),
    });

    Api.get(`/sales.php`, {
      params: {
        sales,
        action: "save",
        date_time: moment(dd).format("YYYY-MM-DD hh:mm:ss"),
      },
    })
      .then((res) => {
        const response = res.data;
        console.log("single", response);

        dispatch({
          type: "CLEAR_SALES_RECEIPT",
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
