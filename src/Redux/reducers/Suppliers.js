import { ADD_SUPPLIER, GET_SUPPLIERS, LOADING } from "../Actions/actions";
const initialState = {
  suppliers: [],
  unpaid: 0,
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
        suppliers: action.suppliers.suppliers,
        unpaid: action.suppliers.totalunpaid,
        nodebtors: action.suppliers.nodebtors,
        debtors: action.suppliers.debtors,
        suppliertotaldebt: action.suppliers.suppliertotaldebt,
        loading: false,
      };
    case "GET_SUPPLIER_PROFILE":
      return {
        ...state,
        supplier: action.supplier,
        loading: false,
      };
    case "GET_INVOICE_PAYMENTS":
      return {
        ...state,
        invoicepayments: action.invoicepayments,
        loading: false,
      };

    default:
      return state;
  }
};
export default Suppliers;
