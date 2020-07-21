import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../Redux/Actions";
import auth from "../auth";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { useSelector } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
// import Api from "../../api/api";

function Login(props) {
  const loggedin = useSelector((state) => state);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (username && password) {
    // console.log({ username, password });
    props.login(username, password, props.match.params.type);
    // }
  };

  if (auth.isAuthenticated()) {
    props.history.push("/dashboard");
  }
  if (props.loggedin) {
    auth.login(() => {
      props.history.push("/dashboard");
    });
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250,
    });
  }

  console.log("lohin", props);

  return (
    <div className="container">
      <div className="row" onSubmit={handleSubmit}>
        <Loader fullPage loading={loggedin.login.loading} />
        <h5 className="center">Login</h5>
        <form className="col s12 forminput">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                value={username}
                onChange={handleChange}
                id="icon_prefix"
                type="text"
                name="username"
                className="validate"
              />
              <label htmlFor="icon_prefix">Email / Phone</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input
                value={password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                className="validate"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 center">
              <button
                // onClick={() => this.props.login()}
                className="btn btn-primary btn-large"
              >
                Login
              </button>
              <br />
              <span> or</span>
              <Link to="register">
                <h6 className="text-white">Create an account</h6>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userdata: state.login.userdata,
  login: state,
  loggedin: state.login.loggedin,
});

const mapDispacthToProps = (dispatch) => {
  return {
    login: (username, password, type) =>
      dispatch(login(username, password, type)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Login);
