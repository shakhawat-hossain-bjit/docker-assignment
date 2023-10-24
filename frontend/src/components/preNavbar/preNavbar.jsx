import React from "react";
import {
  SlLocationPin,
  SlQuestion,
  SlScreenSmartphone,
  SlHeart,
  SlHandbag,
  SlUser,
} from "react-icons/sl";
import "./preNavbar.style.scss";
import { Link } from "react-router-dom";

const PreNavbar = () => {
  return (
    <div className="pre-nav container">
      {/* left side */}
      <div className="pre-nav-left">
        {/* help */}
        <div className="icon-text pre-nav-element">
          <SlQuestion size="18px" />
          <p>Can we help you</p>
        </div>
        {/* contact */}
        <div className="icon-text pre-nav-element">
          <SlScreenSmartphone size="18px" />
          <p>+14 244-253-424</p>
        </div>
      </div>
      {/* right side  */}
      <div className="pre-nav-right">
        <div>
          <SlLocationPin className="icon" size={22} />
        </div>
        <div>
          <Link to="/wishlist">
            <SlHeart className="icon" size={22} />
          </Link>
        </div>
        <div>
          <Link to="/cart">
            <SlHandbag className="icon" size={22} />
          </Link>
        </div>
        {/* <div>
          <Link to="/login">
            <SlUser className="icon" size={22} />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default PreNavbar;
