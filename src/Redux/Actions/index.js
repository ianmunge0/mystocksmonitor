import { LOG_IN, REG, LOG_OUT, LOADING } from "./actions";
import Api from "../../api/api";
// import { DBService } from "../../services/DBService";
import { reactLocalStorage } from "reactjs-localstorage";
import auth from "../../components/auth";

export const reset = (email) => {
  return (dispatch) => {
    console.log({
      action: "reset",
      emailorphonekey: email,
    });
    Api.get(`/reset.php`, {
      params: {
        action: "reset",
        emailorphonekey: email,
      },
    })
      .then((res) => {
        console.log("reset response", res.data);
        dispatch({
          type: "RESET_PASSWORD",
          userdata: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const countries = () => {
  return (dispatch) => {
    Api.get(`/myprofile.php`, {
      params: { action: "countries" },
    })
      .then((res) => {
        console.log("countries", res.data);
        dispatch({
          type: "COUNTRIES",
          userdata: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const login = (email, password, type) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN_LOADING",
      loading: true,
    });

    console.log({ attendant_id: email, password, type });

    if (type === "attendant") {
      Api.get(`/login.php`, {
        params: { attendant_id: email, password, type },
      })
        .then((res) => {
          console.log(res.data);

          dispatch({
            type: LOADING,
            loading: false,
          });

          const userdata = res.data;
          if (userdata.status) {
            console.log("saving to localstorage login", res.data);
            reactLocalStorage.setObject("userdata", userdata);
            reactLocalStorage.set("loggedin", true);
            reactLocalStorage.set("user_type", type);
            reactLocalStorage.setObject("roles", userdata.role);
          }
          dispatch({
            type: LOG_IN,
            userdata: userdata,
          });
        })
        .catch((error) => {
          // your error handling goes here}
          console.log("error", error);
        });
    } else {
      Api.get(`/login.php`, {
        params: {
          emailorphonekey: email,
          password,
          type,
        },
      })
        .then((res) => {
          console.log(res.data);

          dispatch({
            type: LOADING,
            loading: false,
          });

          const userdata = res.data;
          console.log("userdata", userdata);

          if (userdata.status) {
            console.log("saving to localstorage login", res.data);
            reactLocalStorage.setObject("userdata", userdata.profile);
            reactLocalStorage.setObject("currentshop", userdata.currentshop);
            reactLocalStorage.setObject("shops", userdata.shops);
            reactLocalStorage.setObject("countries", userdata.countries);
            reactLocalStorage.setObject("roles", userdata.roles);

            reactLocalStorage.set("loggedin", true);
            reactLocalStorage.set("user_type", type);
          }
          dispatch({
            type: LOG_IN,
            userdata: userdata,
          });
        })
        .catch((error) => {
          // your error handling goes here}
          console.log("error", error);
        });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    reactLocalStorage.clear();
    console.log("logged out");
    dispatch({
      type: LOG_OUT,
    });
  };
};

export const register = (
  email,
  phone,
  password,
  country,
  country_code,
  type
) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      loading: true,
    });
    Api.get(`/signuptwo.php`, {
      params: {
        usertypesignupkey: "admin",
        emailaddresssignupkey: email,
        phonenosignupkey: phone,
        countrysignupkey: country,
        country_code: country_code,
        passwordsignupkey: password,
      },
    })
      .then((res) => {
        console.log("register", res.data);

        const regdata = res.data;
        dispatch({
          type: REG,
          userdata: regdata,
        });
        console.log("saving to localstorage", regdata.shops);
        if (regdata.status) {
          reactLocalStorage.setObject("userdata", regdata.profile);
          reactLocalStorage.setObject("shops", regdata.shops);
          reactLocalStorage.set("loggedin", true);
          reactLocalStorage.set("user_type", "admin");
        }
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
