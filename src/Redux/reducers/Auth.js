import { LOG_IN, REG, LOG_OUT, LOADING } from "../Actions/actions";
const initialState = {
  loggedin: false,
  loading: false,
  userdata: [],
  logout: false,
  user_type: "admin",
};

const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOG_IN:
      console.log("login dispatch");
      return {
        ...state,
        userdata: action.userdata,
        loggedin: action.userdata.status,
        loading: false,
      };
    case REG:
      return {
        ...state,
        userdata: action.userdata,
        loggedin: action.userdata.status,
        loading: false,
      };
    case LOG_OUT:
      console.log("logged out redu");
      return { ...state, loading: false, logout: true };
    default:
      return state;
  }
};
export default AuthenticationReducer;
