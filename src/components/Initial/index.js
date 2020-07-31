import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import auth from "../auth";

function Initial(props) {
  console.log("index", reactLocalStorage.get("loggedin"));
  if (auth.isAuthenticated()) {
    if (reactLocalStorage.getObject("shops").length > 0) {
      props.history.push("/dashboard");
    } else {
      props.history.push("/initialshopspage");
    }
  }
  return (
    <div className="container center-align">
      <div className="row ">
        <div className="col s12">
          <h5>Continue as: </h5>
        </div>
        <div className="col s12">
          <Link
            to={`/login/attendant`}
            className="btn btn-primary"
            style={{ marginTop: 30, marginBottom: 30 }}
          >
            Attendant
          </Link>
        </div>
        <div className="col s12">
          <Link to={`/login/admin`}>
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

export default Initial;
