import { LOADING, GET_RECEIPTS } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

export const getSalesReceipts = (fromtimeStamp, totimeStamp) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });
    console.log({
      fromtimeStamp: moment(fromtimeStamp).format("YYYY-MM-DD hh:mm:ss"),
      totimeStamp: moment(totimeStamp).format("YYYY-MM-DD hh:mm:ss"),
      shop: reactLocalStorage.getObject("userdata").default_shop,
      action: "getsales",
    });

    Api.get(`/sales.php`, {
      params: {
        fromtimeStamp: moment(fromtimeStamp).format("YYYY-MM-DD hh:mm:ss"),
        totimeStamp: moment(totimeStamp).format("YYYY-MM-DD hh:mm:ss"),
        shop: reactLocalStorage.getObject("userdata").default_shop,
        action: "getsales",
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
