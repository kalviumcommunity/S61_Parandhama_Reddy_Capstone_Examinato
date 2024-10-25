/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";

const QuizComponent = ({ handleAddQuestion }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", ""]);
  const [questionType, setQuestionType] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionFile, setQuestionFile] = useState(null);
  const [optionsFiles, setOptionsFiles] = useState(["", ""]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddOption = () => {
    if (currentOptions.length < 4) {
      setCurrentOptions((prev) => [...prev, ""]);
      setOptionsFiles((prev) => [...prev, ""]);
    }
  };

  const handleOptionChange = (index, value) => {
    setCurrentOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setQuestionFile(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleOptionFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOptionsFiles((prev) => {
          const updatedFiles = [...prev];
          updatedFiles[index] = e.target.result;
          return updatedFiles;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddQuestionClick = () => {
    const questionContent = questionFile || currentQuestion;
    const optionsContent = optionsFiles.some((file) => file)
      ? optionsFiles
      : currentOptions.filter((opt) => opt.trim() !== "");

    if (questionType.trim() && correctAnswer.trim()) {
      const newQuestion = {
        question: questionContent,
        options: optionsContent,
        type: questionType,
        correctAnswer: correctAnswer,
      };
      setQuestions((prev) => [...prev, newQuestion]);
      handleAddQuestion(newQuestion);
      resetForm();
    } else {
      alert("Please fill out the question type and correct answer fields!");
    }
  };

  const resetForm = () => {
    setCurrentQuestion("");
    setCurrentOptions(["", ""]);
    setQuestionType("");
    setCorrectAnswer("");
    setQuestionFile(null);
    setOptionsFiles(["", ""]);
  };

  const handlePostQuizToApi = async () => {
    const quizData = {
      id: Math.random().toString(36).substr(2, 9),
      title: " ",
      questions: questions.map(
        ({ question, options, correctAnswer, type }) => ({
          question,
          options,
          correctAnswer,
          type,
        })
      ),
    };

    try {
      navigate("/quiz-preview", { state: { quizData } });
    } catch (error) {
      console.error("Error posting quiz:", error);
    }
  };

  return (
    <div>
      <div className="p-2 bg-white drop-shadow-lg sticky top-0 rounded-3xl">
        <Navbar />
      </div>
      <div className="text-center font-bold text-red-600 p-2 sticky top-20 my-3">
        <h1>Please enter the correct answer in the format (Option x)</h1>
      </div>
      <div className="bg-[#E9EDC9] flex gap-5 h-screen p-5 box-border">
        <div className="flex-col justify-center items-center text-center w-[25%] gap-5 p-5 bg-white border h-auto overflow-hidden shadow-lg rounded">
          <strong>Preview</strong>
          {questions.map((q, index) => (
            <Card key={index} className="border-[1px] p-10 mb-4">
              <div className="mb-5 font-bold">
                {typeof q.question === "string" &&
                q.question.startsWith("data:image/") ? (
                  <img
                    src={q.question}
                    alt={`Question ${index + 1}`}
                    className="w-full"
                  />
                ) : (
                  q.question
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, optIndex) => (
                  <button
                    key={optIndex}
                    className="bg-black text-white p-2 rounded-2xl"
                  >
                    {typeof opt === "string" &&
                    opt.startsWith("data:image/") ? (
                      <img
                        src={opt}
                        alt={`Option ${optIndex + 1}`}
                        className="w-full"
                      />
                    ) : (
                      opt
                    )}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-5 rounded shadow-lg">
          <div className="flex gap-5 justify-center items-center">
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Enter the Question here or upload file"
              className="p-2 mb-4 border rounded w-[50%] border-black"
            />
            <h2>Or</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="rounded w-[50%] m-0"
            />
          </div>
          <input
            type="text"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            placeholder="Enter the Question Type"
            className="p-2 mb-4 border rounded w-[50%] border-black"
          />
          <div className="grid grid-cols-2 gap-5 mb-4">
            {currentOptions.map((opt, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="p-2 mb-2 border rounded"
                />
                <h2>Or</h2>
                <input
                  type="file"
                  onChange={(e) => handleOptionFileChange(index, e)}
                  className="rounded w-[50%] m-0"
                />
              </div>
            ))}
          </div>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Enter the Correct Answer"
            className="p-2 mb-4 border rounded w-[50%] border-black"
          />
          <div className="flex justify-center items-center gap-40">
            {currentOptions.length < 4 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-2"
              >
                Add Option
              </button>
            )}
            <button
              type="button"
              onClick={handleAddQuestionClick}
              className="w-full px-4 bg-blue-500 text-white rounded mt-2"
            >
              Add Question
            </button>
          </div>
          <div className="relative top-[-70%] left-[40%]">
            <button
              onClick={handlePostQuizToApi}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded"
            >
              Post Quiz
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsChatbotOpen(true)}
        >
          <img
            src="/path/to/chatbot-icon.png"
            alt="Chatbot"
            className="w-8 h-8"
          />
        </button>
      </div>
      {isChatbotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center">
          <div className="w-1/3 h-full bg-white shadow-lg p-4">
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsChatbotOpen(false)}
            >
              X
            </button>
            <Chatbot />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
