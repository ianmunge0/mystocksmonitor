import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { getAttendants, addAttendant } from "../../Redux/Actions/Attendants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navigations/NavBar";
import { Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import { reactLocalStorage } from "reactjs-localstorage";

function Attendants(props) {
  useEffect(() => {
    M.Tabs.init(document.querySelector(".tabs"), {
      swipeable: true,
    });
    M.FormSelect.init(document.querySelectorAll("select"), {});
    props.getAttendants(reactLocalStorage.getObject("userdata").default_shop);
  }, []);

  const [error, setError] = useState();
  var errortxt = "";
  const [attendant, setAttendant] = useState({
    attendant_name: "",
    attendant_password: "",
  });
  const allRoles = [
    { id: "1", name: "edit" },
    { id: "2", name: "add" },
    { id: "3", name: "sales" },
    { id: "4", name: "reports" },
  ];
  const [roles, setRoles] = useState();
  const addAttendant = (e) => {
    e.preventDefault();
    attendant.roles = roles;
    attendant.shopid = reactLocalStorage.getObject("userdata").default_shop;
    props.addAttendant(attendant);
  };

  const handleAttendantRoles = (e, role) => {
    var isChecked = e.target.checked;
    var item = e.target.value;
    setRoles((prevState) => ({
      roles: prevState.roles.set(item, isChecked),
    }));
  };

  const handleAttendantData = (e) => {
    setAttendant({
      ...attendant,
      [e.target.id]: e.target.value,
    });
    console.log(attendant);
  };

  console.log(props.attendants);

  return (
    <div className="row">
      {/* <NavBar titleone="Attendants" /> */}
      <ul id="tabs-swipe-demo" className="tabs">
        <li className="tab col s4">
          <a className="active" href="#test-swipe-1">
            <span>All Attendants</span>
          </a>
        </li>
        <li className="tab col s4">
          <a href="#test-swipe-2">New Attendant</a>
        </li>
      </ul>

      <div id="test-swipe-1" className="col s12">
        <div className="container">
          <Loader fullPage loading={props.attendants.loading} />
          <div className="row">
            {props.attendants.attendants.length == 0 ? (
              <p className="center">
                You have not added any attendant in this shop
              </p>
            ) : (
              ""
            )}
            <ul
              className="collection"
              style={{ height: 400, overflow: "scroll" }}
            >
              {props.attendants.attendants.length > 0
                ? props.attendants.attendants.map((value, index) => (
                    <Link
                      to={`/attendantsprofile/${value.shopserial_key}`}
                      className="collection-item avatar"
                      key={index}
                    >
                      <div className="col s10">
                        <i className="material-icons circle">folder</i>
                        <span className="title">{value.username}</span>
                        <p>
                          role ~{" "}
                          {value.roles
                            ? value.roles.reduce((result, item) => {
                                return `${result}${item.name
                                  .split("_")
                                  .join(" ")}, `;
                              }, "")
                            : ""}{" "}
                          <br />
                        </p>
                      </div>
                      <div className="col s2">
                        <i className="material-icons right ">more_vert</i>
                      </div>
                    </Link>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
      <div id="test-swipe-2" className="col s12">
        <div className="container">
          <div className="row">
            <form className="col s12" onSubmit={addAttendant}>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    onChange={handleAttendantData}
                    id="attendant_name"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="attendant_name">username</label>
                </div>
              </div>
              <div className="row">
                <i className="material-icons valign-wrapper center-align col s2">
                  lock
                </i>
                <div className="input-field col s10">
                  <div className="row">
                    {allRoles.map((value, key) => (
                      <label className="col s6" key={key}>
                        <input
                          // onClick={(e) => handleAttendantRoles(e, value.name)}
                          id={value.id}
                          name={value.name}
                          type="checkbox"
                          className="validate"
                        />
                        <span>{value.name}</span>
                      </label>
                    ))}
                    {/* <label className="col s6">
                      <input
                        onClick={handleAttendantRoles}
                        id="edit"
                        type="checkbox"
                        className="validate"
                      />
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
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input
                    onChange={handleAttendantData}
                    id="attendant_password"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="attendant_password">password</label>
                </div>
              </div>
              <div className="row">
                <p className="red-text" style={{ marginLeft: 20 }}>
                  {props.attendants.addingerror}
                </p>
                <div className="input-field col s12 center">
                  <button className="btn btn-primary">
                    <i className="material-icons left ">save</i>Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  attendants: state.attendants,
  error: state.attendants.ddingerror,
});

const mapDispacthToProps = (dispatch) => {
  return {
    getAttendants: (shopid) => dispatch(getAttendants(shopid)),
    addAttendant: (attendant) => dispatch(addAttendant(attendant)),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Attendants);
