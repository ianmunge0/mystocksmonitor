import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
// import Api from "../../api/api";

function Login(props) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputs;
  // const loggingIn = useSelector((state) => state.loggedin);

  // console.log(loggingIn);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (username && password) {
    // console.log({ username, password });
    props.login(username, password);
    // }
  };
  if (props.loggedin) {
    props.history.push("/dashboard");
  }

  return (
    <div className="container">
      <div className="row" onSubmit={handleSubmit}>
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
  loggedin: state.login.loggedin,
});

const mapDispacthToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Login);
