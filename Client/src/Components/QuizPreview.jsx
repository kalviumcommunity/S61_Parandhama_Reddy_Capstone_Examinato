/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

const QuizPreview = ({ questions }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="p-2 bg-white drop-shadow-lg sticky top-0 rounded-3xl">
        <button onClick={handleHomeClick}>Back To Home</button>
      </div>
      <div className="p-20 bg-[#E9EDC9]">
        <div className="bg-[#E9EDC9] flex gap-5 box-border">
          <div className="flex-col justify-center items-center text-center w-full gap-5 p-5 bg-white border h-auto overflow-hidden shadow-lg rounded">
            {questions.map((q, index) => (
              <div key={index} className="border-[1px] p-10 mb-4">
                <div className="mb-5 font-bold">{q.question}</div>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex}>
                      <button className="bg-black text-white w-[50%] p-4 rounded-2xl">
                        {opt}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
