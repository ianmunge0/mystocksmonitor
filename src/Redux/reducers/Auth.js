import { LOG_IN, REG } from "../Actions/actions";
const initialState = {
  loggedin: false,
  loading: true,
  userdata: null,
};

const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loggedin: true, loading: false };
    case REG:
      return {
        ...state,
        userdata: action.userdata,
        loggedin: action.userdata.status,
        loading: false,
      };
    default:
      return state;
  }
};
export default AuthenticationReducer;
