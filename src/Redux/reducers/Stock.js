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
  GET_STOCK_COUNT_GROUPED,
  GET_COUNT_HISTORY,
  STOCK_FILTER,
} from "../Actions/actions";
const initialState = {
  stock: [],
  stocks: [],
  stockcounts: [],
  stockcounthistory: [],
  filteredstocks: [],
  loading: true,
  stockloading: true,
  stockscopy: [],
};

const Stock = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      console.log("calling loading reducer");
      return {
        ...state,
        loading: true,
      };
    case STOCK_FILTER:
      console.log("filter string ", state.stockcounthistory);
      return {
        ...state,
        stockcounthistory: {
          title: state.stockcounthistory.title,
          over_stocked: state.stockcounthistory.over_stocked,
          under_stocked: state.stockcounthistory.under_stocked,
          items: state.stockcounthistory.items.filter(
            (p) =>
              p.name.includes(action.string) ||
              (p.partno && p.partno.includes(action.string))
          ),
        },
      };
    case GET_COUNT_HISTORY:
      return {
        ...state,
        stockcounthistory: action.stocks,
        loading: false,
      };
    case GET_STOCK_COUNT_GROUPED:
      return {
        ...state,
        stockcounts: action.stocks,
        loading: false,
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
        item: action.item,
        loading: false,
      };

    case "GET_BAD_STOCKS":
      return {
        ...state,
        stocks: action.stocks,
        loading: false,
      };
    // case "UPDATE_STOCK":
    //   return {
    //     ...state,
    //     stocks: {
    //       stock_qty : state.stocks.filter((item)=> {
    //         if(item.stockserial_key === )
    //       })
    //     },
    //     loading: false,
    //   };
    case "GET_STOCK_FILTER":
      let newState = {};
      console.log("GET_STOCK_FILTER", state);
      let value = action.payload.text;
      let filteredValues = state.stockscopy.filter((stock) => {
        return (
          stock.name.includes(value) ||
          (stock.partno && stock.partno.includes(value))
        );
      });
      if (value) {
        newState = filteredValues;
      } else {
        newState = state.stockscopy;
      }

      return {
        ...state,
        stocks: newState,
        loading: false,
      };
    case GET_STOCK:
      return {
        ...state,
        stocks: action.stocks,
        stockscopy: action.stocks,
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
    case "EXPORT_ITEMS":
      return {
        ...state,
        exporteditems: action.exporteditems,
        loading: false,
      };
    case GET_UNITS:
      return {
        ...state,
        units: action.units,
        loading: false,
      };
    case ADDING_STOCK:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
export default Stock;
