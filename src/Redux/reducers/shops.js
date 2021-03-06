import {
  GET_SHOPS,
  ADDED_SHOP,
  LOADING,
  GET_SHOP,
  SET_DEFAULT,
} from "../Actions/actions";
const initialState = {
  shops: [],
  loading: false,
  addingerror: "",
  currentshop: null,
};

const Shops = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_SHOP:
      return {
        // ...state,
        shop: action.shop,
        loading: false,
      };
    case ADDED_SHOP:
      return {
        ...state,
        shops: action.shops.shops,
        addingerror: action.shops.error,
        loading: false,
      };
    case SET_DEFAULT:
      return {
        ...state,
        loading: false,
        currentshop: action.currentshop,
      };
    case GET_SHOPS:
      return {
        ...state,
        shops: action.shops,
        loading: false,
      };
    case GET_SHOPS:
      return {
        ...state,
        shops: action.shops,
        loading: false,
      };
    default:
      return state;
  }
};
export default Shops;
