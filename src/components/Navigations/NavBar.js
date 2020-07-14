import React, { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link, withRouter } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { connect } from "react-redux";
import { logout } from "../../Redux/Actions";
// import { Navbar } from "react-materialize";
// import { hashHistory } from "react-router";
// import { useHistory } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import { BrowserHistory } from "react-router";
// import { useHistory } from "react-router-dom";

function NavBar(props) {
  // const loggedout = useSelector((state) => state);

  useEffect(() => {
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250,
    });
  }, []);

  // const dispatch = useDispatch();

  console.log(props.logoutres);

  const uiLogout = () => {
    props.history.push("/");
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250,
    });
    props.logout();
  };

  return (
    <nav>
      <div className="container">
        <div className="row">
          {/* <div className="col s4 hide-on-med-and-down">
              <a href="#!" className="brand-logo ">
                My Profile
              </a>
            </div> */}
          <div className="col s8 ">
            {props.history.location.pathname !== "/dashboard" &&
            props.history.location.pathname !== "/" ? (
              <Link
                to=""
                onClick={() => {
                  // console.log(props.history);

                  props.history.goBack();
                }}
              >
                <i className="material-icons" style={{ fontSize: 60 }}>
                  keyboard_arrow_left
                </i>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="nav-wrapper">
        <ul id="slide-out" className="sidenav">
          <li className="center-align">
            <div className="user-view">
              <a href="#user" className="profile-image">
                <img
                  className="circle profile"
                  src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/4080540331548233623-512.png"
                  alt=""
                />
                <i className="material-icons edit-icon">edit</i>
              </a>
              <a href="#name" className="text-black">
                <span className="name">
                  {reactLocalStorage.getObject("userdata").username}
                </span>
              </a>
              <a href="#email">
                <span className="email">
                  {reactLocalStorage.getObject("userdata").emailorphone_}
                </span>
              </a>
            </div>
          </li>
          <li>
            <a href="#!">
              <i className="material-icons">edit</i>EDIT PROFILE
            </a>
          </li>
          <li>
            <Link
              to="!#"
              onClick={() => {
                uiLogout();
              }}
            >
              <i className="material-icons">lock</i>LOGOUT
            </Link>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            <a href="/" className="subheader">
              My Shops
            </a>
          </li>
          <li>
            <a className="waves-effect" href="#!">
              Shop One
            </a>
          </li>
        </ul>
        {props.history.location.pathname === "/dashboard" ? (
          <a href="!#" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  logoutres: state.login,
});

const mapDispacthToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(withRouter(NavBar));

// export default withRouter(NavBar);
