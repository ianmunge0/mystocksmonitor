import { GET_REPORTS, LOADING } from "../Actions/actions";
const initialState = {
  stocks: [],
  loading: true,
};

const Reports = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_REPORTS:
      return {
        ...state,
        stocks: action.item,
        loading: false,
      };
    default:
      return state;
  }
};
export default Reports;
