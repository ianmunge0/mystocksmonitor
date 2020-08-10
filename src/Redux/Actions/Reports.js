import { GET_REPORTS, LOADING } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";

export const getReport = (fromtime, totime) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });
    console.log({
      fromtimeStamp: moment(fromtime).format("YYYY-MM-DD hh:mm:ss"),
      totimeStamp: moment(totime).format("YYYY-MM-DD hh:mm:ss"),
      shop: reactLocalStorage.getObject("userdata").default_shop,
    });

    Api.get(`/reports.php`, {
      params: {
        fromtimeStamp: moment(fromtime).format("YYYY-MM-DD hh:mm:ss"),
        totimeStamp: moment(totime).format("YYYY-MM-DD hh:mm:ss"),
        shop: reactLocalStorage.getObject("userdata").default_shop,
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
