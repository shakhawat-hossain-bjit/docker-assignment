import React from "react";
import "./colorTip.style.scss";
const ColorTip = ({ colors, currentColor, setColorFromColorTip }) => {
  // console.log("colors ",colors);
  return (
    <div className="banner-color">
      {colors?.map((x) => (
        <div
          key={x}
          className={`color-tip ${currentColor == x && "active-color-tip"}`}
          style={{ backgroundColor: x }}
          onClick={() => setColorFromColorTip(x)}
        ></div>
      ))}

      {/* <div className= {`color-tip ${color=="#D3D5D5" ? 'active-class' : ''}`} style={{backgroundColor:"#D3D5D5"}}
                onClick={()=>setColor("#D3D5D5")}
                >
                </div>
                <div  className= {`color-tip ${color=="#a4b0be" ? 'active-class' : ''}`} style={{backgroundColor:"#a4b0be"}}
                onClick={()=>setColor("#a4b0be")}
                >
                </div>
                <div className= {`color-tip ${color=="#EAB543" ? 'active-class' : ''}`} style={{backgroundColor:"#EAB543"}}
                  onClick={()=>setColor("#EAB543")}
                >
                </div>
                <div  className= {`color-tip ${color=="#74b9ff" ? 'active-class' : ''}`} style={{backgroundColor:"#74b9ff"}}
                 onClick={()=>setColor("#74b9ff")}
                >
                </div> */}
    </div>
  );
};

export default ColorTip;
