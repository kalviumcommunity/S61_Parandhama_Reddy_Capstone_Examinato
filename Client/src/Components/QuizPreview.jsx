/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const QuizPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizData } = location.state || { quizData: { questions: [] } };
  const { questions } = quizData;

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="p-2 bg-white drop-shadow-lg sticky top-0 rounded-3xl">
        <FaArrowLeft className="h-8 w-20 cursor-pointer" onClick={handleHomeClick} />
      </div>
      <div className="p-10 bg-[#E9EDC9]">
        <div className="bg-[#E9EDC9] flex gap-5 box-border">
          <div className="flex-col justify-center items-center text-center w-full gap-5 p-5 bg-white border h-auto overflow-hidden shadow-lg rounded">
            {questions.map((q, index) => (
              <div
                key={index}
                className="flex-col justify-center border-[1px] p-10"
              >
                <div className="mb-5 font-bold">
                  {typeof q.question === "string" &&
                  q.question.startsWith("data:image/") ? (
                    <img
                      src={q.question}
                      alt={`Question ${index + 1}`}
                      className="h-[25vh] ml-96"
                    />
                  ) : (
                    q.question
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex justify-center items-center"
                    >
                      {typeof opt === "string" &&
                      opt.startsWith("data:image/") ? (
                        <img
                          src={opt}
                          alt={`Option ${optIndex + 1}`}
                          className="h-[20vh]"
                        />
                      ) : (
                        <button className="bg-black text-white w-[50%] p-4 rounded-2xl">
                          {opt}
                        </button>
                      )}
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
