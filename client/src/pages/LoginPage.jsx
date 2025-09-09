import React, { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  // Handle Submit
  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Step 1 → Move to bio input
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    // Step 2 or Login → Final submit
    if (currState === "Sign up" && isDataSubmitted) {
      console.log("Creating account with:", { fullName, email, password, bio });
    } else {
      console.log("Logging in with:", { email, password });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center gap-10 sm:justify-evenly max-sm:flex-col px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-2xl"
        style={{ backgroundImage: `url(${assets.bgImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Left: Logo */}
      <img
        src={assets.logo_big}
        alt="Logo"
        className="relative z-10 w-[min(28vw,220px)] drop-shadow-xl"
      />

      {/* Right: Form */}
      <form
        onSubmit={onSubmitHandler}
        className="relative z-10 w-[350px] border border-gray-600 bg-black/30 text-white p-6 flex flex-col gap-5 rounded-2xl shadow-2xl backdrop-blur-xl"
      >
        {/* Header */}
        <h2 className="font-semibold text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              src={assets.arrow_icon}
              alt="Back"
              className="w-6 h-6 cursor-pointer opacity-80 hover:opacity-100"
              onClick={() => setIsDataSubmitted(false)}
            />
          )}
        </h2>

        {/* Step 1 - Sign up inputs */}
        {currState === "Sign up" && !isDataSubmitted && (
          <>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              className="p-3 rounded-lg bg-black/40 border border-gray-500 placeholder-gray-400 focus:outline-none focus:border-purple-400"
              placeholder="Full Name"
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-3 rounded-lg bg-black/40 border border-gray-500 placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-3 rounded-lg bg-black/40 border border-gray-500 placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
          </>
        )}

        {/* Step 2 - Bio input */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Provide a short bio..."
            rows="4"
            className="p-3 rounded-lg bg-black/40 border border-gray-500 placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
        )}

        {/* Login Inputs */}
        {currState === "Login" && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-3 rounded-lg bg-black/40 border border-gray-500 placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-3 rounded-lg bg-black/40 border border-gray-500 placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-violet-600 hover:opacity-90 transition"
        >
          {currState === "Sign up"
            ? isDataSubmitted
              ? "Finish Signup"
              : "Create Account"
            : "Login Now"}
        </button>

        {/* Terms */}
        {currState === "Sign up" && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}

        {/* Toggle State */}
        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-400 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Create an account{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className="font-medium text-violet-400 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
