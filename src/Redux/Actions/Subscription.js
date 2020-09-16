import {
    GET_SUBSCRIPTIONS, LOADING, GET_CURRENT_SUBSCRIPTION, MAKE_SUBSCRIPTION
  } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";

export const getSubscriptions = () => {
    return (dispatch) => {
      
  console.log("getSubscriptions");
      Api.get(`/subscribe.php`, {
        params: {
          subscriptions: "true",
          action:"allpackages"
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
        action:"current_subs"
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

export const makeSubscription = (plan) => {
  return (dispatch) => {

    console.log('ssss',{
      admin_key: reactLocalStorage.getObject("userdata").serialno,
      plankey: plan,
      action:"subscribe",
    });
    
    Api.get(`/subscribe.php`, {
      params: {
        admin_key: reactLocalStorage.getObject("userdata").serialno,
        plankey: plan,
        shopidkey: reactLocalStorage.getObject("currentshop").serialno,
        action:"subscribe",
      },
    })
      .then((res) => {
        const madesubscription = res.data;
        console.log("madeSubsc", madesubscription);
        reactLocalStorage.setObject("currentshop", madesubscription);
        

        dispatch({
          type: MAKE_SUBSCRIPTION,
          madesubscription,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("madesubscerr", error);
      });
  };
};