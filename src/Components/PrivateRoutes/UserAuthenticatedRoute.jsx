import React from "react";
import { logOutFunction } from "../../Utils/Config";
// import { logOut } from "../Config/SmallFunctions";
 
const UserAuthenticatedRoute = ({ children }) => {
  let auth = sessionStorage.getItem("user");
  return <>{(auth != null) ? children : logOutFunction()}</>;
};

export default UserAuthenticatedRoute;
