import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar";
import { assets } from "../../assets/assets";
import { IoIosFlash } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import HomeProducts from "../HomeProducts";
import { useNavigate, useParams } from "react-router-dom";
import { AppContextData } from "../../context/AppContext";

function Product() {
  const { id } = useParams();
  const { products } = useContext(AppContextData);
  const [firstImage, setFirstImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const addToCart = () => {
    navigate("/addtocart");
  };

  useEffect(() => {
    const product = products.find((p) => p._id === id);
    setProductData(product);
  }, [id, products]);
  if (!productData) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 text-gray-600">
          Loading product...
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="px-6 md:px-16 lg:px-32 pt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Images */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <img
                src={firstImage || productData.image?.[0]}
                alt={productData.name}
                className="w-full h-auto object-cover mix-blend-multiply transition delay-150 duration-150 hover:transition-y-1 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image?.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  onClick={() => setFirstImage(img)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 flex justify-center items-center"
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-auto object-cover mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <img
                    key={i}
                    className="h-4 w-4"
                    src={assets.star_icon}
                    alt="star"
                  />
                ))}
                <img
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star"
                />
              </div>
              <p>(4.5)</p>
            </div>

            <p className="text-gray-600 mt-3">{productData.description}</p>

            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              {productData.price && (
                <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                  ${productData.price}
                </span>
              )}
            </p>

            <hr className="bg-gray-600 my-6" />

            <div className="flex items-center mt-6 gap-4">
              <button
                onClick={addToCart}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition rounded-lg font-bold flex justify-center items-center gap-2 cursor-pointer"
              >
                <IoCartSharp size={20} /> Add to Cart
              </button>
              <button className="w-full py-3.5 rounded-lg bg-primary text-white hover:bg-blue-800 transition font-bold flex items-center justify-center gap-2 cursor-pointer">
                <IoIosFlash size={20} /> Buy now
              </button>
            </div>
          </div>
        </div>

        <HomeProducts />
      </div>
    </>
  );
}

export default Product;
