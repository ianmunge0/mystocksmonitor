import { ADD_SALES, GET_SALES, LOADING } from "../Actions/actions";
const initialState = {
  sales: [],
  total: 0,
  credit: [],
  cash: [],
  receipts: [],
  loading: true,
};

const Sales = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SALES:
      return {
        ...state.receipts,
        receipts: action.receipts,
        loading: false,
      };
    case "GET_RECEIPTS":
      return {
        ...state,
        receipts: action.receipts,
        loading: false,
      };
    case "CLEAR_SALES_RECEIPT":
      return {
        ...state,
        sales: [],
        total: 0,
        credit: [],
        cash: [],
      };
    case "REMOVE_QTY":
      // var newqty = item.quantity - 1 < 1 ? 1 : item.quantity - 1;
      return {
        ...state,
        sales: state.sales.map((item, index) =>
          item.serialno === action.sales.serialno
            ? {
                ...state.sales[index],
                quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1,
                total:
                  (item.quantity - 1 < 1 ? 1 : item.quantity - 1) *
                  parseInt(action.sales.sellingprice),
              }
            : state.sales[index]
        ),
        total: state.sales.map(
          (item) =>
            item.quantity *
            parseInt(
              item.salessellingprice
                ? item.salessellingprice
                : item.sellingprice
            )
        ),
      };
    case "ADD_QTY":
      return {
        ...state,
        sales: state.sales.map((item, index) =>
          item.serialno === action.sales.serialno
            ? {
                ...state.sales[index],
                quantity:
                  item.quantity + 1 > item.stock_qty
                    ? item.stock_qty
                    : item.quantity + 1,
                total:
                  (item.quantity + 1 > item.stock_qty
                    ? item.stock_qty
                    : item.quantity + 1) * parseInt(action.sales.sellingprice),
              }
            : state.sales[index]
        ),
        total: state.sales.map(
          (item) =>
            item.quantity *
            parseInt(
              item.salessellingprice
                ? item.salessellingprice
                : item.sellingprice
            )
        ),
      };
    case "CHANGE_TYPE":
      var creditcount = state.sales.filter((item) => item.type === "credit");
      var cashcount = state.sales.filter((item) => item.type === "cash");
      return {
        ...state,
        credit: creditcount.length,
        cash: cashcount.length,
      };
    case "CHANGE_QTY":
      console.log("CHANGE_QTY");
      return {
        ...state,
        sales: state.sales.map((item, index) =>
          item.serialno === action.sales.serialno
            ? {
                ...state.sales[index],
                quantity: item.quantity,
                total: item.quantity * parseInt(action.sales.sellingprice),
              }
            : state.sales[index]
        ),
      };
    case "REMOVE_ITEM":
      var items = state.sales.filter(
        (item) => item.serialno !== action.sales.serialno
      );
      if (items.length == 0) {
        return {
          ...state,
          sales: [],
          total: 0,
          credit: [],
          cash: [],
        };
      }
      return {
        ...state,
        sales: items,
        total: items.map(
          (item) =>
            item.quantity *
            parseInt(
              item.salessellingprice
                ? item.salessellingprice
                : item.sellingprice
            )
        ),
      };
    case "CHANGE_PRICE":
      console.log("CHANGE_PRICE ");
      return {
        ...state,
        sales: state.sales.map((item, index) =>
          item.serialno === action.sales.serialno
            ? {
                ...state.sales[index],
                total: item.quantity * parseInt(action.sales.salessellingprice),
              }
            : state.sales[index]
        ),
        total: state.sales.map(
          (item) =>
            item.quantity *
            parseInt(
              item.salessellingprice
                ? item.salessellingprice
                : item.sellingprice
            )
        ),
      };
    case ADD_SALES:
      var price = action.sales.salessellingprice
        ? parseInt(action.sales.salessellingprice)
        : parseInt(action.sales.sellingprice);

      let existed_item = state.sales.find(
        (item) => action.sales.serialno === item.serialno
      );
      if (existed_item) {
        return {
          ...state,
          sales: state.sales.map((item, index) =>
            item.serialno === action.sales.serialno
              ? {
                  ...state.sales[index],
                  quantity: item.quantity + 1,
                  total:
                    (item.quantity + 1) *
                    parseInt(
                      state.sales[index].salessellingprice
                        ? state.sales[index].salessellingprice
                        : state.sales[index].sellingprice
                    ),
                }
              : state.sales[index]
          ),
          total: state.total + parseInt(price),
        };
      } else {
        return {
          ...state,
          sales: [...state.sales, action.sales],
          total: state.total + parseInt(price),
          credit: [...state.sales, action.sales].filter(
            (item) => item.type === "credit"
          ).length,
          cash: [...state.sales, action.sales].filter(
            (item) => item.type === "cash"
          ).length,
        };
      }
    default:
      return state;
  }
};
export default Sales;
