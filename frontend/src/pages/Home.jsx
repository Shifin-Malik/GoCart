import React from "react";
import HeaderSlider from "../components/HeaderSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import Support from "../components/SupportFeatures";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLatter";

function Home() {
  return (
    <>
      <div className="px-6 md:px-12 lg:px-20">
        <HeaderSlider />
        <FeaturedProducts />
        <Support />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
}

export default Home;
