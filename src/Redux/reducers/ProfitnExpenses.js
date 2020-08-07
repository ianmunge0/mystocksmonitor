import { LOADING } from "../Actions/actions";
const initialState = {
  stocks: [],
  loading: true,
  profitnexpense: [],
  todayexpenses: [],
};

const ProfitnExpenses = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case "TODAY_EXPENSES":
      console.log("TODAY_EXPENSES ", action);
      return {
        ...state,
        todayexpenses: action.response,
        loading: false,
      };
    case "GET_EXPENSES":
      console.log("GET_EXPENSES ", action);
      return {
        ...state,
        profitnexpense: action.response,
        loading: false,
      };
    case "FILTER_SALES":
      console.log("action ", action);
      return {
        ...state,
        profitnexpense: action.payload.items.filter((
          p //console.log(p)
        ) => p.name.includes(action.payload.text)),
        loading: false,
      };
    default:
      return state;
  }
};
export default ProfitnExpenses;

// items: state.stockcounthistory.items.filter((p) =>
// p.name.includes(action.string)
// ),
