import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import transactionAPI from "../../api/transaction/transactionAPI";
import { loadCartReducer } from "../../store/slices/cartReducer";

const useTransactiontHook = () => {
  const [mytransaction, setMyTransaction] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const dispatch = useDispatch();

  const { loadTransactionOfUser, loadAll, checkOut } = transactionAPI();

  const loadTransactionById = (obj) => {
    loadTransactionOfUser(obj)
      .then((data) => {
        console.log(data?.data);
        setMyTransaction(data?.data);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to load transaction by id!";
        }
      })
      .finally(() => {
        // setIsLoadingCart(false);
      });
  };

  const loadTransactions = () => {
    loadAll()
      .then((data) => {
        console.log("gdf ", data?.data);
        setTransaction(data?.data?.transactions);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to load transaction!";
        }
      })
      .finally(() => {
        // setIsLoadingCart(false);
      });
  };

  const checkOutByUser = (obj) => {
    setCheckoutSuccess(false);
    setIsLoadingCheckout(true);
    console.log(obj);
    checkOut(obj)
      .then((data) => {
        dispatch(loadCartReducer());
        setCheckoutMessage(data?.message);
        setCheckoutSuccess(true);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to checkout!";
        }
        setCheckoutMessage(txt);
        setCheckoutSuccess(false);
      })
      .finally(() => {
        setIsLoadingCheckout(false);
      });
  };

  return {
    loadTransactionById,
    loadTransactions,
    mytransaction,
    transaction,
    checkOutByUser,
    isLoadingCheckout,
    checkoutMessage,
    checkoutSuccess,
  };
};

export default useTransactiontHook;
