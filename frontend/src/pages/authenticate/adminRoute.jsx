import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const [userInfo, setUserInfo] = useState({});
  const { email, role, userName, isLoadingUser } = useSelector(
    (state) => state.user
  );
  console.log(isLoadingUser, userInfo, role);

  useEffect(() => {
    setUserInfo({ role });
  }, [email, role, userName]);

  return role == 1 ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
