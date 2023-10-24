import React, { useEffect, useState } from "react";
import banner from "../../assets/images/banner.png";
import "./banner.style.scss";
import ColorTip from "./colorTip/colorTip";

const Banner = () => {
  const [color, setColor] = useState("#D3D5D5");
  let colors = ["#d3d5d5", "#a4b0be", "#eab543", "#74b9ff"];

  let setColorFromColorTip = (value) => {
    console.log("value ", value);
    setColor(value);
  };

  useEffect(() => {
    setColor(colors[0]);
  }, []);

  return (
    <div className="banner-container" style={{ backgroundColor: color }}>
      <div className="color-tip-container">
        <ColorTip
          colors={colors}
          currentColor={color}
          setColorFromColorTip={setColorFromColorTip}
        />
      </div>
      <div className="banner-text">
        <p>
          Featured Book of
          <br />
          <span>October</span>
        </p>
      </div>
      <div className="banner-img">
        <img src={banner} alt="banner images" />
      </div>
    </div>
  );
};

export default Banner;
