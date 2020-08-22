import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";

export const addCustomer = (customer, event) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });

    customer.action = "add";
    console.log("Adding", customer);

    Api.get(`/customers.php`, {
      params: customer,
    })
      .then((res) => {
        const customers = res.data;
        console.log("ADDED customer", customers);

        dispatch({
          type: "ADDED_CUSTOMERS",
          customers,
        });
        event.reset();
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const updateCustomer = (data) => {
  return (dispatch) => {
    data.action = "update";
    console.log(data);

    Api.get(`/customers.php`, {
      params: data,
    })
      .then((res) => {
        const customer = res.data;
        console.log("updateCustomer actions ", customer);

        dispatch({
          type: "GET_CUSTOMER_PROFILE",
          customer,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const getcustomer = (id) => {
  return (dispatch) => {
    console.log({
      id,
      action: "customer_profile",
    });

    Api.get(`/customers.php`, {
      params: {
        id,
        action: "customer_profile",
      },
    })
      .then((res) => {
        const customer = res.data;
        console.log("getcustomer actions ", customer);

        dispatch({
          type: "GET_CUSTOMER_PROFILE",
          customer,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getCustomers = (action) => {
  return (dispatch) => {
    Api.get(`/customers.php`, {
      params: {
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        action,
      },
    })
      .then((res) => {
        const customers = res.data;
        console.log("getCustomers", customers);

        dispatch({
          type: "GET_CUSTOMERS",
          customers,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const deletePayment = (item) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });

    console.log({
      item: item,
      action: "delete",
    });
    Api.get(`/customers.php`, {
      params: {
        item: item,
        action: "delete_payment",
      },
    })
      .then((res) => {
        const receiptpayments = res.data;
        console.log("deletePayment", receiptpayments);

        dispatch({
          type: "GET_RECEIPT_PAYMENTS",
          receiptpayments,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getReceiptsPayment = (customer_id, receiptno) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });

    console.log({
      receiptno,
      customer_id,
      action: "receipt_payments",
    });
    Api.get(`/customers.php`, {
      params: {
        receiptno,
        customer_id,
        action: "receipt_payments",
      },
    })
      .then((res) => {
        const receiptpayments = res.data;
        dispatch({
          type: "GET_RECEIPT_PAYMENTS",
          receiptpayments,
        });
        console.log("getReceiptsPayment", receiptpayments);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const savePayment = (date_time, amount, customer_id, receiptno) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });

    Api.get(`/customers.php`, {
      params: {
        date_time: date_time,
        initialamount: amount,
        customer_id,
        receiptno,
        action: "save_payment",
      },
    })
      .then((res) => {
        const receiptpayments = res.data;
        dispatch({
          type: "GET_RECEIPT_PAYMENTS",
          receiptpayments,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
