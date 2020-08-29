import { LOADING } from "../Actions/actions";
const initialState = {
  stocksin: [],
  total: 0,
  credit: [],
  cash: [],
  receipts: [],
  loading: true,
  stocks: [],
};

const StocksIn = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case "GET_STOCKS_IN":
      return {
        ...state,
        stocks: action.deletedstock
          ? state.stocks.filter((v) => {
              if (v !== action.deletedstock) {
                return v !== action.deletedstock;
              }
            })
          : action.stocksin,
        loading: false,
      };
    case "ADD_STOCKIN":
      console.log("state.stocksin", state);

      var price = action.stocksin.stockinbuyingprice
        ? parseInt(action.stocksin.stockinbuyingprice)
        : parseInt(action.stocksin.buyingprice);
      let existed_item = state.stocksin.find(
        (item) => action.stocksin.serialno === item.serialno
      );
      if (existed_item) {
        return {
          ...state,
          stocksin: state.stocksin.map((item, index) =>
            item.serialno === action.stocksin.serialno
              ? {
                  ...state.stocksin[index],
                  quantity: item.quantity + 1,
                  total:
                    (item.quantity + 1) *
                    (state.stocksin[index].stockinbuyingprice
                      ? state.stocksin[index].stockinbuyingprice
                      : state.stocksin[index].buyingprice),
                }
              : state.stocksin[index]
          ),
          total: state.total + price,
        };
      } else {
        return {
          ...state,
          stocksin: [...state.stocksin, action.stocksin],
          total: state.total + price,
          credit: [...state.stocksin, action.stocksin].filter(
            (item) => item.type === "credit"
          ).length,
          cash: [...state.stocksin, action.stocksin].filter(
            (item) => item.type === "cash"
          ).length,
        };
      }
    case "CLEAR_STOCKIN":
      return {
        ...state,
        stocksin: [],
        total: 0,
        credit: [],
        cash: [],
      };
    case "REMOVE_QTY":
      return {
        ...state,
        stocksin: state.stocksin.map((item, index) =>
          item.serialno === action.stocksin.serialno
            ? {
                ...state.stocksin[index],
                quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1,
                total:
                  (item.quantity - 1 < 1 ? 1 : item.quantity - 1) *
                  parseInt(action.stocksin.buyingprice),
              }
            : state.stocksin[index]
        ),
      };
    case "ADD_QTY":
      console.log("dispatch ", state.stocksin);
      return {
        ...state,
        stocksin: state.stocksin.map((item, index) =>
          item.serialno === action.stocksin.serialno
            ? {
                ...state.stocksin[index],
                quantity:
                  item.quantity + 1 > item.stock_qty
                    ? item.stock_qty
                    : item.quantity + 1,
                total:
                  (item.quantity + 1 > item.stock_qty
                    ? item.stock_qty
                    : item.quantity + 1) *
                  parseInt(action.stocksin.buyingprice),
              }
            : state.stocksin[index]
        ),
      };
    case "CHANGE_TYPE":
      var creditcount = state.stocksin.filter((item) => item.type === "credit");
      var cashcount = state.stocksin.filter((item) => item.type === "cash");
      return {
        ...state,
        credit: creditcount.length,
        cash: cashcount.length,
      };
    case "CHANGE_QTY":
      console.log("cprev item", state.stocksin);
      console.log("changing qty", action.stocksin);
      return {
        ...state,
        stocksin: state.stocksin.map((item, index) =>
          item.serialno === action.stocksin.serialno
            ? {
                ...state.stocksin[index],
                quantity: item.quantity,
                total: item.quantity * parseInt(action.stocksin.buyingprice),
              }
            : state.stocksin[index]
        ),
      };
    case "REMOVE_ITEM":
      var items = state.stocksin.filter(
        (item) => item.serialno !== action.stocksin.serialno
      );
      return {
        ...state,
        stocksin: items,
      };
    case "CHANGE_PRICE":
      return {
        ...state,
        stocksin: state.stocksin.map((item, index) =>
          item.serialno === action.stocksin.serialno
            ? {
                ...state.stocksin[index],
                total:
                  item.quantity * parseInt(action.stocksin.stockinbuyingprice),
              }
            : state.stocksin[index]
        ),
      };

    default:
      return state;
  }
};
export default StocksIn;
