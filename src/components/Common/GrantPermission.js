import { reactLocalStorage } from "reactjs-localstorage";

export const grantPermission = (requestedRoles) => {
  const permittedRoles = reactLocalStorage.getObject("roles");
  const user_type = reactLocalStorage.get("user_type");
  var totalmatches = 0;

  if (requestedRoles === undefined) return true;
  if (requestedRoles.length === 0 || user_type === "admin") return true;
  if (permittedRoles.length > 0) {
    permittedRoles.map((value, index) => {
      requestedRoles.map((valuekey, key) => {
        if (valuekey === value) {
          totalmatches++;
        }
      });
    });
  }
  if (totalmatches > 0) {
    return true;
  } else {
    return false;
  }
};
