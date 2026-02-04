import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "IPhone 17 Pro Max",
      offer: "Limited Time Offer — Save 30%",
      buttonText1: "Buy Now",
      buttonText2: "Learn More",
      imgSrc: assets.iphone1,
    },
    {
      id: 2,
      title: "The New iMac 2025",
      offer: "Special Launch Deal — 25% Off",
      buttonText1: "Buy Now",
      buttonText2: "Explore More",
      imgSrc: assets.headerslide_imac,
    },
    {
      id: 3,
      title: "Noise-Cancelling Headphones",
      offer: "This Week Only — Save 20%",
      buttonText1: "Buy Now",
      buttonText2: "Discover",
      imgSrc: assets.headslide_headphone,
    },
    {
      id: 4,
      title: "MacBook Pro M4 Edition",
      offer: "Exclusive Offer — 15% Off",
      buttonText1: "Buy Now",
      buttonText2: "View Details",
      imgSrc: assets.headerslide_mac,
    },
    {
      id: 5,
      title: "Apple Watch Series 11",
      offer: "Exclusive Offer — 15% Off",
      buttonText1: "Buy Now",
      buttonText2: "View Details",
      imgSrc: assets.headerslide_iwatch,
    },
    {
      id: 6,
      title: "Imac Pro M4 Edition",
      offer: "Exclusive Offer — 15% Off",
      buttonText1: "Buy Now",
      buttonText2: "View Details",
      imgSrc: assets.MYJG3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base font-semibold text-primary pb-1">
                {slide.offer}
              </p>
              <h1 className="text-secondary max-w-lg md:text-[32px]  text-2xl font-bold font-vend-san">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-primary rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2}
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <img
                className="md:w-96 w-60"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, idx) => (
          <div
            key={idx}
            onClick={() => handleSlideChange(idx)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === idx ? "bg-primary" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
