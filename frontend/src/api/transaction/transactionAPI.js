import { axiosInstanceToken } from "../../utils/axiosCreate";

const transactionAPI = () => {
  const loadTransactionOfUser = async (obj) => {
    let data = await axiosInstanceToken
      .get(`/transaction/my-transaction`)
      .then((res) => res.data);
    return data;
  };

  const loadAll = async (obj) => {
    let data = await axiosInstanceToken
      .get(`/transaction/all?detail=1`)
      .then((res) => res.data);
    return data;
  };

  const checkOut = async (obj) => {
    let data = await axiosInstanceToken
      .post(`/transaction/checkout`, obj)
      .then((res) => res.data);
    return data;
  };

  return {
    loadTransactionOfUser,
    loadAll,
    checkOut,
  };
};

export default transactionAPI;
