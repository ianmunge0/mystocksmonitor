import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

function Initial(props) {
  console.log("index", reactLocalStorage.get("loggedin"));

  try {
    if (reactLocalStorage.get("loggedin") === "true") {
      props.history.push("/dashboard");
    }
  } catch (error) {}

  return (
    <div className="container center-align">
      <div className="row ">
        <div className="col s12">
          <h5>Continue as: </h5>
        </div>
        <div className="col s12">
          <Link to="login">
            <button
              className="btn btn-primary"
              style={{ marginTop: 30, marginBottom: 30 }}
            >
              Attendant
            </button>
          </Link>
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

export default Initial;
