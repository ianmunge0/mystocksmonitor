import React from "react";
import { grantPermission } from "./GrantPermission";

export const UnlockAccess = ({ children, request }) => {
  const permission = grantPermission(request); // request = ['ROLE_ADMIN'] / ['ROLE_USER'] / ['ROLE_MANAGER']
  return <>{permission && children}</>;
};
