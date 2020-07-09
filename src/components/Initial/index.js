import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Actions";
import { reactLocalStorage } from "reactjs-localstorage";

export default function Initial(props) {
  // const loggedin = useSelector((state) => state.login);
  const dispatch = useDispatch();

  // const fetch_data = () => {
  //   return axios.get("http://localhost:5001/todos").then((Response) => {
  //     store.dispatch(addTodo(Response.data));
  //   });
  // };

  console.log(JSON.parse(reactLocalStorage.getItem("loggedin")));
  // if (loggedin.loggedin)
  // if (reactLocalStorage.getItem("loggedin")) {
  //   props.history.push("/dashboard");
  // }
  return (
    <div className="container center-align">
      <div className="row ">
        <div className="col s12">
          <h5>Continue as: </h5>
        </div>
        <div className="col s12">
          <button
            className="btn btn-primary"
            onClick={() =>
              dispatch(
                login({
                  type: "attendant",
                })
              )
            }
            style={{ marginTop: 30, marginBottom: 30 }}
          >
            Attendant
          </button>
        </div>
        <div className="col s12">
          <Link to="login">
            <button
              className="btn btn-primary"
              style={{ marginTop: 10, marginBottom: 30 }}
            >
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
