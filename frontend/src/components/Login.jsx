import React, { useState, useContext } from "react";
import { AppContextData } from "../context/AppContext";
import swal from "sweetalert";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { formData, setFormData, setUser, backendUrl } =
    useContext(AppContextData);

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleOpen = () => setOpen(!open);
  const handleToggleMode = () => setIsSignUp(!isSignUp);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!formData.email || !formData.password) {
      swal("⚠️ Missing Fields", "Please fill all fields.", "warning");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      swal("⚠️ Invalid Email", "Enter a valid email.", "warning");
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      swal(
        "⚠️ Weak Password",
        "Password must be at least 6 characters and contain letters & numbers.",
        "warning",
      );
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!formData.userName) {
      return swal("⚠️ Missing Username", "Enter your name.", "warning");
    }

    if (!validate()) return;

    try {
      const { data } = await axios.post(`${backendUrl}/users/register`, {
        username: formData.userName,
        email: formData.email,
        password: formData.password,
      });

      setUser({ ...data.data, token: data.data.token });
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.data.token);

      swal("✅ Account Created", "Signup Successful!", "success");
      setFormData({ userName: "", email: "", password: "" });
      setOpen(false);
    } catch (err) {
      swal("❌ Error", err.response.data.message || "Signup failed", "error");
    }
  };
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const { data } = await axios.post(`${backendUrl}/users/login`, {
        email: formData.email,
        password: formData.password,
      });

      setUser({ ...data.data, token: data.data.token });
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.data.token);

      swal("✅ Welcome!", `Logged in as ${data.data.username}`, "success");
      setFormData({ userName: "", email: "", password: "" });
      setOpen(false);

      navigate("/", { replace: true });
    } catch (err) {
      swal(
        "❌ Login Failed",
        err.response?.data?.message || "Invalid credentials",
        "error",
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp ? handleSignup() : handleLogin();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-32 h-10 bg-primary rounded-2xl font-bold text-white"
      >
        {isSignUp ? "Signup" : "Login"}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
          <div className="bg-black/90 rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={handleOpen}
              className="absolute top-3 right-3 text-white text-2xl"
            >
              &times;
            </button>

            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center text-white">
                {isSignUp ? "Create an account" : "Sign in"}
              </h1>

              {isSignUp && (
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="User name"
                  className="mt-6 w-full h-10 bg-gray-200/10 text-white pl-2 rounded-lg"
                />
              )}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mt-4 w-full h-10 bg-gray-200/10 text-white pl-2 rounded-lg"
              />

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-10 bg-gray-200/10 text-white pl-2 pr-10 rounded-lg"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-white font-bold rounded-lg mt-4"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>

              <p className="text-xs text-gray-300 text-center pt-6">
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <span
                      onClick={handleToggleMode}
                      className="cursor-pointer text-primary"
                    >
                      Sign in
                    </span>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <span
                      onClick={handleToggleMode}
                      className="cursor-pointer text-primary"
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
