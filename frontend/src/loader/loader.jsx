import React from "react";
import "./loader.scss";
const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="containerss">
          <div className="loader">
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--text"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
