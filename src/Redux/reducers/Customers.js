const initialState = {
  customers: [],
  loading: true,
  addingerror: "",
  searchedcustomers: [],
  copycustomers: [],
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
      //clone original
      let newState = {};
      let value = action.payload.text;
      let filteredValues = state.copycustomers.customers.filter((customer) => {
        return customer.name.includes(value);
      });
      if (value) {
        newState = filteredValues;
      } else {
        newState = state.copycustomers.customers;
      }
      return {
        ...state,
        customers: {
          customers: newState,
        },
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
        copycustomers: action.customers,
        loading: false,
      };
    default:
      return state;
  }
};
export default Customers;
