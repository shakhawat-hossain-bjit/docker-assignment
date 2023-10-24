import React from "react";
import "./navSections.style.scss";

const NavSections = ({ options, userSelectedSection, activeOption }) => {
  return (
    <div className="nav-sections-container">
      {options.map((x, index) => (
        <button
          key={index}
          className={`${
            index == activeOption && "nav-sections-button-active"
          }  nav-sections-button`}
          onClick={() => userSelectedSection(index)}
        >
          {x}
        </button>
      ))}
    </div>
  );
};

export default NavSections;
