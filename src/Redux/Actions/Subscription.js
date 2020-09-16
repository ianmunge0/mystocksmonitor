import {
  GET_SUBSCRIPTIONS,
  LOADING,
  GET_CURRENT_SUBSCRIPTION,
  MAKE_SUBSCRIPTION,
} from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";

export const getSubscriptions = () => {
  return (dispatch) => {
    console.log("getSubscriptions");
    Api.get(`/subscribe.php`, {
      params: {
        subscriptions: "true",
        action: "allpackages",
      },
    })
      .then((res) => {
        const subscriptions = res.data;
        console.log("ggetSubscription", subscriptions);

        dispatch({
          type: GET_SUBSCRIPTIONS,
          subscriptions,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("subscerror", error);
      });
  };
};

export const getCurrentSubscription = () => {
  return (dispatch) => {
    Api.get(`/subscribe.php`, {
      params: {
        admin_key: reactLocalStorage.getObject("userdata").serialno,
        currentsubsckey: "true",
        action: "current_subs",
      },
    })
      .then((res) => {
        const currentsubscription = res.data;
        console.log("currentSubsc", currentsubscription);

        dispatch({
          type: GET_CURRENT_SUBSCRIPTION,
          currentsubscription,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("currsubscerr", error);
      });
  };
};
const checkPayment = (pp) => {
  return (dispatch) => {
    pp.action = "checkpayment";
    console.log("checkPayment pp ", checkPayment);
    Api.get(`/subscribe.php`, {
      params: pp,
    })
      .then((res) => {
        console.log("response checkPayment ", res.data);
        dispatch({
          type: "PAYMENT_CONFIRMATION",
          confirmation: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("madesubscerr", error);
      });
  };
};
var trial = 0;
export const makeSubscription = (plan, state, props) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    var pp = {
      admin_key: reactLocalStorage.getObject("userdata").serialno,
      plankey: plan,
      shopidkey: reactLocalStorage.getObject("currentshop").serialno,
      phone: state.phoneno,
      action: "mpesacall",
    };
    Api.get(`/subscribe.php`, {
      params: pp,
    })
      .then((res) => {
        const madesubscription = res.data;
        console.log("madeSubsc", madesubscription);
        if (madesubscription.status > 200) {
          dispatch({
            type: MAKE_SUBSCRIPTION,
            madesubscription,
          });
          return;
        }
        //
        const interval = setInterval(() => {
          pp.action = "checkpayment";
          console.log("checkPayment pp ", checkPayment);
          Api.get(`/subscribe.php`, {
            params: pp,
          })
            .then((res) => {
              console.log("response checkPayment " + trial, res.data);
              if (res.data.status == true || trial > 5) {
                trial = 0;
                clearInterval(interval);
                if (res.data.status == true) {
                  reactLocalStorage.setObject("currentshop", res.data);
                  props.history.push("subscriptions");
                } else {
                  res.data.waitingmpesa = madesubscription;
                  //save the new shop to localstorage
                  dispatch({
                    type: "PAYMENT_CONFIRMATION",
                    confirmation: res.data,
                  });
                }
              } else {
                trial++;
              }
            })
            .catch((error) => {
              // your error handling goes here}
              console.log("madesubscerr", error);
            });
        }, 5000);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("madesubscerr", error);
      });
  };
};
