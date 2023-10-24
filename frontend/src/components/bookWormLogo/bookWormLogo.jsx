import React from "react";
import worm from "../../assets/images/worm.png";
import "./bookWormLogo.scss";
const BookWormLogo = () => {
  return (
    <div className="logo-container">
      <span>
        Book
        <img src={worm} alt="worm" width="25px" />
        orm
      </span>
    </div>
  );
};

export default BookWormLogo;
