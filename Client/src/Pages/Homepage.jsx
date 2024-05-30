/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const HomePage = ({ topics, onStartQuiz }) => {
  const navigate = useNavigate();

  const handleJoinQuiz = () => {
    navigate("/pin-verification");
  };

  return (
    <>
      <div className=" px-3 py-5 sticky top-0">
        <Navbar />
      </div>
      <div className="flex justify-center items-center gap-20 m-10 font-roboto-serif">
        <Link to={"/create-quiz"}>
          <button className="p-4 text-white bg-black text-center rounded-xl">
            Create Quiz
          </button>
        </Link>
        <button
          onClick={handleJoinQuiz}
          className="p-4 text-white bg-black text-center rounded-xl"
        >
          Join Quiz
        </button>
      </div>
      <div className="flex justify-center items-center font-roboto-serif">
        <input
          type="text"
          placeholder="Enter type of Quiz"
          className="border-[1px] border-black w-[50%] p-2 rounded-xl shadow-inner"
        />
      </div>
      <div
        style={{
          padding: "20px",
          borderRadius: "5px",
        }}
        className="shadow-container"
      >
        <div
          className="font-roboto-serif"
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          {topics.map((topic, index) => (
            <div key={index} className="border-b-[1px] border-b-black px-5">
              <div className="flex justify-between items-center m-5">
                <h3 style={{ textAlign: "center" }}>
                  <strong>{topic.name}</strong>
                </h3>
                <button
                  type="button"
                  onClick={() => onStartQuiz(topic)}
                  style={{
                    display: "block",
                    width: "10%",
                    padding: "10px",
                    backgroundColor: "#FF0000",
                    color: "#000000",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
