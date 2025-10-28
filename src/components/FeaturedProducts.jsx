import React from "react";
import { assets } from "../assets/assets";
import * as motion from "motion/react-client";

function FeaturedProducts() {
  const featuredItems = [
    {
      id: 1,
      image: assets.featuredImg1,
      title: "TODAY AT APPLE",
      heading: "Explore Apple Intelligence",
      description:
        "Come try it for yourself in a free session at the Apple Store.",
    },
    {
      id: 5,
      image: assets.featuredImg5,
      title: "TODAY AT APPLE",
      heading: "Shop with a Specialist over video.",
      description:
        "Choose your next device in a guided, one-way video session.",
    },
    {
      id: 2,
      image: assets.featuredImg2,
      title: "TODAY AT APPLE",
      heading: "Join free sessions at your Apple Store.",
      description:
        "Learn about the latest features and how to go further with your Apple devices.",
    },
    {
      id: 3,
      image: assets.featuredImg4,
      title: "TODAY AT APPLE",
      heading: "Explore Apple Intelligence",
      description:
        "Come try it for yourself in a free session at the Apple Store.",
    },
    {
      id: 4,
      image: assets.featuredImg3,
      title: "TODAY AT APPLE",
      heading: "Join free sessions at your Apple Store.",
      description:
        "Learn about the latest features and how to go further with your Apple devices.",
    },
  ];

  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-secondary">Featured Products</p>
        <div className="w-28 h-1 bg-secondary mt-2"></div>
      </div>

      <div className="flex gap-10 mt-12 p-4 overflow-x-auto scrollbar-hide">
        {featuredItems.map((item) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={item.id}
            className={`${
              item.id === 4
                ? "bg-cover bg-center lg:min-w-[400px] min-w-[300px] h-[450px] rounded-lg flex flex-col justify-start p-6 text-[#EEEEEE] shadow-lg"
                : "bg-cover bg-center lg:min-w-[400px] min-w-[300px] h-[450px] rounded-lg flex flex-col justify-start p-6 text-secondary shadow-lg"
            }`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className="text-sm font-semibold">{item.title}</p>
            <h1 className="text-2xl font-bold">{item.heading}</h1>
            <p className="text-sm font-light leading-tight mt-2">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
