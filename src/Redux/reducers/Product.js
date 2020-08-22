const initialState = {
  summary: [],
  loading: true,
  productsales: [],
};

const ProductSummary = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "GET_PRODUCT_STOCK_IN":
      return {
        ...state,
        productstockin: action.productstockin,
        loading: false,
      };
    case "GET_PRODUCT_SALE":
      return {
        ...state,
        productsales: action.productsales,
        loading: false,
      };
    case "GET_PRODUCT_SUMMARY":
      return {
        ...state,
        summary: action.summary,
        loading: false,
      };
    default:
      return state;
  }
};
export default ProductSummary;
