import { ADD_SUPPLIER, GET_SUPPLIERS, LOADING } from "../Actions/actions";
const initialState = {
  suppliers: [],
};

const Suppliers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      console.log("calling loading reducer");
      return {
        ...state,
        loading: true,
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

    default:
      return state;
  }
};
export default Suppliers;
