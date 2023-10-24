import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  isLoadingCart: false,
  isLoadingAdd: false,
  isLoadingRemove: false,
  // total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartReducer: (state, action) => {
      state.isLoadingCart = true;
      state.books = action.payload?.books || [];
      state.total = action.payload?.totalPrice || 0;
    },
    addToCartReducer: (state, action) => {
      // state.isLoadingAdd = true;
      // console.log("reducer ", action?.payload);
      const obj = {};
      let isExist = false;
      const mappedBooks = state?.books?.map((x) => {
        if (x.book._id == action?.payload?._id) {
          // console.log("found");
          obj.quantity = x.quantity + 1;
          obj.price = x.price;
          obj.book = action.payload;
          isExist = true;
          return obj;
        }
        return x;
      });

      if (!isExist) {
        obj.quantity = 1;
        obj.price = action.payload.price;
        delete action?.payload?.price;
        obj.book = action.payload;
        mappedBooks.push(obj);
      }
      // console.log("mappedBooks ", mappedBooks);
      state.books = mappedBooks;
      // state.total = Number((state.total + obj.price).toFixed(2));
    },

    removeFromCartReducer: (state, action) => {
      // state.isLoadingRemove = true;
      console.log("reducer ", action?.payload);
      const mappedBooks = state?.books?.filter((x) => {
        if (x.book._id != action?.payload?._id) {
          return x;
        } else {
          if (x.quantity > 1) {
            x.quantity = x.quantity - 1;
            return x;
          }
        }
      });
      console.log("mappedBooks ", mappedBooks);
      state.books = mappedBooks;
      // state.total = Number((state.total - action?.payload?.price).toFixed(2));
    },

    lodingFinishedReducer: (state, action) => {
      state[`${action.payload}`] = false;
    },
  },
});

export const {
  addToCartReducer,
  loadCartReducer,
  removeFromCartReducer,
  lodingFinishedReducer,
} = cartSlice.actions;

export default cartSlice.reducer;
