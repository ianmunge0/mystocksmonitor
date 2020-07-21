import { GET_REPORTS, LOADING } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

export const getReport = (fromtimeStamp, totimeStamp) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });

    console.log({
      fromtimeStamp: moment(fromtimeStamp).format("YYYY-MM-DD hh:mm:ss"),
      totimeStamp: moment(totimeStamp).format("YYYY-MM-DD hh:mm:ss"),
      shop: reactLocalStorage.getObject("userdata").serialno,
    });

    Api.get(`/reports.php`, {
      params: {
        fromtimeStamp: moment(fromtimeStamp).format("YYYY-MM-DD hh:mm:ss"),
        totimeStamp: moment(totimeStamp).format("YYYY-MM-DD hh:mm:ss"),
        shop: 34, //reactLocalStorage.getObject("userdata").serialno,
      },
    })
      .then((res) => {
        const item = res.data;
        console.log("getReport", item);

        dispatch({
          type: GET_REPORTS,
          item,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
