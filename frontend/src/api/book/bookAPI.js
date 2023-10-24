import { useDispatch } from "react-redux";
import { axiosInstance, axiosInstanceToken } from "../../utils/axiosCreate";

const bookAPI = () => {
  const dispatch = useDispatch();

  const findBook = async (_id) => {
    let data = await axiosInstance
      .get(`/books/find-by-id/${_id}`)
      .then((res) => res.data);
    return data;
  };

  const getAllBooks = async () => {
    let data = await axiosInstance.get(`/books/all`).then((res) => res.data);
    return data;
  };

  const getSearchedBook = async (queryParams) => {
    console.log(queryParams);
    let url = `/books/all?`;
    if (queryParams?.text) {
      url += `search=${queryParams?.text}&`;
    }
    if (queryParams?.page) {
      url += `page=${queryParams?.page}&`;
    }
    if (queryParams?.sortParam) {
      url += `sortParam=${queryParams?.sortParam}&`;
    }
    if (queryParams?.sortOrder) {
      url += `sortOrder=${queryParams?.sortOrder}&`;
    }
    if (queryParams?.category != "") {
      url += `category=${queryParams?.category}&`;
    }

    console.log(url);

    const data = await axiosInstance.get(`${url}`).then((res) => res.data);
    return data;
  };

  const getBooksByRatingDesc = async () => {
    let data = await axiosInstance
      .get(`/books/all?sortOrder=desc&sortParam=rating`)
      .then((res) => res.data);
    return data;
    // .then((data) => {
    //   // console.log(data?.data?.books);
    //   dispatch(loadBookByRatingDescReducer(data?.data?.books));
    // })
    // .catch((e) => {
    //   console.log(e);
    //   console.log("Error: ", e?.response?.statusText);
    // })
    // .finally(() => {
    //   dispatch(lodingFinishedReducer("isLoadingBooksByRating"));
    // });
  };

  const getBooksByPriceAsc = async () => {
    let data = await axiosInstance
      .get(`/books/all?sortOrder=asc&sortParam=price`)
      .then((res) => res.data);
    return data;
    //  .then((data) => {
    //    // console.log(data?.data?.books);
    //    dispatch(loadBooksByPriceAscReducer(data?.data?.books));
    //  })
    //  .catch((e) => {
    //    console.log("Error: ", e?.response?.statusText);
    //  })
    //  .finally(() => {
    //    dispatch(lodingFinishedReducer("isLoadingBooksByPrice"));
    //  });
  };

  const getBooksByViewDesc = async () => {
    let data = await axiosInstance
      .get(`/books/all?sortOrder=asc&sortParam=views`)
      .then((res) => res.data);
    return data;
    //  .then((data) => {
    //    // console.log(data?.data?.books);
    //    dispatch(loadBooksByViewDescReducer(data?.data?.books));
    //  })
    //  .catch((e) => {
    //    console.log("Error: ", e?.response?.statusText);
    //  })
    //  .finally(() => {
    //    dispatch(lodingFinishedReducer("isLoadingBooksByView"));
    //  });
  };

  const insertBook = async (book) => {
    let data = await axiosInstanceToken
      .post(`/books/create`, book)
      .then((res) => res.data);
    return data;
  };

  const updateBook = async (book) => {
    const { id, ...other } = book;
    let data = await axiosInstanceToken
      .patch(`/books/update/${id}`, other)
      .then((res) => res.data);
    return data;
  };

  const deleteBook = async (bookId) => {
    let data = await axiosInstanceToken
      .delete(`/books/delete/${bookId}`)
      .then((res) => res.data);
    return data;
  };

  return {
    findBook,
    getAllBooks,
    getBooksByRatingDesc,
    getBooksByPriceAsc,
    getBooksByViewDesc,
    getSearchedBook,
    insertBook,
    updateBook,
    deleteBook,
  };
};

export default bookAPI;
