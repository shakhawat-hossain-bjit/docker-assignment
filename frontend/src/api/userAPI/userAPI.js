import { useDispatch } from "react-redux";
import { axiosInstance, axiosInstanceToken } from "../../utils/axiosCreate";
import {
  loadUserInfo,
  loadingFinishedReducer,
  logInReducer,
  signOutReducer,
} from "../../store/slices/userReducer";

const userAPI = () => {
  const dispatch = useDispatch();

  const loadAll = async () => {
    let data = await axiosInstanceToken
      .get(`/users/all`)
      .then((res) => res.data);
    return data;
  };

  const update = async (obj) => {
    const { id, ...other } = obj;
    let data = await axiosInstanceToken
      .patch(`/users/update/${id}`, other)
      .then((res) => res.data);
    return data;
  };

  const getUser = async (id) => {
    let data = await axiosInstanceToken
      .get(`/users/get-by-id/${id}`)
      .then((res) => res.data);
    return data;
  };

  const deleteUser = async (id) => {
    let data = await axiosInstanceToken
      .delete(`/users/delete/${id}`)
      .then((res) => res.data);
    return data;
  };

  const logInUser = async (userInfo) => {
    let data = await axiosInstance
      .post(`/auth/log-in`, userInfo)
      .then((res) => res.data);
    return data;
  };

  const registerUser = async (userInfo) => {
    let data = await axiosInstance
      .post(`/auth/sign-up`, userInfo)
      .then((res) => res.data);
    return data;
    //   .then((data) => {
    //     console.log(data?.data);
    //     dispatch(logInReducer(data?.data));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     console.log("Error: ", e?.response?.statusText);
    //   })
    //   .finally(() => {
    //     dispatch(loadingFinishedReducer("isLoadingSignup"));
    //   });
  };

  const checkUser = () => {
    let token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      axiosInstance
        .get(`/auth/check-me/${token}`)
        .then((res) => res.data)
        .then((data) => {
          // user is valid
          // console.log(data?.data);
          dispatch(loadUserInfo(data?.data));
        })
        .catch((e) => {
          console.log(e);
          console.log("Error: ", e?.response?.statusText);
          dispatch(signOutReducer());
        })
        .finally(() => {
          dispatch(loadingFinishedReducer("isLoadingUser"));
        });
    }
  };

  return {
    logInUser,
    registerUser,
    checkUser,

    loadAll,
    getUser,

    update,
    deleteUser,
  };
};

export default userAPI;
