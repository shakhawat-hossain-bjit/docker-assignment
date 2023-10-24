import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CommonRoute = () => {
  const [userInfo, setUserInfo] = useState({});
  const { email, role, userName } = useSelector((state) => state.user);

  // useEffect(() => {
  //   setUserInfo({ email, role, userName });
  // }, [email]);
  // console.log("userInfo ", userInfo);

  return email ? <Outlet /> : <Navigate to="/" />;
};

export default CommonRoute;
