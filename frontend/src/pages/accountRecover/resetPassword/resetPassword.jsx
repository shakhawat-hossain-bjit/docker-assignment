import React, { useEffect, useState } from "react";
import "./resetPassword.style.scss";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "../../../components/passwordInput/passwordInput";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axiosCreate";
import { bottomEndToast } from "../../../utils/swalCreate";
import Loader from "../../../loader/loader";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, authId } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful },
    getValues,
    setValue,
    setError,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { userName } = useSelector((state) => state.user);
  useEffect(() => {
    if (userName) {
      bottomEndToast.fire({
        icon: "warning",
        title: "You are already logged in",
      });
      navigate("/");
    }
  }, [userName]);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .post(`/auth/check-token`, { token, authId })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        // bottomEndToast.fire({ icon: "success", title: data.message });
      })
      .catch((e) => {
        console.log(e);
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to process your request!";
        }
        bottomEndToast.fire({ icon: "error", title: message });
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleResetPassword = (data) => {
    const resetInfo = {
      password: getValues("password"),
      confirmPassword: getValues("confirmPassword"),
    };
    resetInfo.token = token;
    resetInfo.authId = authId;

    console.log("resetInfo ", resetInfo);

    setIsLoading(true);

    axiosInstance
      .post("/auth/reset-password", resetInfo)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        bottomEndToast.fire({ icon: "success", title: data.message });
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to update password!";
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

      <form className="login-form" onSubmit={handleSubmit(handleResetPassword)}>
        <h2>Reset Password</h2>
        {/* password */}
        <div>
          <label htmlFor="password">Password:</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "password must be provided",
              minLength: {
                value: 8,
                message: "Minimum length must be 8",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
                message:
                  "Password must contain one special character, a capital letter, a digit ",
              },
            }}
            render={({ field }) => (
              <PasswordInput
                field={field}
                hints="Enter Password"
                error={errors.password}
              />
            )}
          />
          <span
            className={`${
              errors?.password?.message
                ? "error-message-visible"
                : "error-message"
            }`}
          >
            {" "}
            *{errors?.password?.message}{" "}
          </span>
        </div>

        {/* reset password */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Confirm Password  must be provided",
              minLength: {
                value: 8,
                message: "Minimum length must be 8",
              },
              validate: (value) =>
                value === watch("password") ||
                "Confirm password should match given password",
            }}
            render={({ field }) => (
              <PasswordInput
                field={field}
                hints="Enter Confirm Password"
                error={errors.confirmPassword}
              />
            )}
          />
          <span
            className={`${
              errors?.confirmPassword?.message
                ? "error-message-visible"
                : "error-message"
            }`}
          >
            {" "}
            *{errors?.confirmPassword?.message}{" "}
          </span>
        </div>

        <div>
          <input type="submit" value="Reset Password" />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
