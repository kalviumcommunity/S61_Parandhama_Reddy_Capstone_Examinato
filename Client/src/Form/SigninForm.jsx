/* eslint-disable no-unused-vars */
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SignInImg from "../Assets/SignInImg.png";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#FFD60A] h-screen w-screen flex justify-center items-center ">
      <div
        className="bg-cover bg-center h-[90%] w-[90%] rounded-[20px] "
        style={{ backgroundImage: `url(${SignInImg})` }}
      >
        <p className="text-3xl absolute top-[55%] left-[25%] font-roboto-serif ">
          <strong>Sign Up!</strong>
        </p>
        <div className="bg-[#FEE440] h-[90%] w-[30%] m-0 absolute top-10 right-[5%] rounded-xl ">
          <form>
            <h1 className="m-5">Create your Account</h1>
            <label className="m-5">Full Name</label>
            <br />
            <input
              className="border-[2px] border-black rounded-[10px] m-5 "
              type="text"
              placeholder="Full Name"
            />
            <br />
            <label className="m-5">Email</label>
            <br />
            <input
              className="border-[2px] border-black rounded-[10px] m-5 "
              type="email"
              placeholder="Email"
            />
            <br />
            <label className="m-5">Password</label>
            <br />
            <input
              className="border-[2px] border-black rounded-[10px] m-5 "
              type="password"
              placeholder="Password"
            />
            <br />
            <label className="m-5">Confirm Password</label>
            <br />
            <input
              className="border-[2px] border-black rounded-[10px] m-5 "
              type="password"
              placeholder="Confirm Password"
            />
            <br />
            <button className="rounded-xl bg-black text-white px-5 py-[5px] m-5 ">
              Sign Up
            </button>
            <br />
            <div className="border-black border-[1px] w-[50%] "></div>
            <div className="flex">
              <FcGoogle className="m-5 h-10 w-10 " />
              <FaApple className="m-5 h-10 w-10 " />
              <FaGithub className="m-5 h-10 w-10 " />
              <FaXTwitter className="m-5 h-10 w-10 " />
            </div>
            <p>
              Already Have an Account? <span onClick={handleSignup}>Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
