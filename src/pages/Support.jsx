import React from "react";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
function Support() {
  const productSupport = [
    { id: 1, img: assets.iphonesupport, text: "Iphone" },
    { id: 2, img: assets.macsupport, text: "Mac" },
    { id: 3, img: assets.ipadsupport, text: "Ipad" },
    { id: 4, img: assets.iwatchsupport, text: "Watch" },
    { id: 5, img: assets.visionsupport, text: "Vision" },
    { id: 6, img: assets.airpodssupport, text: "Airpods" },
    { id: 7, img: assets.tvsupport, text: "Tv" },
  ];

  return (
    <div className="mt-4 md:mx-20 mx-4">
      <h1 className="text-center text-2xl lg:text-3xl font-bold text-secondary">
        GoCart Support
      </h1>
      <div className="flex flex-wrap justify-evenly gap-10 mt-6">
        {productSupport.map((item) => (
          <div className="flex flex-col items-center gap-3" key={item.id}>
            <div className="w-auto h-auto max-w-[120px]">
              <img
                src={item.img}
                alt={item.text}
                className="object-contain w-full h-20 cursor-pointer transition-transform hover:scale-105"
              />
            </div>
            <h1 className="text-center font-bold text-secondary">
              {item.text}
            </h1>
          </div>
        ))}
      </div>

      <div
        className="mt-20 relative flex items-center justify-center transition-transform hover:scale-105 ease-in-out"
        style={{
          backgroundImage: `url(${assets.support})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "400px",
        }}
      >
        <div className="absolute  inset-0 bg-black/10 rounded-2xl">
          <h1 className="relative text-center font-bold text-secondary text-3xl md:text-4xl drop-shadow-lg mt-2">
            GoCart Support on YouTube
          </h1>
        </div>
      </div>

      <div className=" mt-10 p-10 rounded-2xl  bg-gray-100">
        <h1 className="text-3xl font-bold text-secondary text-center">
          My Support
        </h1>
        <p className="text-center font-medium text-black">
          Get warranty information, check your coverage status, or look up an
          existing repair.
        </p>
      </div>
      <div className=" mt-10 rounded-2xl flex flex-col gap-8 pt-10 mb-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-secondary text-center">
          Handled with AppleCare
        </h1>
        <p className="text-center font-medium text-black p-4">
          Every AppleCare plan provides one-stop service for your Apple
          products, with quick and easy repairs for accidents like drops and
          spills. You’re also covered if your iPhone, iPad, or Apple Watch is
          lost or stolen.
        </p>
        <img src={assets.care} className="w-full" alt="" />
      </div>
      <Footer />
    </div>
  );
}

export default Support;
