import { GET_ATTENDANTS, ADDED_ATTENDANT, GET_PROFILE } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";

export const addAttendant = (attendant) => {
  return (dispatch) => {
    attendant.action = "add";
    console.log("Adding", attendant);

    Api.get(`/attendants.php`, {
      params: attendant,
    })
      .then((res) => {
        const attendants = res.data;
        console.log("ADDED ATTENDANT", attendants);

        dispatch({
          type: ADDED_ATTENDANT,
          attendants,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const updateProfile = (data) => {
  return (dispatch) => {
    data.action = "update";
    console.log(data);

    Api.get(`/attendants.php`, {
      params: data,
    })
      .then((res) => {
        const profile = res.data;
        console.log("updateProfile actions ", profile);

        dispatch({
          type: GET_PROFILE,
          profile,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const getprofile = (id) => {
  return (dispatch) => {
    console.log({
      id,
      action: "attendant_profile",
    });

    Api.get(`/attendants.php`, {
      params: {
        id,
        action: "attendant_profile",
      },
    })
      .then((res) => {
        const profile = res.data;
        console.log("getprofile actions ", profile);

        dispatch({
          type: GET_PROFILE,
          profile,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getAttendants = (shopid) => {
  return (dispatch) => {
    Api.get(`/attendants.php`, {
      params: {
        shopid,
        action: "all",
      },
    })
      .then((res) => {
        const attendants = res.data;
        console.log("getAttendants", attendants);

        dispatch({
          type: GET_ATTENDANTS,
          attendants,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const getAdminprofile = () => {
  return (dispatch) => {
    Api.get(`/myprofile.php`, {
      params: {
        id: reactLocalStorage.getObject("userdata").serialno,
        action: "get",
      },
    })
      .then((res) => {
        const profile = res.data;
        console.log("admin getprofile actions ", profile);

        dispatch({
          type: "GET_ADMIN_PROFILE",
          profile,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const updateAdminProfile = (data) => {
  return (dispatch) => {
    data.action = "update";
    console.log(data);
    data.id = reactLocalStorage.getObject("userdata").serialno;
    Api.get(`/myprofile.php`, {
      params: data,
    })
      .then((res) => {
        const profile = res.data;
        console.log("updateProfile actions ", profile);

        dispatch({
          type: GET_PROFILE,
          profile,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
