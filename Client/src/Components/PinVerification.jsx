import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CgSpinner } from "react-icons/cg";

const PinVerification = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const generateOTP = () => {
    setLoading(true);

    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible", callback: (response) => console.log(response) },
        auth
      );

      const formatPh = "+" + ph;

      signInWithPhoneNumber(auth, formatPh, recaptchaVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sent successfully!");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error sending OTP:", error);
          toast.error("Failed to send OTP. Please try again.");
        });
    } catch (error) {
      setLoading(false);
      console.error("Error initializing reCAPTCHA:", error);
      toast.error("Failed to initialize reCAPTCHA. Please try again.");
    }
  };

  const handleOTPVerify = () => {
    setLoading(true);
    if (window.confirmationResult) {
      window.confirmationResult
        .confirm(otp)
        .then((res) => {
          setLoading(false);
          toast.success("PIN Verified!");
          navigate("/quizzes");
        })
        .catch((err) => {
          setLoading(false);
          console.error("Error verifying OTP:", err);
          toast.error("Invalid OTP. Please try again.");
        });
    } else {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Please enter your Phone Number to get the code
      </h1>
      <div id="recaptcha-container"></div>
      {showOTP ? (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center"
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            disabled={false}
            autoFocus
            className="otp-container mb-4"
          />
          <button
            onClick={handleOTPVerify}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {loading && <CgSpinner speed="0.45s" size={20} />}
            <span>Verify OTP</span>
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center"
        >
          <PhoneInput
            country={"in"}
            value={ph}
            onChange={setPh}
            containerStyle={{ marginBottom: "16px" }}
          />
          <button
            onClick={generateOTP}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            {loading && <CgSpinner speed="0.45s" size={20} />}
            <span>Send OTP</span>
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default PinVerification;
