/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { otpGen } from "otp-gen-agent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PinVerification = () => {
  const [pin, setPin] = useState("");
  const [pinEntered, setPinEntered] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");

  const generateOTP = () => {
    otpGen().then((otp) => {
      setGeneratedOTP(otp);
      toast(otp, {
        autoClose: 10000,
        position: "top-right",
      });
      console.log(otp);
    });
    const handlePinChange = (e) => {
      setPin(e.target.value);
    };

    const handlePinSubmit = (e) => {
      e.preventDefault();
      if (pin === generatedOTP) {
        setPinEntered(true);
        toast.success("PIN Verified!");
      } else {
        toast.error("Invalid PIN! Please try again.");
      }
    };
  };
  return <div>PinVerification</div>;
};

export default PinVerification;
