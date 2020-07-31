import { reactLocalStorage } from "reactjs-localstorage";
class Auth {
  constructor() {
    this.authenticated = reactLocalStorage.get("loggedin") ? true : false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    reactLocalStorage.clear();
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
