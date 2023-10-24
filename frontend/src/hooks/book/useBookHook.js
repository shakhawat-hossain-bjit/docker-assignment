import { useEffect, useState } from "react";
import bookAPI from "../../api/book/bookAPI";
import {
  loadAllBookReducer,
  loadBookByRatingDescReducer,
  loadBookReducer,
  loadBooksByPriceAscReducer,
  loadBooksByViewDescReducer,
  lodingFinishedReducer,
  removeBookReducer,
} from "../../store/slices/bookReducer";
import { useDispatch } from "react-redux";

const useBookHook = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [searchedbooks, setSearchedbooks] = useState({});
  const [rateBooks, setRatebooks] = useState([]);
  const [priceBooks, setPricebooks] = useState([]);
  const [viewBooks, setViewbooks] = useState([]);

  const [message, setMessage] = useState("");
  const [isLoadingBook, setIsLoadingBook] = useState(false);
  const [success, setSuccess] = useState(false);

  const [bookByIdMessage, setBookByIdMessage] = useState("");
  const [isLoadingBookById, setIsLoadingBookById] = useState(false);
  const [bookByIdSuccess, setBookByIdSuccess] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateSucccess, setUpdateSucccess] = useState(false);

  const [isLoadingInsert, setIsLoadingInsert] = useState(false);
  const [insertMessage, setInsertMessage] = useState("");
  const [insertSucccess, setInsertSucccess] = useState(false);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const dispatch = useDispatch();

  const {
    findBook,
    getAllBooks,
    getSearchedBook,
    getBooksByRatingDesc,
    getBooksByPriceAsc,
    getBooksByViewDesc,
    deleteBook,
    updateBook,
    insertBook,
  } = bookAPI();

  const getBookById = (_id) => {
    setIsLoadingBookById(true);
    setBookByIdMessage("");
    setBook({});
    findBook(_id)
      .then((data) => {
        // console.log(data);
        setBook(data?.data);
        setBookByIdMessage(data?.message);
        setBookByIdSuccess(true);
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setBookByIdSuccess(false);
        setBookByIdMessage(message);
        setBook({});
      })
      .finally(() => {
        setIsLoadingBookById(false);
      });
  };

  const getAll = () => {
    setIsLoadingBook(true);
    setMessage("");
    getAllBooks()
      .then((data) => {
        // console.log(data?.data?.books);
        setBooks(data?.data?.books);
        dispatch(loadAllBookReducer(data?.data?.books));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingAllBook"));
        setIsLoadingBook(false);
      });
  };

  const getSearched = (queryParams) => {
    console.log("searched");
    setIsLoadingBook(true);
    setMessage("");

    getSearchedBook(queryParams)
      .then((data) => {
        // console.log("hoooook ", data);
        setSearchedbooks(data?.data);
        dispatch(loadBookReducer(data?.data?.books));
      })
      .catch((e) => {
        // console.log("inside error", e);
        if (e?.response?.status == 404) {
          setSearchedbooks({});
          dispatch(loadBookReducer({}));
        }

        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingAllBook"));
        setIsLoadingBook(false);
      });
  };

  const getBooksByRating = () => {
    setIsLoadingBook(true);
    setMessage("");
    getBooksByRatingDesc()
      .then((data) => {
        setRatebooks(data?.data?.books);
        dispatch(loadBookByRatingDescReducer(data?.data?.books));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingBooksByRating"));
        setIsLoadingBook(false);
      });
  };

  const getBooksByPrice = () => {
    setIsLoadingBook(true);
    setMessage("");
    getBooksByPriceAsc()
      .then((data) => {
        setPricebooks(data?.data?.books);
        dispatch(loadBooksByPriceAscReducer(data?.data?.books));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingBooksByPrice"));
        setIsLoadingBook(false);
      });
  };

  const getBooksByView = () => {
    setIsLoadingBook(true);
    setMessage("");
    getBooksByViewDesc()
      .then((data) => {
        setViewbooks(data?.data?.books);
        dispatch(loadBooksByViewDescReducer(data?.data?.books));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingBooksByView"));
        setIsLoadingBook(false);
      });
  };

  const deleteBookById = (bookId) => {
    setIsLoadingDelete(true);
    setDeleteMessage("");
    deleteBook(bookId)
      .then((data) => {
        // console.log(data);
        setDeleteMessage(data?.message);
        setDeleteSuccess(true);
        dispatch(removeBookReducer(bookId));
      })
      .catch((e) => {
        // console.log("error   -- ", e);
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to delete!";
        }
        setDeleteSuccess(false);
        setDeleteMessage(message);
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
  };

  const createBook = (book) => {
    setIsLoadingInsert(true);
    setMessage("");
    insertBook(book)
      .then((data) => {
        //  console.log(data);
        setInsertMessage(data?.message);
        setInsertSucccess(true);
        // dispatch(removeBookReducer(bookId));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to insert!";
        }
        setInsertSucccess(false);
        setInsertMessage(message);
      })
      .finally(() => {
        setIsLoadingInsert(false);
      });
  };

  const updateBookById = (book) => {
    setIsLoadingUpdate(true);
    setUpdateMessage("");
    updateBook(book)
      .then((data) => {
        // console.log(data);
        setUpdateMessage(data?.message);
        setUpdateSucccess(true);
        // dispatch(removeBookReducer(bookId));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to update!";
        }
        setUpdateSucccess(false);
        setUpdateMessage(message);
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });
  };

  return {
    books,
    book,
    searchedbooks,
    rateBooks,
    priceBooks,
    viewBooks,

    isLoadingBook,
    message,
    success,

    getAll,
    getSearched,
    getBooksByRating,
    getBooksByPrice,
    getBooksByView,

    getBookById,
    isLoadingBookById,
    bookByIdMessage,
    bookByIdSuccess,

    deleteBookById,
    isLoadingDelete,
    deleteMessage,
    deleteSuccess,

    updateBookById,
    isLoadingUpdate,
    updateMessage,
    updateSucccess,

    createBook,
    isLoadingInsert,
    insertMessage,
    insertSucccess,
  };
};

export default useBookHook;
