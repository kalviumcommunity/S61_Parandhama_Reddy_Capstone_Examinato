/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import loginImg from "../Assets/loginImg.png";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  const handleSignupClick = () => {
    navigate("/signin");
  };

  return (
    <div className="bg-[#FFD60A] h-screen w-screen flex justify-center items-center">
      <div
        className="bg-cover bg-center h-[90%] w-[90%] rounded-[20px]"
        style={{ backgroundImage: `url(${loginImg})` }}
      >
        <p className="text-3xl absolute top-[55%] left-[25%] font-roboto-serif">
          <strong>Login</strong>
        </p>
        <div className="bg-[#FEE440] h-[90%] w-[30%] m-0 absolute top-10 right-[5%] rounded-xl">
          <form className="flex-col" onSubmit={handleLogin}>
            <h1 className="m-5 text-center text-2xl p-2 font-roboto-serif">
              <strong>Login to your Account</strong>
            </h1>
            <label className="m-5 text-[#9E9C9C]">Email</label>
            <br />
            <input
              className="border-[2px] border-black rounded-[10px] m-5"
              type="email"
              placeholder="Email"
            />
            <br />
            <label className="m-5 text-[#9E9C9C]">Password</label>
            <br />
            <input
              className="border-[2px] border-black rounded-[10px] m-5"
              type="password"
              placeholder="Password"
            />
            <br />
            <button className="rounded-xl bg-black text-white px-5 py-[5px] m-5">
              Log In
            </button>
            <br />
            <div className="border-black border-[1px] w-[50%]"></div>
            <div className="flex">
              <FcGoogle className="m-5 h-10 w-10" />
              <FaApple className="m-5 h-10 w-10" />
              <FaGithub className="m-5 h-10 w-10" />
              <FaXTwitter className="m-5 h-10 w-10" />
            </div>
            <p>
              Don't Have an Account?{" "}
              <span className="text-[#F81212]" onClick={handleSignupClick}>
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
