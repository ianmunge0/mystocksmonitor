import { LOG_IN, REG, LOG_OUT, LOADING } from "./actions";
import Api from "../../api/api";
// import { DBService } from "../../services/DBService";
import { reactLocalStorage } from "reactjs-localstorage";
import auth from "../../components/auth";

export const login = (email, password, type) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });
    console.log("Login dispatch", {
      emailorphonekey: email,
      password,
      type,
    });

    if (type === "attendant") {
      Api.get(`/login.php`, {
        params: { attendant_id: email, password, type },
      })
        .then((res) => {
          console.log(res.data);

          const userdata = res.data;

          if (userdata.status) {
            console.log("saving to localstorage login", res.data);
            reactLocalStorage.setObject("userdata", userdata);
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

          const userdata = res.data;

          if (userdata.status) {
            console.log("saving to localstorage login", res.data);
            reactLocalStorage.setObject("userdata", userdata);
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

export const register = (email, phone, password, country) => {
  return (dispatch) => {
    console.log("Register dispatch");

    Api.get(`/signuptwo.php`, {
      params: {
        usertypesignupkey: "admin",
        emailaddresssignupkey: email,
        phonenosignupkey: phone,
        countrysignupkey: country,
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
        console.log("saving to localstorage", res.data);
        if (regdata.status) {
          console.log("saving to localstorage in", res.data);
          reactLocalStorage.setObject("userdata", regdata);
          reactLocalStorage.set("loggedin", true);
        }

        // new DBService().put("userdata", regdata);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
