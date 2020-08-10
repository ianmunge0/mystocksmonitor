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
    this.authenticated = false;
    reactLocalStorage.clear();
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
