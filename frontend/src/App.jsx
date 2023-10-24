import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Banner from "./components/banner/banner";
import Footer from "./components/footer/footer";
import PreNavbar from "./components/preNavbar/preNavbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import BestSelling from "./components/bestSelling/bestSelling";
import FeaturedBooks from "./components/featuredBooks/featuredBooks";
import Login from "./pages/logIn/logIn";
import Register from "./pages/register/register";
import NotFound from "./components/notFound/notFound";
import Home from "./pages/home/home";
import Cart from "./pages/cart/cart";
import WishList from "./pages/wishList/wishList";
import AdminRoute from "./pages/authenticate/adminRoute";
import UserRoute from "./pages/authenticate/userRoute";
import Books from "./pages/books/books";
import { useSelector } from "react-redux";
import cartAPI from "./api/cart/cartAPI";
import useCartHook from "./hooks/cart/useCartHook";
import UpdateBook from "./pages/updateBook/updateBook";
import InsertBook from "./pages/insertBook/insertBook";
import Transaction from "./pages/transaction/transaction";
import BookDetails from "./pages/bookDetails/bookDetails";
import Balance from "./pages/balance/balance";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/profile";
import CommonRoute from "./pages/authenticate/commonRoute";
import AllUser from "./pages/allUser/allUser";
import EditUser from "./pages/editUser/editUser";
import ForgetPassword from "./pages/accountRecover/forgetPassword/forgetPassword";
import ResetPassword from "./pages/accountRecover/resetPassword/resetPassword";

function App() {
  const { userId, role } = useSelector((state) => state.user);
  const { showCart } = useCartHook();

  useEffect(() => {
    if (userId && role == 2) showCart(userId);
  }, [userId, role]);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);

  return (
    <>
      <BrowserRouter>
        {/* <PreNavbar /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/reset-password/:token/:authId"
            element={<ResetPassword />}
          />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />

          <Route element={<AdminRoute />}>
            {/* <Route path="" element={<Dashboard />}></Route> */}
            {/* <Route path="/profile" element={<Profile />}>
              <Route path="edit" element={<EditProfile />} />
              <Route path="delete" element={<DeleteProfile />} />
            </Route> */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="insert-book" element={<InsertBook />} />
              <Route path="update-book/:bookId" element={<UpdateBook />} />
              <Route path="user" element={<AllUser />} />
              <Route path="user/edit/:id" element={<EditUser />} />
              <Route path="transaction" element={<Transaction />} />
            </Route>
          </Route>

          <Route path="/user" element={<UserRoute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="balance" element={<Balance />} />
          </Route>

          <Route path="/" element={<CommonRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
