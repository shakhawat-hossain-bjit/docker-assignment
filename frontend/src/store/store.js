import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/bookReducer";
import userReducer from "./slices/userReducer";
import cartReducer from "./slices/cartReducer";

const store = configureStore({
  reducer: {
    books: bookReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
