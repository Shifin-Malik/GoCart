import React from "react";
import * as motion from "motion/react-client";
import { useContext } from "react";
import { AppContextData } from "../context/AppContext";

function FeaturedProducts() {
  const { featured } = useContext(AppContextData);
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-secondary">
          The Latest Features{" "}
        </p>
        <div className="w-28 h-1 bg-secondary mt-2"></div>
      </div>

      <div className="flex gap-10 mt-6 p-4 overflow-x-auto scrollbar-hide">
        {featured.map((item,idx) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={idx}
            className={`${
              item.id === 1
                ? "bg-cover bg-center lg:min-w-[400px] min-w-[300px] h-[450px] rounded-lg flex flex-col justify-start p-6 text-[#EEEEEE] shadow-lg"
                : "bg-cover bg-center lg:min-w-[400px] min-w-[300px] h-[450px] rounded-lg flex flex-col justify-start p-6 text-secondary shadow-lg"
            }`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className="text-sm font-semibold">{item.title}</p>
            <h1 className="text-2xl font-bold">{item.heading}</h1>
            <p className="text-sm font-light leading-tight mt-2">
              {item.price}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
