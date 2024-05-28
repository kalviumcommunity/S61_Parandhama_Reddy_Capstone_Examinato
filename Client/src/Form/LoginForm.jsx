/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import loginImg from "../Assets/LoginImg.jpg";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  const handleSignupClick = () => {
    navigate("/signin");
  };

  return (
    <div className="bg-[#FFD60A] h-screen w-screen flex justify-center items-center font-roboto-serif">
      <div
        className="bg-cover bg-center h-[85%] w-[90%] rounded-[20px] shadow-xl"
        style={{ backgroundImage: `url(${loginImg})` }}
      >
        <div className="bg-[#FEE440] h-[85%] w-[30%] m-0 absolute right-[5%] rounded-2xl">
          <form className="flex-col" onSubmit={handleLogin}>
            <p className="m-5 text-center text-2xl p-2">
              <strong>Login to your Account</strong>
            </p>
            <div className="px-5">
              <label className="text-[#9E9C9C]">Email</label>
            </div>

            <div className="px-5 py-2 text-sm">
              <input
                className="w-[75%] border-[2px] border-slate-400 rounded-[8px] px-3 py-2"
                type="email"
                placeholder="Enter your Email here"
              />
            </div>

            <div className="px-5">
              <label className="text-[#9E9C9C]">Password</label>
            </div>
            <div className="px-5 py-2 text-sm">
              <input
                className="w-[75%] border-[2px] border-slate-400 rounded-[8px] px-3 py-2"
                type="password"
                placeholder="Enter your Password"
              />
            </div>
            <div className="relative left-24 top-5 pb-10">
              <button
                onClick={handleLogin}
                className="rounded-2xl bg-black text-white px-8 py-3"
              >
                Login
              </button>
            </div>
            <br />
            <div className="absolute left-[5%] border-black border-[1px] w-[90%]"></div>
            <div className="flex justify-center items-center pb-5">
              <div className="flex p-5">
                <FcGoogle className="m-5 h-10 w-10" />
                <FaApple className="m-5 h-10 w-10" />
                <FaGithub className="m-5 h-10 w-10" />
                <FaXTwitter className="m-5 h-10 w-10" />
              </div>
            </div>
            <p className="text-center">
              Don't Have an Account?{" "}
              <span className="text-[#F81212] cursor-pointer" onClick={handleSignupClick}>
                <strong> Sign Up</strong>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
