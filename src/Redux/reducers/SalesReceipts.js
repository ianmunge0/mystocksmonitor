import { GET_RECEIPTS, LOADING } from "../Actions/actions";
const initialState = {
  total: 0,
  credit: [],
  cash: [],
  receipts: [],
  loading: true,
};

const Receipts = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_RECEIPTS:
      return {
        ...state.receipts,
        receipts: action.receipts,
        loading: false,
      };
    default:
      return state;
  }
};
export default Receipts;
