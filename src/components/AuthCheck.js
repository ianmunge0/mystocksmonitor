import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { login } from "../Redux/Actions";
import { connect } from "react-redux";
import { createHashHistory } from "history";

const browserHistory = createHashHistory();
function AuthCheck(props) {
  console.log("auth ", props);
  useEffect(() => {
    const { dispatch, currentURL } = this.props;
    browserHistory.replace("/login");
    // if (!isLoggedIn) {
    // set the current url/path for future redirection (we use a Redux action)
    // then redirect (we use a React Router method)
    // dispatch(setRedirectUrl(currentURL));
    // browserHistory.replace("/login");
    // }
  }, []);

  return (
    <div>
      <h5>sdfsdfs</h5>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedin: state.login.loggedin,
});
export default connect(mapStateToProps)(AuthCheck);
