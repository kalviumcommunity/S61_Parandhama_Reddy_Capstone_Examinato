/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import backgroundImage from "../Assets/backgroundImage.png";
import logo from "../Assets/logo.svg";
import { Box } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <div
      className="h-screen w-screen relative font-roboto-serif"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "auto",
      }}
    >
      <div className="flex justify-between px-14 py-10">
        <img src={logo} alt="Logo" className="h-[50px]" />
        <div className="flex gap-10 text-[20px]">
          <p>About</p>
          <p>Contact</p>
          <p onClick={handleSignInClick} className="cursor-pointer">Sign in</p>
        </div>
      </div>
      <Box
        className="bg-red-300"
        position="absolute"
        top="40%"
        left="8.5%"
        transform="translate(-50%, -50%) rotate(90deg)"
        width="30%"
        height="30%"
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          boxShadow: "7px 9px 12px -1px rgba(235,202,202,0.59)",
        }}
      />
      <div className="relative top-22 left-20 text-wrap w-[38%] text-xl">
        <h2>
          <strong>Welcome to Examinato!</strong>
        </h2>
        <br />
        <p>
          At Examinato, we're redefining the way you learn, assess, and engage
          with quizzes. Whether you're a student gearing up for exams or an
          educator looking to make assessments more interactive, Examinato is
          your all-in-one platform for seamless learning experiences.
        </p>
      </div>
      <div className="absolute top-22 left-[60%] text-wrap w-[38%] text-xl">
        <h2>
          <strong>For Students:</strong>
        </h2>
        <br />
        <p>
          Unlock your potential with our extensive collection of quizzes
          spanning various subjects and difficulty levels. From math to
          literature, history to science, our quizzes are designed to challenge
          and inspire, helping you grasp concepts effectively and excel in your
          studies.
        </p>
      </div>
      <div className="absolute top-[60%] left-20 text-wrap w-[38%] text-xl">
        <h2>
          <strong>For Educators:</strong>
        </h2>
        <br />
        <p>
          Create interactive quizzes tailored to your curriculum and teaching
          style. Engage your students with multimedia-rich questions, instant
          feedback, and customizable settings. With Examinato, assessment
          becomes an opportunity for collaborative learning and meaningful
          feedback.
        </p>
      </div>
      <div className="relative top-[60%] left-[18%] text-wrap w-[22%] text-xl text-center">
        <h2>
          <strong>Key Features:</strong>
        </h2>
        <br />
        <p>
          • Create and Host Quizzes • Play and compete • Real-time Analytics •
          Customization Options • Mobile Friendly
        </p>
      </div>
      <div className="fixed left-[70%] top-[75%] w-[20%] shadow-md rounded-[10px]">
        <div 
          className="flex justify-center items-center bg-[#EF233CBD] p-5 rounded-[10px] text-[20px] cursor-pointer" 
          onClick={handleGetStartedClick}
        >
          Get Started <FaArrowRightLong />
        </div>
      </div>
      <footer className="relative top-[75%] w-full bg-red-300 p-3">
        <div className="flex justify-evenly">
          <p>FAQS or Help Center</p>
          <p><strong>Privacy Policy</strong> and <strong>Terms of Service</strong></p>
        </div>
        <div className="text-center">
          <p>© 2024 Examinato, All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
