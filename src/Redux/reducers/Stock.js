import {
  ADD_STOCK,
  GET_STOCK,
  ADDING_STOCK,
  ADD_UNIT,
  GET_UNITS,
  ADD_SUPPLIER,
  GET_SUPPLIERS,
  LOADING,
  GET_SINGLE_ITEM,
  UPDATE_STOCK_COUNT,
} from "../Actions/actions";
const initialState = {
  stock: [],
  stocks: [],
  loading: true,
};

const Stock = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_STOCK_COUNT:
      return {
        ...state,
        stocks: action.stocks,
        loading: false,
      };
    case GET_SINGLE_ITEM:
      return {
        ...state,
        stock: action.updateresponse,
        loading: false,
      };
    case GET_STOCK:
      return {
        ...state,
        stocks: action.stocks,
        loading: false,
      };
    case ADD_STOCK:
      return {
        ...state,
        stockresponse: action.stockrespose,
        loading: false,
      };
    case ADD_UNIT:
      return {
        ...state,
        units: action.units,
        loading: false,
      };
    case ADD_SUPPLIER:
      return {
        ...state,
        suppliers: action.suppliers,
        loading: false,
      };
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.suppliers,
        loading: false,
      };
    case GET_UNITS:
      return {
        ...state,
        units: action.units,
        loading: false,
      };
    case ADDING_STOCK:
      // console.log("dd ", action.loading);

      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
export default Stock;
