import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./balance.style.scss";
import useWalletHook from "../../hooks/wallet/useWalletHook";
import { Controller, useForm } from "react-hook-form";
import { bottomEndToast } from "../../utils/swalCreate";
import { redirect, useNavigate } from "react-router-dom";

const Balance = () => {
  const navigate = useNavigate();
  const { email, role, userName, userId } = useSelector((state) => state.user);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: "",
      amount: "",
    },
  });
  const { updateBalance, isLoadingUpdate, updateMessage, updateSuccess } =
    useWalletHook();

  const rechargeAmount = (data) => {
    const obj = {
      amount: getValues("amount"),
    };
    console.log(obj);
    updateBalance(obj);
  };

  useEffect(() => {
    setValue("userName", userName);
  }, [userName]);

  useEffect(() => {
    if (isLoadingUpdate == false && updateSuccess) {
      let icon = updateSuccess ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: updateMessage,
      });
    }
    if (updateSuccess) {
      navigate("/profile");
    }
  }, [isLoadingUpdate, updateMessage, updateSuccess]);

  return (
    <div className="wallet-form-container">
      <form
        onSubmit={handleSubmit(rechargeAmount)}
        className="wallet-form"
        autoComplete="off"
      >
        <h2>Add Money</h2>
        {/* user name */}
        <div>
          <label htmlFor="userName">User Name:</label>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <input
                placeholder="Enter user name"
                {...field}
                type="text"
                style={{
                  border: errors?.userName ? "1px solid red" : "",
                }}
                disabled
              />
            )}
          />
        </div>

        {/* balance */}
        <div>
          <label htmlFor="amount">Add Balance:</label>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "amount is required",
              min: {
                value: 100,
                message: " minimum value is 100",
              },
              max: {
                value: 2000,
                message: " maximum value is 2000",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter amount"
                {...field}
                type="number"
                style={{
                  border: errors?.amount ? "1px solid red" : "",
                }}
              />
            )}
          />

          <span
            className={`${
              errors?.amount?.message
                ? "error-message-visible"
                : "error-message"
            }`}
          >
            *{`${errors?.amount?.message}`}
          </span>
        </div>

        <div className="recharge-btn-container">
          <input
            type="submit"
            value="Recharge"
            disabled={isLoadingUpdate ? true : false}
          />
        </div>
      </form>
    </div>
  );
};

export default Balance;
