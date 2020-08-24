const initialState = {
  customers: [],
  loading: true,
  addingerror: "",
  searchedcustomers: [],
  payments: [],
};

const Customers = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOPLOADING":
      return {
        ...state,
        loading: false,
      };
    case "PAYMENT_DELETED":
      return {
        ...state,
        payments: action.payments,
        loading: false,
      };
    case "SEARCH_CUSTOMER":
      console.log("vb", action.payload);
      // return state;
      return {
        ...state,
        customers: {
          customers: action.payload.customers.customers.filter((p) =>
            p.name.includes(action.payload.text)
          ),
        },
        // customers: state.customers.customers.filter(
        //   (value) => value.name === action.payload
        // ),
        loading: false,
      };
    case "ADDED_CUSTOMERS":
      return {
        ...state,
        customers: action.customers.customers,
        addingerror: action.customers.message,
        loading: false,
      };

    case "GET_CUSTOMER_PROFILE":
      return {
        ...state,
        customer: action.customer,
        loading: false,
      };
    case "GET_RECEIPT_PAYMENTS":
      return {
        ...state,
        receiptpayments: action.receiptpayments,
        loading: false,
      };
    case "GET_CUSTOMERS":
      console.log("GET_CUSTOMERS ", action.customers);
      return {
        ...state,
        customers: action.customers,
        loading: false,
      };
    default:
      return state;
  }
};
export default Customers;
