import { axiosInstanceToken } from "../../utils/axiosCreate";

const walletAPI = () => {
  const addMoney = async (obj) => {
    let data = await axiosInstanceToken
      .patch(`/wallet/add-balance`, obj)
      .then((res) => res.data);
    return data;
  };

  return {
    addMoney,
  };
};

export default walletAPI;
