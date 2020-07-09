import { LOG_IN, REG } from "./actions";
import Api from "../../api/api";
// import { DBService } from "../../services/DBService";
import { reactLocalStorage } from "reactjs-localstorage";

export const login = () => {
  return (dispatch) => {
    console.log("Login dispatch");

    Api.post(`/login.php`, {
      emailorphonekey: "0700111222",
      passwordkey: "1234567",
    })
      .then((res) => {
        console.log(res.data);

        const persons = res.data;

        dispatch({
          type: LOG_IN,
          users: persons,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
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
        console.log(res.data);

        const regdata = res.data;
        dispatch({
          type: REG,
          userdata: regdata,
        });
        console.log("saving to localstorage", res.data);
        if (regdata.status) {
          console.log("saving to localstorage in", res.data);
          reactLocalStorage.set("userdata", JSON.stringify(regdata));
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
