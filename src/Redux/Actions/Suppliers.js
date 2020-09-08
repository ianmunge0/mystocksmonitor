import { ADD_SUPPLIER, GET_SUPPLIERS, LOADING } from "./actions";
import Api from "../../api/api";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";
export const getSuppliers = (action) => {
  return (dispatch) => {
    Api.get(`/supplier.php`, {
      params: {
        action: action,
        shopid: reactLocalStorage.getObject("userdata").default_shop,
      },
    })
      .then((res) => {
        console.log("database", res.data);
        dispatch({
          type: GET_SUPPLIERS,
          suppliers: res.data,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const deleteSupplier = (supplier, props) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    console.log({
      id: supplier,
      action: "delete",
      shopid: reactLocalStorage.getObject("userdata").serialno,
    });

    Api.get(`/supplier.php`, {
      params: {
        id: supplier,
        action: "delete",
        shopid: reactLocalStorage.getObject("userdata").serialno,
      },
    })
      .then((res) => {
        console.log(res.data);

        dispatch({
          type: GET_SUPPLIERS,
          suppliers: res.data.suppliers,
        });
        props.history.goBack();
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const saveSupplier = (supplier, e) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    Api.get(`/supplier.php`, {
      params: {
        supplier_name: supplier.name,
        supplier_phone: supplier.phone,
        action: "add",
        shopid: reactLocalStorage.getObject("userdata").default_shop,
      },
    })
      .then((res) => {
        console.log("saveSupplier", res.data);
        dispatch({
          type: GET_SUPPLIERS,
          suppliers: res.data,
        });
        e.reset();
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
    Api.get(`/supplier.php`, {
      params: {
        item: item,
        action: "delete_payment",
      },
    })
      .then((res) => {
        const invoicepayments = res.data;
        console.log("deletePayment", invoicepayments);

        dispatch({
          type: "GET_INVOICE_PAYMENTS",
          invoicepayments,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getReceiptsPayment = (invoiceno) => {
  return (dispatch) => {
    console.log("bb", {
      invoiceno,
      action: "invoice_payments",
    });

    dispatch({
      type: "LOADING",
    });

    Api.get(`/supplier.php`, {
      params: {
        invoiceno,
        action: "invoice_payments",
      },
    })
      .then((res) => {
        const invoicepayments = res.data;
        dispatch({
          type: "GET_INVOICE_PAYMENTS",
          invoicepayments,
        });
        console.log("getinvoicepayments", invoicepayments);
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const savePayment = (date_time, amount, supplier_id, invoiceno, e) => {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
    });
    console.log({
      date_time: date_time,
      initialamount: amount,
      supplier_id,
      invoiceno,
      action: "save_payment",
    });

    Api.get(`/supplier.php`, {
      params: {
        date_time: date_time,
        initialamount: amount,
        supplier_id,
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        invoiceno,
        action: "save_payment",
      },
    })
      .then((res) => {
        const invoicepayments = res.data;
        console.log("invoicepayments", invoicepayments);
        dispatch({
          type: "GET_INVOICE_PAYMENTS",
          invoicepayments,
        });
        e.reset();
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};

export const getsupplier = (id) => {
  return (dispatch) => {
    console.log({
      id,
      action: "supplier_profile",
    });

    Api.get(`/supplier.php`, {
      params: {
        id,
        action: "supplier_profile",
      },
    })
      .then((res) => {
        const supplier = res.data;
        console.log("getsupplier actions ", supplier);

        dispatch({
          type: "GET_SUPPLIER_PROFILE",
          supplier,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const updateSupplier = (data) => {
  return (dispatch) => {
    data.action = "update";
    console.log(data);

    Api.get(`/supplier.php`, {
      params: data,
    })
      .then((res) => {
        const supplier = res.data;
        console.log("updateSupplier actions ", supplier);

        dispatch({
          type: "GET_SUPPLIER_PROFILE",
          supplier,
        });
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
export const deleteInvoice = (invoiceno, props) => {
  return (dispatch) => {
    console.log("deleting invoice ", {
      invoiceno,
      action: "delete_invoice",
    });
    dispatch({
      type: "LOADING",
    });

    Api.get(`/supplier.php`, {
      params: {
        invoiceno,
        shopid: reactLocalStorage.getObject("userdata").default_shop,
        action: "delete_invoice",
      },
    })
      .then((res) => {
        const delete_invoice = res.data;
        console.log("delete_invoice ", delete_invoice);
        props.history.goBack();
      })
      .catch((error) => {
        // your error handling goes here}
        console.log("error", error);
      });
  };
};
