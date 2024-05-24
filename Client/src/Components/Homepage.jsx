/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const HomePage = ({ topics, onStartQuiz }) => {
  return (
    <>
      <div className="flex justify-center items-center gap-20 m-10">
        <button className="p-4 text-white bg-black text-center rounded-xl ">
          Create Quiz
        </button>
        <button className="p-4 text-white bg-black text-center rounded-xl ">
          Join Quiz
        </button>
      </div>
      <div className="flex justify-center items-center  ">
        <input type="text" placeholder="Enter type of Quiz" className="border-[1px] border-black w-[50%] p-2 rounded-xl shadow-inner " />
      </div>
      <div
        style={{
          padding: "20px",
          borderRadius: "5px",
        }}
        className="shadow-container"
      >
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          {topics.map((topic, index) => (
            <div key={index} className="flex justify-between items-center m-5 ">
              <h3 style={{ textAlign: "center" }}>{topic.name}</h3>
              <button
                type="button"
                onClick={() => onStartQuiz(topic)}
                style={{
                  display: "block",
                  width: "20%",
                  padding: "10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
