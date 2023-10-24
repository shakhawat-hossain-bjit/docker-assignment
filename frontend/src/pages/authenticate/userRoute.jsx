import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import userAPI from "../../api/userAPI/userAPI";

const UserRoute = () => {
  const [userInfo, setUserInfo] = useState({});
  const { email, role, userName } = useSelector((state) => state.user);

  // useEffect(() => {
  //   setUserInfo({ email, role, userName });
  // }, [email]);
  // console.log("userInfo ", userInfo);

  return role == 2 ? <Outlet /> : <Navigate to="/" />;
};

export default UserRoute;
