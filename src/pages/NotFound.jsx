import React from "react";
import Error from "/public/Lottie/Error.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/GoCart");
  };
  return (
    <div className="w-full h-full mt-10 flex flex-col justify-center items-center">
      <Lottie className="w-80 h-80" animationData={Error} />
      <h1 className="text-4xl font-bold  text-secondary">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-secondary p-2">
        The page you are looking for does not exist or may have been moved.
      </p>
      <button
        onClick={handleClick}
        className="w-40 h-10 bg-primary text-white rounded-lg"
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
