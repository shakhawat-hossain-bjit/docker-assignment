import React, { useEffect, useRef, useState } from "react";
import "./register.style.scss";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/passwordInput";
import userAPI from "../../api/userAPI/userAPI";
import { useSelector } from "react-redux";
import { bottomEndToast } from "../../utils/swalCreate";
import Loader from "../../loader/loader";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = userAPI();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.user);

  useEffect(() => {
    if (email) {
      navigate("/");
    }
  }, [email]);

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
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      userName: "",
    },
  });

  const handleRegister = (data) => {
    // console.log(data);
    const registerInfo = {
      email: getValues("email"),
      phone: getValues("phone"),
      password: getValues("password"),
      confirmPassword: getValues("confirmPassword"),
      userName: getValues("userName"),
    };
    setIsLoading(true);
    registerUser(registerInfo)
      .then((data) => {
        // console.log(data?.data);
        alert("successfully register the user, check email");
        reset({
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          userName: "",
        });

        bottomEndToast.fire({
          icon: "success",
          title: "Successfully registered the user",
        });
      })
      .catch((e) => {
        // console.log(e);

        // if (e?.response?.statusText == "Conflict") {
        //   if (
        //     e?.response?.data?.error?.some((obj) => obj.path === "userName")
        //   ) {
        //     setError("userName", {
        //       type: "manual",
        //       message: "userName is not available",
        //     });
        //   }

        //   if (e?.response?.data?.error?.some((obj) => obj.path === "email")) {
        //     setError("email", {
        //       type: "manual",
        //       message: "email is not available",
        //     });
        //   }
        // }

        console.log(e);
        let message = "";
        if (e?.response?.data?.message) {
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
      });
  };

  return (
    <div className="register-container">
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="register-form"
        autoComplete="off"
      >
        <h2>User Registartion</h2>

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

        <div>
          <label htmlFor="userName">User Name:</label>
          <Controller
            name="userName"
            control={control}
            rules={{
              required: "User name must be provided",
              maxLength: {
                value: 15,
                message: "Maximum length is 15",
              },
              minLength: {
                value: 5,
                message: "Minimum length is 5",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter User Name"
                {...field}
                type="text"
                style={{
                  border: errors?.userName ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span
            className={`${
              errors?.userName?.message
                ? "error-message-visible"
                : "error-message"
            }`}
          >
            {" "}
            *{errors?.userName?.message}{" "}
          </span>
        </div>

        <div>
          <label htmlFor="phone">Phone Number:</label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number must be provided",
              pattern: {
                value: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                message: "Invalid Phone number",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter Phone Number"
                {...field}
                type="text"
                style={{
                  border: errors?.phone ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span
            className={`${
              errors?.phone?.message ? "error-message-visible" : "error-message"
            }`}
          >
            {" "}
            *{errors?.phone?.message}{" "}
          </span>
        </div>

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
              // <input
              //   placeholder="Enter Confirm Password"
              //   {...field}
              //   type="text"
              //   style={{
              //     border: errors?.confirmPassword ? "1px solid red" : "",
              //   }}
              // />
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

        <div className="register">
          <p>
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </div>

        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;
