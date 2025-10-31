import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
function Login() {
  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <button
        onClick={handleOpen}
        className="w-32 h-10 bg-primary rounded-2xl font-bold text-white cursor-pointer"
      >
        Signup
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
          <div className="bg-black/90 rounded-2xl w-86 lg:w-full max-w-md  shadow-2xl p-6 relative">
            <button
              onClick={handleOpen}
              className="absolute top-3 right-3 text-gray-500 hover:text-white text-2xl bg-gray-200/10 w-8 h-8 rounded-full text-center cursor-pointer "
            >
              &times;
            </button>
            <form action="" className="px-2">
              <h1 className="text-2xl font-bold text-center text-white">
                Create an account
              </h1>
              <div className="flex flex-col  items-center justify-center gap-3 mt-8">
                <input
                  type="text"
                  placeholder="User name"
                  className="w-full h-10  bg-gray-200/10 rounded-lg placeholder-white text-white pl-2 placeholder:text-sm"
                />
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-10 bg-gray-200/10 rounded-lg placeholder-white placeholder:text-sm text-white pl-2"
                />
                <input
                  type=""
                  placeholder="Enter your password"
                  className="w-full h-10 bg-gray-200/10 rounded-lg placeholder-white text-white pl-2 placeholder:text-sm"
                />
                <button className="w-full h-10 bg-white font-bold rounded-lg mt-4 cursor-pointer">
                  Create an account
                </button>
              </div>
              <div className="flex gap-4 mt-4 items-center">
                <div className="md:w-1/3 w-1/4 bg-primary h-1"></div>
                <h1 className="text-xs text-gray-200/80">OR SIGN IN WITH</h1>
                <div className="md:w-1/3 w-1/4 bg-primary h-1"></div>
              </div>
              <div className="flex gap-3 mt-4">
                <div className="w-1/2 bg-gray-200/10 rounded-md h-10 flex items-center justify-center">
                  <img src={assets.google} width={20} height={20} alt="" />
                </div>
                <div className="w-1/2 bg-gray-200/10 rounded-md h-10 flex items-center justify-center">
                  <img
                    src={assets.apple}
                    width={30}
                    height={30}
                    alt=""
                    className="bg-white rounded-full w-6 h-6 p-0.5"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-200/70 text-center pt-6">
                Already have an Account?{" "}
                <span className="text-primary/80 font-bold text-sm cursor-pointer">
                  Sign in
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
