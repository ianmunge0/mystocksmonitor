import { GET_REPORTS, LOADING } from "../Actions/actions";
import { getOverlappingDaysInIntervals } from "date-fns/esm";
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
      console.log("state", state);
      var data = action.deletedstock
        ? {
            items: Object.keys(state.stocks.items).map((v) => {
              var arra = {};
              arra[v] = Object.keys(state.stocks.items[v]).map((vv) => {
                return state.stocks.items[v][vv];
              });
              console.log("arra", arra);
              return arra;
            }),
          }
        : action.item;
      return {
        ...state,
        stocks: data,
        loading: false,
      };
    default:
      return state;
  }
};
export default Reports;
