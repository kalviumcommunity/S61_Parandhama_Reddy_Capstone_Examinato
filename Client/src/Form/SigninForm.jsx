/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import SignInImg from "../Assets/SignInImg.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SigninForm = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      toast.error("Error during signup!");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8000/auth/github";
  };

  return (
    <div className="bg-[#FFD60A] h-screen w-screen flex justify-center items-center font-roboto-serif">
      <div
        className="bg-cover bg-center h-[85%] w-[90%] rounded-[20px] shadow-md"
        style={{ backgroundImage: `url(${SignInImg})` }}
      >
        <p className="text-3xl absolute top-[55%] left-[25%]">
          <strong>Sign Up!</strong>
        </p>
        <div className="bg-[#FEE440] h-[85%] w-[30%] m-0 absolute right-[5%] rounded-2xl">
          <form onSubmit={handleSubmit}>
            <p className="m-5 text-center text-2xl p-2">
              <strong>Create your Account</strong>
            </p>
            <div className="px-5">
              <label className="text-[#9E9C9C]">Full Name</label>
            </div>
            <div className="px-5 py-2 text-sm">
              <input
                className="w-[75%] border-[2px] border-slate-400 rounded-[8px] px-3 py-2"
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="px-5">
              <label className="text-[#9E9C9C]">Email</label>
            </div>
            <div className="px-5 py-2 text-sm">
              <input
                className="w-[75%] border-[2px] border-slate-400 rounded-[8px] px-3 py-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="px-5">
              <label className="text-[#9E9C9C]">Password</label>
            </div>
            <div className="px-5 py-2 text-sm">
              <input
                className="w-[75%] border-[2px] border-slate-400 rounded-[8px] px-3 py-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="px-5">
              <label className="text-[#9E9C9C]">Confirm Password</label>
            </div>
            <div className="px-5 py-2 text-sm">
              <input
                className="w-[75%] border-[2px] border-slate-400 rounded-[8px] px-3 py-2"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="relative left-24 top-5 pb-10">
              <button
                type="submit"
                className="rounded-2xl bg-black text-white px-8 py-3"
              >
                Sign Up
              </button>
            </div>
            <br />
            <div className="absolute left-[5%] border-black border-[1px] w-[90%]"></div>
            <div className="flex justify-center items-center pb-5">
              <div className="flex">
                <FcGoogle
                  cursor={"pointer"}
                  onClick={handleGoogleLogin}
                  className="m-5 h-10 w-10"
                />
                <FaGithub
                  cursor={"pointer"}
                  onClick={handleGithubLogin}
                  className="m-5 h-10 w-10"
                />
              </div>
            </div>
            <p className="text-center">
              Already have an account?{" "}
              <strong
                onClick={handleLogin}
                className="text-[#F81212] cursor-pointer"
              >
                Log In
              </strong>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SigninForm;
