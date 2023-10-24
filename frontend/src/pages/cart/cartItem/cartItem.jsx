import React, { useEffect, useState } from "react";
import "./cartItem.style.scss";
import Spinner from "../../../components/spinner/spinner";
import demobook from "../../../assets/images/demoBook.png";
import { MdAdd, MdRemove } from "react-icons/md";
import {
  addToCartReducer,
  removeFromCartReducer,
} from "../../../store/slices/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import cartAPI from "../../../api/cart/cartAPI";
import useCartHook from "../../../hooks/cart/useCartHook";
import { bottomEndToast } from "../../../utils/swalCreate";

const CartItem = ({ props }) => {
  const [imageState, setImageState] = useState(0);
  const { price, quantity } = props;
  const { title, images, author, _id } = props.book;
  const { add, remove, message, success, isLoadingCart } = useCartHook();
  const { email, role, userId } = useSelector((state) => state.user);

  useEffect(() => {
    const loadImages = async () => {
      try {
        let url = images[0];
        const response = await fetch(url);
        // console.log(response);
        if (response.ok) {
          setImageState(1);
        } else {
          //image not loaded
          setImageState(-1);
        }
      } catch (e) {
        // console.error(`Error loading image : ${e}`);
        setImageState(-1);
      }
    };

    //check if image exist
    if (images?.length) {
      const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;
      const isValidImageUrl = imageUrlRegex.test(images[0]);
      if (isValidImageUrl) loadImages();
      else setImageState(-1);
    } else {
      setImageState(-1);
    }
  }, [images]);

  const addItem = () => {
    // console.log("add ", _id, title);
    if (userId) {
      const obj = {
        userId: userId,
        bookId: _id,
        amount: 1,
      };
      add(obj);
    } else {
      navigate("/login");
    }
  };

  const removeItem = () => {
    // console.log("remove ", _id, title);
    if (userId) {
      const obj = {
        userId: userId,
        bookId: _id,
        amount: 1,
      };
      console.log("obj ", obj);
      remove(obj);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isLoadingCart == false && message) {
      let icon = success ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: message,
      });
    }
  }, [isLoadingCart, message, success]);

  return (
    <div className="cart-item-info">
      <div className="cart-item-img-container">
        {imageState == 0 ? (
          <div style={{ width: "100px", height: "130px" }}>
            <Spinner />
          </div>
        ) : (
          <img
            src={`${imageState == 1 ? images[0] : demobook}`}
            alt="book image"
            width="140px"
            height="180px"
          />
        )}
      </div>

      <div className="cart-item-title-container">
        <h3 className="cart-item-title">{title}</h3>
        {author && <h5 className="cart-item-author-container">By {author}</h5>}
      </div>
      <div className="cart-item-price-container">
        <p className="cart-item-price">{price}</p>
      </div>

      <div className="cart-button-container">
        <button
          className="cart-item-decrease-btn"
          disabled={isLoadingCart ? true : false}
          onClick={() => removeItem()}
        >
          <MdRemove />
        </button>
        <div className="cart-quantity-container">
          <p className="">{quantity}</p>
        </div>
        <button
          className="cart-item-increase-btn"
          disabled={isLoadingCart ? true : false}
          onClick={() => addItem()}
        >
          <MdAdd />
        </button>
      </div>

      <div className="cart-item-sub-total-container">
        <p className="cart-item-sub-total">{(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
