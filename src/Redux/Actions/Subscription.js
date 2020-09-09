import {
    GET_SUBSCRIPTIONS, LOADING
  } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";

export const getSubscriptions = () => {
    return (dispatch) => {
      
      // Api.get(`/subscribe.php`, {
      //   params: {
      //     adminemailorphonekey: reactLocalStorage.getObject("userdata").phoneno,
      //     subscriptions: "true",
      //   },
      // })
      //   .then((res) => {
      //     const subscriptions = res.data;
      //     console.log("getAttendants", subscriptions);
  
      //     dispatch({
      //       type: GET_SUBSCRIPTIONS,
      //       subscriptions,
      //     });
      //   })
      //   .catch((error) => {
      //     // your error handling goes here}
      //     console.log("subscerror", error);
      //   });
    };
};