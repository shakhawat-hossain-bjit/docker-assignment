import React from "react";

function RatingStar({ rating }) {
  //   console.log(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<i className="fa-solid fa-star" key={i}></i>);
    } else if (i < rating && i === Math.floor(rating)) {
      stars.push(<i className="fa-solid fa-star-half-stroke" key={i}></i>);
    } else {
      stars.push(<i className="fa-regular fa-star" key={i}></i>);
    }
  }
  return <div className="star-container">{stars}</div>;
}

export default RatingStar;
