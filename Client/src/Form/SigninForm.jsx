/* eslint-disable no-unused-vars */
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import SignInImg from "../Assets/SignInImg.png";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/home");
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8000/auth/github";
  };

  return (
    <div className="bg-[#FFD60A] h-screen w-screen flex justify-center items-center  font-roboto-serif ">
      <div
        className="bg-cover bg-center h-[85%] w-[90%] rounded-[20px] shadow-md "
        style={{ backgroundImage: `url(${SignInImg})` }}
      >
        <p className="text-3xl absolute top-[55%] left-[25%] ">
          <strong>Sign Up!</strong>
        </p>
        <div className="bg-[#FEE440] h-[85%] w-[30%] m-0 absolute right-[5%] rounded-2xl ">
          <form>
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
              />
            </div>

            <div className="relative left-24 top-5 pb-10">
              <button
                onClick={handleSignup}
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
                  className="m-5 h-10 w-10 "
                />
                <FaGithub
                  cursor={"pointer"}
                  onClick={handleGithubLogin}
                  className="m-5 h-10 w-10 "
                />
              </div>
            </div>
            <p className="text-center">
              Already Have an Account?{" "}
              <span
                className="text-[#F81212] cursor-pointer"
                onClick={handleLogin}
              >
                <strong>Login</strong>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
