import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContextData } from "../context/AppContext";

function Login() {

  const {formData, setFormData} = useContext(AppContextData)

  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); 
  const handleOpen = () => setOpen(!open);
  const handleToggleMode = () => setIsSignUp(!isSignUp);
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData((prev => ({...prev, [name] : value})));
    };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isSignUp) {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Signup failed");

      const data = await response.json();
      console.log("✅ User signed up:", data);
      alert("Signup successful!");
      setOpen(false);
    } catch (error) {
      console.error("❌ Error signing up:", error);
    }
  } else {
    
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${formData.email}&password=${formData.password}`
      );
      const users = await response.json();

      if (users.length > 0) {
        console.log("✅ Login successful:", users[0]);
        alert(`Welcome back, ${users[0].userName}!`);
        setOpen(false);
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error("❌ Error logging in:", error);
    }
  }
};

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-32 h-10 bg-primary rounded-2xl font-bold text-white cursor-pointer"
      >
        {isSignUp ? "Signup" : "Login"}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
          <div className="bg-black/90 rounded-2xl w-86 lg:w-full max-w-md shadow-2xl p-6 relative">
            <button
              onClick={handleOpen}
              className="absolute top-3 right-3 text-gray-500 hover:text-white text-2xl bg-gray-200/10 w-8 h-8 rounded-full text-center cursor-pointer"
            >
              &times;
            </button>

            <form className="px-2" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center text-white">
                {isSignUp ? "Create an account" : "Sign in to your account"}
              </h1>

              {isSignUp && (
                <div className="flex flex-col items-center justify-center gap-3 mt-8">
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="User name"
                    className="w-full h-10 bg-gray-200/10 rounded-lg placeholder-white text-white pl-2 placeholder:text-sm"
                  />
                </div>
              )}
              <div className="mt-4 flex flex-col gap-2">
                <input
                  type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-10 bg-gray-200/10 rounded-lg placeholder-white placeholder:text-sm text-white pl-2"
                />
                <input
                  name="password"
                    value={formData.password}
                    onChange={handleChange}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-10 bg-gray-200/10 rounded-lg placeholder-white text-white pl-2 placeholder:text-sm"
                />

                <button type="submit" className="w-full h-10 bg-white font-bold rounded-lg mt-4 cursor-pointer">
                  {isSignUp ? "Create account" : "Sign in"}
                </button>
              </div>

              <div className="flex gap-4 mt-4 items-center">
                <div className="md:w-1/3 w-1/4 bg-primary h-1"></div>
                <h1 className="text-xs text-gray-200/80">OR SIGN IN WITH</h1>
                <div className="md:w-1/3 w-1/4 bg-primary h-1"></div>
              </div>

              <div className="flex gap-3 mt-4">
                <div className="w-1/2 bg-gray-200/10 rounded-md h-10 flex items-center justify-center">
                  <img
                    src={assets.google}
                    width={20}
                    height={20}
                    alt="Google"
                  />
                </div>
                <div className="w-1/2 bg-gray-200/10 rounded-md h-10 flex items-center justify-center">
                  <img
                    src={assets.apple}
                    width={30}
                    height={30}
                    alt="Apple"
                    className="bg-white rounded-full w-6 h-6 p-0.5"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-200/70 text-center pt-6">
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <span
                      className="text-primary/80 font-bold text-sm cursor-pointer"
                      onClick={handleToggleMode}
                    >
                      Sign in
                    </span>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <span
                      className="text-primary/80 font-bold text-sm cursor-pointer"
                      onClick={handleToggleMode}
                    >
                      Sign up
                    </span>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
