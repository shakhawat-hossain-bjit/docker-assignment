import { useDispatch } from "react-redux";
import { axiosInstance, axiosInstanceToken } from "../../utils/axiosCreate";
import { useNavigate } from "react-router";
import { loadCartReducer } from "../../store/slices/cartReducer";

const cartAPI = () => {
  const dispatch = useDispatch();

  const addToCart = async (obj) => {
    console.log(obj);
    let data = await axiosInstanceToken
      .post(`/cart/add-book`, obj)
      .then((res) => res.data);
    return data;
  };

  const removeFromCart = async (obj) => {
    // console.log("cart api ", obj);
    let data = await axiosInstanceToken
      .patch(`/cart/remove-book`, obj)
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

  const loadCart = async (userId) => {
    let data = await axiosInstanceToken
      .get(`/cart/${userId}`)
      .then((res) => res.data);
    return data;
    // .then((data) => {
    //   console.log(data?.data?.books);
    //   dispatch(loadCartReducer(data?.data?.books));
    // })
    // .catch((e) => {
    //   console.log(e);
    //   console.log("Error: ", e?.response?.statusText);
    // })
    // .finally(() => {
    //   // dispatch(loadingFinishedReducer("isLoadingSignup"));
    // });
  };

  return {
    addToCart,
    removeFromCart,
    loadCart,
  };
};

export default cartAPI;
