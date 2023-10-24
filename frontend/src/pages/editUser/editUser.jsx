import React, { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import useUserHook from "../../hooks/user/useUserHook";
import { Controller, useForm } from "react-hook-form";
import { bottomEndToast } from "../../utils/swalCreate";

const EditUser = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      userName: "",
      phone: "",
    },
  });

  const {
    getUserById,
    user,
    updateUser,
    isLoadingUpdate,
    updateMessage,
    updateSuccess,
  } = useUserHook();

  useEffect(() => {
    getUserById(id);
  }, [id]);

  useEffect(() => {
    setUserInfo(user);
    setValue("userName", user?.userName);
    setValue("email", user?.email);
    setValue("phone", user?.user?.phone);
    setRole(user?.role);
  }, [user]);

  const handleOnUpdate = (data) => {
    data.role = role;
    data.id = id;
    console.log(data);
    updateUser(data);
  };

  useEffect(() => {
    if (isLoadingUpdate == false && updateMessage) {
      let icon = updateSuccess ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: updateMessage,
      });
    }
    if (updateSuccess) {
      navigate("/dashboard/user");
    }
  }, [isLoadingUpdate, updateMessage, updateSuccess]);

  return (
    <div className="insert-product-form">
      <form onSubmit={handleSubmit(handleOnUpdate)}>
        <h2>Update User</h2>

        {/* userName */}
        <div>
          <label htmlFor="userName">User name:</label>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <input
                placeholder="Enter userName"
                {...field}
                type="text"
                disabled
                style={{
                  border: errors?.title ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.userName?.message}</span>
        </div>

        {/* email */}
        <div>
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                placeholder="Enter author"
                {...field}
                type="text"
                disabled
                style={{
                  border: errors?.email ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.email?.message}</span>
        </div>

        {/* role */}
        <div>
          <label htmlFor="isbn">Enter Role:</label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="1" selected={role == "1" ? true : false}>
              Admin
            </option>
            <option value="2" selected={role == "2" ? true : false}>
              User
            </option>
          </select>
        </div>

        {/* phone */}
        <div>
          <label htmlFor="phone">Enter Language:</label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "phone is required",
            }}
            render={({ field }) => (
              <input
                placeholder="Enter Phone number "
                {...field}
                type="text"
                // required
                style={{
                  border: errors?.phone ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.phone?.message}</span>
        </div>

        <div className="save-btn">
          <input
            type="submit"
            value="Save"
            disabled={isLoadingUpdate ? true : false}
          />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
