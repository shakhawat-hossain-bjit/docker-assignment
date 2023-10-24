import React, { useContext, useEffect, useState } from "react";
import "./navbar.style.scss";
import BookWormLogo from "../bookWormLogo/bookWormLogo";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { SlHeart, SlHandbag, SlUser } from "react-icons/sl";
import { GrUserAdmin } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { signOutReducer } from "../../store/slices/userReducer";
import userAPI from "../../api/userAPI/userAPI";
import { searchBookKeywordReducer } from "../../store/slices/bookReducer";

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [search, setSearch] = useState("");
  const [cartLength, setCartLength] = useState("");
  const reduxState = useSelector((state) => state);
  const { email, role, userName } = reduxState.user;
  const { books } = reduxState.cart;
  const { checkUser } = userAPI();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo({ email, role, userInfo });
  }, [email, role, userName]);

  useEffect(() => {
    checkUser();
  }, []);

  const logOutUser = () => {
    dispatch(signOutReducer());
    navigate("/");
  };

  useEffect(() => {
    dispatch(searchBookKeywordReducer(search));

    if (location.pathname != "/books" && search != "") {
      navigate("/books");
    }
  }, [search]);

  useEffect(() => {
    setCartLength(books?.length);
  }, [books]);

  // useEffect(() => {
  //   // console.log("location ", location);
  //   if ((location.pathname = "/cart")) {
  //     const timer = setTimeout(() => {
  //       console.log("fetching cart.......................................");
  //     }, 10000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [location]);

  // console.log(showDropdown);

  return (
    <nav className="nav-container">
      <ul className=" container">
        <div className="nav-logo">
          <Link to="/home">
            <BookWormLogo />
          </Link>
        </div>

        <div className="navbar-optinos">
          <div className="nav-search-container">
            <input
              type="text"
              placeholder="Search a book"
              onKeyUp={(e) => setSearch(e?.target?.value)}
            />
          </div>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            {userInfo.role == 2 && (
              <Link to="/wishlist">
                <SlHeart className="icon" size={24} />
              </Link>
            )}
          </li>

          <li>
            {userInfo.role == 1 && (
              <Link to="/dashboard/profile">Dashboard</Link>
            )}
          </li>

          <li>
            {userInfo.role == 2 && (
              <div>
                <Link to="/user/cart" className="navbar-cart">
                  {cartLength > 0 && <p>{cartLength}</p>}

                  <SlHandbag className="icon" size={24} />
                </Link>
              </div>
            )}
          </li>
          <li
            className="profile-section"
            onMouseOver={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            {userInfo.email ? (
              <Link to="/">
                <GrUserAdmin className="icon" size={24} />
              </Link>
            ) : (
              <Link to="/">
                <SlUser className="icon" size={24} />
              </Link>
            )}
          </li>
        </div>
        {showDropdown && (
          <div
            className="profile-drop-down"
            onMouseOver={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            {userInfo.email ? (
              <div className="options">
                <div>
                  <Link to="profile">Profile</Link>
                </div>

                {userInfo?.role == 2 && (
                  <div>
                    <Link to="/user/balance">Balance</Link>
                  </div>
                )}

                {userInfo?.role == 2 && (
                  <div>
                    <Link to="/user/transaction">My Transaction</Link>
                  </div>
                )}

                <div>
                  <Link to="/" onClick={() => logOutUser()}>
                    Log Out
                  </Link>
                </div>
              </div>
            ) : (
              <div className="options">
                <div>
                  <Link to="/login">Log In</Link>
                </div>
                <div>
                  <Link to="/register">Register</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
