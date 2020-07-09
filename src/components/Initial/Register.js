import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import { register } from "../../Redux/Actions";

function Register(props) {
  useEffect(() => {
    var selectelems = document.querySelectorAll("select");
    M.FormSelect.init(selectelems, {
      classes: "custom-wrap",
    });
  }, []);

  // render() {
  const [inputs, setInputs] = useState({
    email: "",
    country: "",
    password: "",
    phone: "",
  });
  const { email, phone, password, country } = inputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.register(email, phone, password, country);
  };

  const history = useHistory();

  if (props.loggedin) {
    history.push("/dashboard");
  }
  console.log(props.regdata);
  return (
    <div className="container">
      <div className="row">
        <form className="col s12 forminput" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                placeholder="Email "
                id="email"
                value={email}
                name="email"
                onChange={handleChange}
                type="text"
                className="validate"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">phone</i>
              <input
                type="text"
                value={phone}
                onChange={handleChange}
                className="validate"
                name="phone"
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">flag</i>
              <select
                defaultValue="a"
                name="country"
                value={country}
                onChange={handleChange}
              >
                <option value="a">Choose your country</option>
                <option value="ke">kenya</option>
                <option value="ug">Uganda</option>
                <option value="tz">Tanzania</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handleChange}
                className="validate"
                name="password"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 center">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  // }
}
const mapStateToProps = (state) => ({
  regdata: state.login.userdata,
  loggedin: state.login.loggedin,
});

const mapDispacthToProps = (dispatch) => {
  return {
    register: (email, phone, password, country) =>
      dispatch(register(email, phone, password, country)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Register);
