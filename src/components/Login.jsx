import React, { useState, useContext } from "react";
import { AppContextData } from "../context/AppContext";
import swal from "sweetalert";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const { formData, setFormData, setUser } = useContext(AppContextData);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleOpen = () => setOpen(!open);
  const handleToggleMode = () => setIsSignUp(!isSignUp);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Common Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email pattern
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/; // at least 6 chars, 1 letter + 1 number

    // ----------------------------
    // SIGNUP LOGIC
    // ----------------------------
    if (isSignUp) {
      if (!formData.userName || !formData.email || !formData.password) {
        return swal(
          "⚠️ Fill all fields",
          "Please complete the form",
          "warning"
        );
      }

      if (!emailRegex.test(formData.email)) {
        return swal(
          "⚠️ Invalid Email",
          "Please enter a valid email address",
          "warning"
        );
      }

      if (!passwordRegex.test(formData.password)) {
        return swal(
          "⚠️ Weak Password",
          "Password must be at least 6 characters and contain at least one number and one letter.",
          "warning"
        );
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/users",
          formData
        );
        const data = response.data;

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setFormData({ userName: "", email: "", password: "" });

        swal(
          "✅ Signup Successful!",
          "Your account has been created.",
          "success"
        );
        setOpen(false);
      } catch (error) {
        swal("❌ Signup Failed!", "Something went wrong.", "error");
        console.error("Error signing up:", error);
      }
    } else {
      // ----------------------------
      // LOGIN LOGIC
      // ----------------------------
      if (!formData.email || !formData.password) {
        return swal(
          "⚠️ Missing Fields",
          "Please enter both email and password.",
          "warning"
        );
      }

      if (!emailRegex.test(formData.email)) {
        return swal(
          "⚠️ Invalid Email",
          "Please enter a valid email address",
          "warning"
        );
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/users?email=${formData.email}&password=${formData.password}`
        );
        const users = response.data;

        if (users.length > 0) {
          const user = users[0];
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          setFormData({ userName: "", email: "", password: "" });

          swal(
            "✅ Login Successful!",
            `Welcome back, ${user.userName}!`,
            "success"
          );
          setOpen(false);
        } else {
          swal(
            "❌ Invalid Credentials",
            "Email or Password is incorrect",
            "error"
          );
        }
      } catch (error) {
        swal("⚠️ Login Error", "Server not responding", "warning");
        console.error("Error logging in:", error);
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
          <div className="bg-black/90 rounded-2xl max-w-md w-full shadow-2xl p-6 relative">
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
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="User name"
                  className="mt-6 w-full h-10 bg-gray-200/10 rounded-lg placeholder-white text-white pl-2 placeholder:text-sm"
                />
              )}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-4 w-full h-10 bg-gray-200/10 rounded-lg placeholder-white text-white pl-2 placeholder:text-sm"
              />
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-10 bg-gray-200/10 rounded-lg placeholder-white text-white pl-2 pr-10 placeholder:text-sm"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-white font-bold rounded-lg mt-4 cursor-pointer"
              >
                {isSignUp ? "Create account" : "Sign in"}
              </button>

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
