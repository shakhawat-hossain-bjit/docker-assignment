import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import cartAPI from "../../api/cart/cartAPI";
import {
  addToCartReducer,
  loadCartReducer,
  lodingFinishedReducer,
  removeFromCartReducer,
} from "../../store/slices/cartReducer";

const useCartHook = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const dispatch = useDispatch();

  const { addToCart, removeFromCart, loadCart } = cartAPI();

  const add = (obj) => {
    setIsLoadingCart(true);
    setMessage("");
    addToCart(obj)
      .then((data) => {
        // console.log(data?.data);
        const { _id, author, title, language, rating, stock, images, price } =
          data?.data?.currentBook;
        dispatch(
          addToCartReducer({
            _id,
            author,
            title,
            language,
            rating,
            stock,
            images,
            price,
          })
        );
        setSuccess(true);
        setMessage("successfully Added to cart");
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to add to cart!";
        }
        setSuccess(false);
        setMessage(txt);
      })
      .finally(() => {
        setIsLoadingCart(false);
        dispatch(lodingFinishedReducer(isLoadingCart));
      });
  };

  const remove = (obj) => {
    console.log("hook ", obj);
    setIsLoadingCart(true);
    setMessage("");
    removeFromCart(obj)
      .then((data) => {
        // console.log("res ", data);
        setSuccess(true);
        setMessage("successfully Removed From cart");
        dispatch(removeFromCartReducer(data?.data?.currentBook));
      })
      .catch((e) => {
        console.log(e);
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to remove from cart";
        }
        setSuccess(false);
        setMessage(txt);
      })
      .finally(() => {
        setIsLoadingCart(false);
        dispatch(lodingFinishedReducer(isLoadingCart));
      });
  };

  const showCart = (userId) => {
    setIsLoadingCart(true);
    setMessage("");
    loadCart(userId)
      .then((data) => {
        // console.log(data?.data?.books);
        dispatch(loadCartReducer(data?.data));
        setMessage("successfully loaded cart");
        setSuccess(true);
      })
      .catch((e) => {
        // console.log(e);
        // console.log("Error: ", e?.response?.statusText);
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to load cart!";
        }
        setMessage(txt);
        setSuccess(false);
      })
      .finally(() => {
        setIsLoadingCart(false);
        dispatch(lodingFinishedReducer(isLoadingCart));
      });
  };

  return {
    add,
    remove,
    showCart,
    message,
    success,
    isLoadingCart,
  };
};

export default useCartHook;
