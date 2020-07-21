import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import NavBar from "../../components/Navigations/NavBar";
import { getprofile, updateProfile } from "../../Redux/Actions/Attendants";
import { connect } from "react-redux";
import "react-overlay-loader/styles.css";

function Attendantprofile(props) {
  useEffect(() => {
    M.Tabs.init(document.querySelector(".tabs"), {
      swipeable: true,
    });

    document.addEventListener("DOMContentLoaded", function () {
      M.FormSelect.init(document.querySelectorAll("select"), {});
    });
    props.getprofile(props.match.params.id);
  }, []);

  const [error, setError] = useState("");

  const updateProfile = (e) => {
    e.preventDefault();
    setError("");
    console.log(attendant);

    if (attendant["password"] === "" && attendant["username"] === "") {
      setError("you have not changed anything");
    } else {
      attendant.id = props.profile.profile.attendatid;
      props.updateProfile(attendant);
    }
  };

  const [attendant, setAttendant] = useState({
    username: "",
    password: "",
  });
  const handleAttendantData = (e) => {
    setAttendant({
      ...attendant,
      [e.target.id]: e.target.value,
    });
    console.log(attendant);
  };

  // console.log(props.profile.profile);

  return (
    <div className="row">
      <NavBar titleone="Stock Count" />
      <div className="col s12 m12">
        <div className="card">
          <div className="card-content">
            <div className="container">
              <div className="col s12 m12">
                <span>Last Seen ~ 20 minutes ago</span>
              </div>
              <div className="row  valign-wrapper">
                <div className="col s6 m3">
                  <img
                    alt="test"
                    className="circle left responsive-img"
                    src="http://demo.geekslabs.com/materialize/v2.3/layout03/images/avatar.jpg"
                  />
                </div>
                <div className="col s6 m3">
                  <div className="row">
                    <div className="col s12">
                      <h6>Total Sales</h6>
                    </div>
                    <div className="col s12">
                      <h6 style={{ fontSize: 12 }}>200</h6>
                    </div>
                  </div>
                </div>
                <div className="col s6 m3">
                  <div className="row">
                    <div className="col s12">
                      <h6>Stocks</h6>
                    </div>
                    <div className="col s12">
                      <h6 style={{ fontSize: 12 }}>0</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-tabs">
            <ul className="tabs tabs-fixed-width">
              <li className="tab">
                <a href="#test4">Profile</a>
              </li>
              <li className="tab">
                <a href="#test6">Settings</a>
              </li>
            </ul>
          </div>
          <div className="card-content grey lighten-4">
            <div id="test4">
              <div className="container">
                <div className="row">
                  <form className="col s12" onSubmit={updateProfile}>
                    <div className="row">
                      <div className="col s12">
                        <p className="red-text">{error}</p>
                      </div>
                      <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input
                          id="username"
                          type="text"
                          placeholder="username"
                          onChange={handleAttendantData}
                          defaultValue={
                            props.profile.profile
                              ? props.profile.profile.username
                              : ""
                          }
                          className="validate"
                        />
                      </div>

                      <div className="input-field col s12">
                        <i className="material-icons prefix">lock</i>
                        <input
                          onChange={handleAttendantData}
                          id="password"
                          type="text"
                          className="validate"
                        />
                        <label htmlFor="password">password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 center">
                        <button className="btn btn-primary">
                          <i className="material-icons left ">save</i>Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div id="test6">
              <form className="col s12">
                <div className="switch">
                  <label>
                    <div className="row valign-wrapper">
                      <div className="col s8">
                        <h6>Sales notification </h6>
                      </div>
                      <div className="col s4">
                        <input
                          type="checkbox"
                          defaultChecked={
                            props.profile.profile
                              ? props.profile.profile.sales_notifications ===
                                "1"
                                ? true
                                : false
                              : false
                          }
                        />
                        <span className="lever"></span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="switch">
                  <label>
                    <div className="row valign-wrapper">
                      <div className="col s8">
                        <h6>Block fred </h6>
                      </div>
                      <div className="col s4">
                        <input
                          defaultChecked={
                            props.profile.profile
                              ? props.profile.profile.blocked == "1"
                                ? true
                                : false
                              : false
                          }
                          type="checkbox"
                        />
                        <span className="lever"></span>
                      </div>
                    </div>
                  </label>
                </div>
                <h6>Roles</h6>
                <div className="container">
                  <div className="row">
                    {props.profile.profile
                      ? props.profile.profile.roles.map((value, key) => (
                          <label className="col s6" key={key}>
                            <input
                              id={value["id"]}
                              name={value["name"]}
                              type="checkbox"
                              defaultChecked={value["action"]}
                              className="validate"
                            />
                            <span>{value["name"].split("_").join(" ")}</span>
                          </label>
                        ))
                      : ""}

                    {/* <label className="col s6">
                      <input type="checkbox" />
                      <span>Edit product</span>
                    </label>
                    <label className="col s6">
                      <input type="checkbox" />
                      <span>Add Stock</span>
                    </label>
                    <label className="col s6">
                      <input type="checkbox" />
                      <span>Sales</span>
                    </label>
                    <label className="col s6">
                      <input type="checkbox" />
                      <span>View Sales</span>
                    </label> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  profile: state.attendants,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getprofile: (id) => dispatch(getprofile(id)),
    updateProfile: (data) => dispatch(updateProfile(data)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Attendantprofile);
