import React, { useEffect, useState } from "react";
import "./forgetPassword.style.scss";
import Loader from "../../../loader/loader";
import { axiosInstance } from "../../../utils/axiosCreate";
import { bottomEndToast } from "../../../utils/swalCreate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.user);
  useEffect(() => {
    if (userName) {
      navigate("/");
    }
  }, [userName]);

  const sendPasswordResetEmail = (e) => {
    console.log("sendPasswordResetEmail ", email);
    e.preventDefault();
    setIsLoading(true);
    axiosInstance
      .post("/auth/forget-password", { email })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        bottomEndToast.fire({ icon: "success", title: data.message });
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to send email.";
        }
        bottomEndToast.fire({ icon: "error", title: message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-container">
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      <form className="login-form">
        <h2>Forget Password</h2>
        {/* email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Enter Email"
            type="email"
            onKeyUp={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <input
            type="submit"
            value="Reset Password"
            onClick={(e) => sendPasswordResetEmail(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
