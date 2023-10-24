import { axiosInstanceToken } from "../../utils/axiosCreate";

const reviewAPI = () => {
  const create = async (obj) => {
    let data = await axiosInstanceToken
      .post(`/reviews/create`, obj)
      .then((res) => res.data);
    return data;
  };

  const update = async (obj) => {
    const { reviewId, ...other } = obj;
    let data = await axiosInstanceToken
      .patch(`/reviews/update/${reviewId}`, other)
      .then((res) => res.data);
    return data;
  };

  const remove = async (id) => {
    let data = await axiosInstanceToken
      .delete(`/reviews/delete/${id}`)
      .then((res) => res.data);
    return data;
  };

  return {
    create,
    update,
    remove,
  };
};

export default reviewAPI;
