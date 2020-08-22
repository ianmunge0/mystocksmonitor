import api from "./api";
const getCustomers = () => {
  return api.get("customers");
};
