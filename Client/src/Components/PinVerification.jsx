/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { otpGen } from "otp-gen-agent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PinVerification = () => {
  const [pin, setPin] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const navigate = useNavigate();

  const generateOTP = () => {
    otpGen().then((otp) => {
      setGeneratedOTP(otp);
      toast(otp, {
        autoClose: 10000,
        position: "top-right",
      });
      // console.log(otp);
    });
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === generatedOTP) {
      toast.success("PIN Verified!");
      navigate("/quizzes");
    } else {
      toast.error("Invalid PIN! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Enter PIN</h1>
      <form onSubmit={handlePinSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={pin}
          onChange={handlePinChange}
          placeholder="Enter PIN"
          className="border-2 border-gray-300 p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Verify PIN
        </button>
      </form>
      <button
        onClick={generateOTP}
        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
      >
        Generate OTP
      </button>
      <ToastContainer />
    </div>
  );
};

export default PinVerification;
