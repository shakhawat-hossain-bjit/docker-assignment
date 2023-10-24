import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./passwordInput.style.scss";

const PasswordInput = ({ field, hints, error }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="password-input-container"
      style={{
        border: error ? "1px solid red" : "",
      }}
    >
      <input
        className="password-box"
        placeholder={hints}
        {...field}
        type={`${visible ? "text" : "password"}`}
      />
      <div className="eye-icon-container">
        {!visible ? (
          <AiFillEyeInvisible
            className="eye-icon"
            onClick={() => setVisible(!visible)}
            size={25}
          />
        ) : (
          <AiFillEye
            className="eye-icon"
            onClick={() => setVisible(!visible)}
            size={25}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
