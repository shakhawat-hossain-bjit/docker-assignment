import React, { useEffect, useState } from "react";
import "./logIn.style.scss";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/passwordInput";
import userAPI from "../../api/userAPI/userAPI";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/loader";
import {
  loadingFinishedReducer,
  logInReducer,
} from "../../store/slices/userReducer";
import { bottomEndToast } from "../../utils/swalCreate";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { email, isLoadingLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (email) {
      navigate("/");
    }
  }, [email]);

  const { logInUser } = userAPI();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data) => {
    // console.log(data);
    setIsLoading(true);
    logInUser({ email: getValues("email"), password: getValues("password") })
      .then((data) => {
        // console.log(data?.data);
        bottomEndToast.fire({
          icon: "success",
          title: "Logged in successfully",
        });
        navigate("/");
        dispatch(logInReducer(data?.data));
      })
      .catch((e) => {
        console.log(e);
        let message = "";
        if (e?.response?.data?.message) {
          // console.log("Error: ", e?.response?.data?.message);
          message = e?.response?.data?.message;
        } else {
          message = "Failed to log in!";
        }
        bottomEndToast.fire({
          icon: "error",
          title: message,
        });
      })
      .finally(() => {
        setIsLoading(false);
        dispatch(loadingFinishedReducer("isLoadingLogin"));
      });
  };

  // console.log("isLoading ", isLoading);

  return (
    <div className="login-container">
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="login-form"
        autoComplete="off"
      >
        <h2>User Login</h2>
        {/* email */}
        <div>
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "email must be provided",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Invalid email",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter Email"
                {...field}
                type="text"
                style={{
                  border: errors?.email ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span
            className={`${
              errors?.email?.message ? "error-message-visible" : "error-message"
            }`}
          >
            {" "}
            *{errors?.email?.message}{" "}
          </span>
        </div>
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
              // <input
              //   placeholder="Enter Password"
              //   {...field}
              //   type="text"
              //   style={{
              //     border: errors?.password ? "1px solid red" : "",
              //   }}
              // />
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
        <div className="register">
          <p>
            Don't have an account? <Link to="/register">Register</Link>{" "}
          </p>
        </div>
        <div className="register">
          <p>
            Forget Password? <Link to="/forget-password">Reset Password</Link>{" "}
          </p>
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
