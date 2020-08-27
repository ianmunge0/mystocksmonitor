import { ADD_SALES, LOADING, GET_SALES } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
var counter = 0;
export const getTodayExpenses = (expense) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });
    console.log(reactLocalStorage.getObject("userdata").default_shop);

    expense.shopid = reactLocalStorage.getObject("userdata").default_shop;
    var dd = new Date().getTime();
    expense.date_time = moment(dd).format("YYYY-MM-DD hh:mm:ss");
    console.log("Asking", expense);
    Api.get(`/profitandexpense.php`, {
      params: expense,
    })
      .then((res) => {
        var response = res.data;
        // setExpense(response);
        dispatch({
          type: "TODAY_EXPENSES",
          response,
        });
        console.log("todayexpenses", response);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getPEA = (fromtimeStamp, totimestamp) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });

    Api.get(`/profitandexpense.php`, {
      params: {
        fromdate: moment(fromtimeStamp).format("YYYY-MM-DD hh:mm:ss"),
        todate: moment(totimestamp).format("YYYY-MM-DD hh:mm:ss"),
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        action: "graphprofitexpense",
      },
    })
      .then((res) => {
        const response = res.data;
        console.log("profitandexpense", response);

        dispatch({
          type: "GET_EXPENSES_GRAPH",
          response,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const getEnPSummary = (payload) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });
    console.log("getEnPSummary", payload);
    Api.get(`/profitandexpense.php`, {
      params: payload,
    })
      .then((res) => {
        const response = res.data;
        console.log("profitandexpense", response);

        dispatch({
          type: "GET_EXPENSES",
          response,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

const getMonth = (monthStr) => {
  return new Date(monthStr + "-1-01").getMonth() + 1;
};

export const addExpense = (expense, props) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });

    expense.action = "add";

    const d = new Date();
    var option = d.getMonth() + 1;
    const input = getMonth(option) + "-" + d.getFullYear();
    const output = moment(input, "MM-YY");

    expense.time = moment(new Date().getTime()).format("YYYY-MM-DD hh:mm:ss");
    expense.fromdate = moment(output.startOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    expense.todate = moment(output.endOf("month").format("LL")).format(
      "YYYY-MM-DD hh:mm:ss"
    );

    Api.get(`/profitandexpense.php`, {
      params: expense,
    })
      .then((res) => {
        const response = res.data;
        console.log("profitandexpense", response);
        props.handleClose();
        dispatch({
          type: "TODAY_EXPENSES",
          response,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
