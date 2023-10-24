import { useEffect, useState } from "react";
import walletAPI from "../../api/wallet/walletAPI";

const useWalletHook = () => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { addMoney } = walletAPI();

  const updateBalance = (obj) => {
    setIsLoadingUpdate(true);
    setUpdateSuccess(false);
    addMoney(obj)
      .then((data) => {
        setUpdateSuccess(true);
        setUpdateMessage(data?.message);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to add money!";
        }
        setUpdateSuccess(false);
        setUpdateMessage(txt);
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });
  };

  return {
    updateBalance,
    isLoadingUpdate,
    updateMessage,
    updateSuccess,
  };
};

export default useWalletHook;
