import React from "react";
import BestSelling from "../../components/bestSelling/bestSelling";
import FeaturedBooks from "../../components/featuredBooks/featuredBooks";

const Home = () => {
  return (
    <div>
      <BestSelling />
      <FeaturedBooks />
    </div>
  );
};

export default Home;
