import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const jwt = true;

  return jwt ? page : <Navigate replace to="/login" />;
};

export default PrivateRoute;
