import React from "react";
import NavBar from "../components/NavBar";
import HeaderSlider from "../components/HeaderSlider";

function Home() {
  return (
    <>
      <NavBar />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
      </div>
    </>
  );
}

export default Home;
