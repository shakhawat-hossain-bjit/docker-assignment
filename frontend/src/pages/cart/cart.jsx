import React, { useEffect, useState } from "react";
import "./cart.style.scss";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/cartItem";

import useTransactiontHook from "../../hooks/transaction/useTransactionHook";
import { bottomEndToast } from "../../utils/swalCreate";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  let { books, total } = useSelector((x) => x.cart);
  let { userId } = useSelector((x) => x.user);

  const {
    checkOutByUser,
    isLoadingCheckout,
    checkoutMessage,
    checkoutSuccess,
  } = useTransactiontHook();

  useEffect(() => {
    // console.log(books);
    setCartItems(books);
    // setTotalPrice(total);
  }, [books, total]);

  useEffect(() => {
    console.log(cartItems);
    let total = 0;
    cartItems.forEach(
      (x) => (total += Number((x.price * x.quantity).toFixed(2)))
    );
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  // console.log("cartItems ", cartItems.length);

  const checkOutCart = () => {
    // console.log("checkout");
    if (userId) checkOutByUser({ userId });
  };

  useEffect(() => {
    if (isLoadingCheckout == false && checkoutMessage) {
      let icon = checkoutSuccess ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: checkoutMessage,
      });
    }
    if (checkoutSuccess) {
      navigate("/user/transaction");
    }
  }, [isLoadingCheckout, checkoutMessage, checkoutSuccess]);

  // console.log(isLoadingCheckout);

  return (
    <div>
      <div className="container">
        <div className=" cart-container">
          <h1 className="cart-title">Cart</h1>
          <hr />
          {!cartItems || cartItems?.length == 0 ? (
            <div className="cart-empty-message">
              <h3>There is no item</h3>
            </div>
          ) : (
            <div className="cart-item-container">
              {cartItems?.map((x) => (
                <CartItem props={x} key={x?.book?.id} />
              ))}
              <div className="tota-price">
                <h3>{totalPrice}</h3>
              </div>

              <div className="checkout-button-container">
                <button
                  onClick={() => checkOutCart()}
                  disabled={isLoadingCheckout ? true : false}
                >
                  Check Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
