import {
  GET_ATTENDANTS,
  ADDED_ATTENDANT,
  LOADING,
  GET_PROFILE,
} from "../Actions/actions";
const initialState = {
  attendants: [],
  loading: false,
  addingerror: "",
  status: true,
  msg: "",
};

const Attendants = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADDED_ATTENDANT:
      return {
        ...state,
        attendants: action.attendants.attendants,
        addingerror: action.attendants.message,
        loading: false,
      };
    case "GET_ADMIN_PROFILE":
      return {
        ...state,
        profile: action.profile,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.profile,
        status: action.profile.status && action.profile.status,
        msg: action.profile.msg && action.profile.msg,
        loading: false,
      };
    case GET_ATTENDANTS:
      return {
        ...state,
        attendants: action.attendants,
        loading: false,
      };
    default:
      return state;
  }
};
export default Attendants;
