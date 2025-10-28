import React from "react";
import NavBar from "../components/NavBar";
import HeaderSlider from "../components/HeaderSlider";
import HomeProducts from "../components/HomeProducts";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>
      <NavBar />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProducts />
      </div>
    </>
  );
}

export default Home;
