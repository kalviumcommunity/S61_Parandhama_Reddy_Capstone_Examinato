/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <nav className="border-2 border-black rounded-2xl sticky bg-white flex justify-between p-3 m-5 ">
      <img
        src={logo}
        alt="Logo"
        className="h-[50px] cursor-pointer "
        onClick={handleHomeClick()}
      />
      <div className="flex justify-end items-center gap-[20px] mr-3 ">
        <p className="cursor-pointer">
          About
        </p>
        <p className="cursor-pointer">
          Contact
        </p>
        <button className="bg-black text-white w-[75%] p-2 rounded-2xl" onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
