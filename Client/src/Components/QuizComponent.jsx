/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Card } from "@chakra-ui/react";
import Navbar from "./Navbar";

const QuizComponent = ({ handleAddQuestion }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", ""]);

  const handleAddOption = () => {
    if (currentOptions.length < 4) {
      setCurrentOptions([...currentOptions, ""]);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = value;
    setCurrentOptions(updatedOptions);
  };

  const handleAddQuestionClick = () => {
    if (
      currentQuestion.trim() !== "" &&
      currentOptions.some((opt) => opt.trim() !== "")
    ) {
      const newQuestion = {
        question: currentQuestion,
        options: currentOptions.filter((opt) => opt.trim() !== ""),
      };
      setQuestions([...questions, newQuestion]);
      handleAddQuestion(newQuestion);
      setCurrentQuestion("");
      setCurrentOptions(["", ""]);
    }
  };

  return (
    <div>
      <div className="p-2 bg-white drop-shadow-lg sticky top-0 rounded-3xl">
        <Navbar />
      </div>
      <div>
        <div className="bg-[#E9EDC9] flex gap-5 h-screen p-5 box-border">
          <div className="flex-col justify-center items-center text-center w-[25%] gap-5 p-5 bg-white border h-auto overflow-hidden shadow-lg rounded">
            {questions.map((q, index) => (
              <Card key={index} className="border-[1px] p-10 mb-4">
                <div className="mb-5 font-bold">{q.question}</div>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, optIndex) => (
                    <button
                      key={optIndex}
                      className="bg-black text-white p-2 rounded-2xl"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center items-center bg-white p-5 rounded shadow-lg">
            <div className="relative top-[-25%] left-[40%]">
              <button className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-2">
                Post Quiz
              </button>
            </div>
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Enter the Question here"
              className="p-2 mb-10 border rounded w-[50%] border-black "
            />
            <div className="grid grid-cols-2 gap-5">
              {currentOptions.slice(0, 4).map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="p-2 mb-2 border rounded"
                />
              ))}
            </div>
            <div className="flex justify-center items-center gap-40">
              <button
                type="button"
                onClick={handleAddOption}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-2"
              >
                Add Option
              </button>
              <button
                type="button"
                onClick={handleAddQuestionClick}
                className="w-full px-4 bg-blue-500 text-white rounded mt-2"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
