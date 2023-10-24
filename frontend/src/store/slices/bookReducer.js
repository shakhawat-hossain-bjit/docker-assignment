import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  isLoadingBook: false,
  allBooks: [],
  isLoadingAllBook: false,
  booksByRatingDesc: [],
  isLoadingBooksByRating: false,
  booksByPriceAsc: [],
  isLoadingBooksByPrice: false,
  booksByViewsDesc: [],
  isLoadingBooksByView: false,
  message: "",
  searchKeyWord: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    loadBookReducer: (state, action) => {
      state.isLoadingBook = true;
      state.books = action.payload;
    },
    removeBookReducer: (state, action) => {
      state.isLoadingBook = true;
      // console.log("state?.books?.books ", state?.books?.books);
      // console.log("state?.books ", state?.books);
      const filtered = state?.books?.filter((x) => {
        if (x._id != action?.payload) {
          return x;
        }
      });
      // console.log("filtered ", filtered);
      state.books = filtered;
    },
    loadAllBookReducer: (state, action) => {
      state.isLoadingAllBook = true;
      state.allBooks = action.payload;
    },
    loadBookByRatingDescReducer: (state, action) => {
      state.isLoadingBooksByRating = true;
      state.booksByRatingDesc = action.payload;
    },

    loadBooksByPriceAscReducer: (state, action) => {
      state.isLoadingBooksByPrice = true;
      state.booksByPriceAsc = action.payload;
    },

    loadBooksByViewDescReducer: (state, action) => {
      state.isLoadingBooksByView = true;
      state.booksByViewsDesc = action.payload;
    },

    lodingFinishedReducer: (state, action) => {
      state[`${action.payload}`] = false;
    },

    searchBookKeywordReducer: (state, action) => {
      state.searchKeyWord = action.payload;
    },

    // addProductReducer: (state, action) => {
    //   console.log(state);
    //   let products = state.productList;
    //   products.push(action?.payload);
    //   state.productList = products;
    // },
    // deleteProductReducer: (state, action) => {
    //   let products = state.productList.filter((x) => x?._id !== action.payload);
    //   state.productList = products;
    // },
    // updateProductReducer: (state, action) => {
    //   let products = state.productList.map((x) => {
    //     if (x?._id == action.payload.id) {
    //       return action.payload;
    //     }
    //     return x;
    //   });
    //   state.productList = products;
    // },
  },
});

export const {
  loadAllBookReducer,
  lodingFinishedReducer,
  loadBookByRatingDescReducer,
  loadBooksByPriceAscReducer,
  loadBooksByViewDescReducer,
  searchBookKeywordReducer,
  loadBookReducer,
  removeBookReducer,
} = bookSlice.actions;

export default bookSlice.reducer;
