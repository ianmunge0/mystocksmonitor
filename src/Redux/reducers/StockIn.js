import { LOADING } from "../Actions/actions";
const initialState = {
  stocksin: [],
  total: 0,
  credit: [],
  cash: [],
  receipts: [],
  loading: true,
  stocks: [],
  invoice: Math.floor(Math.random() * Math.floor(1000000)),
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
      console.log("ADD_STOCKIN", state);

      var price = action.stocksin.stockinbuyingprice
        ? parseInt(action.stocksin.stockinbuyingprice)
        : parseInt(action.stocksin.buyingprice);
      let existed_item = state.stocksin.find(
        (item) => action.stocksin.serialno === item.serialno
      );
      if (existed_item) {
        console.log("two");
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
          total: parseInt(state.total) + parseInt(price),
        };
      } else {
        console.log("one total ", parseInt(state.total) + parseInt(price));
        console.log("one state total ", state.total);
        console.log("one price ", price);
        return {
          ...state,
          stocksin: [...state.stocksin, action.stocksin],
          total: parseInt(state.total) + parseInt(price),
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
                  parseInt(action.stocksin.stockinbuyingprice),
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
                quantity: parseInt(item.quantity) + 1,
                total:
                  (item.quantity + 1) *
                  parseInt(action.stocksin.stockinbuyingprice),
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
                total:
                  item.stockinbuyingprice * parseInt(action.stocksin.quantity),
              }
            : state.stocksin[index]
        ),
        total: state.stocksin.map(
          (item) => item.quantity * parseInt(action.stocksin.stockinbuyingprice)
        ),
      };
    case "REMOVE_ITEM":
      console.log("REMOVE_ITEM ", action.stocksin);
      var items = state.stocksin.filter(
        (item) => item.serialno !== action.stocksin.serialno
      );
      console.log("REMOVE_ITEM items ", items);
      return {
        ...state,
        stocksin: items,
        total:
          state.total -
          parseInt(action.stocksin.stockinbuyingprice) *
            parseInt(action.stocksin.quantity),
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
        total: state.stocksin.map(
          (item) => item.quantity * parseInt(action.stocksin.stockinbuyingprice)
        ),
      };

    default:
      return state;
  }
};
export default StocksIn;
