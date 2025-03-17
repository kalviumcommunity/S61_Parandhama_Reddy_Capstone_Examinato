/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Tooltip } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import {
  FaPlus,
  FaImage,
  FaCheck,
  FaRobot,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-4 bg-white drop-shadow-lg sticky top-0 z-10 rounded-b-xl">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm">
          <p className="flex items-center font-medium">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
            Please enter the correct answer in the format (Option x)
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Preview Section */}
          <div className="w-full md:w-1/3 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-4 bg-indigo-500 text-white font-semibold flex items-center justify-between">
              <span>Question Preview</span>
              <span className="bg-white text-indigo-500 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                {questions.length}
              </span>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {questions.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-400 py-10">
                  <svg
                    className="w-16 h-16 mb-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>No questions added yet</p>
                  <p className="text-sm">Questions will appear here</p>
                </div>
              ) : (
                questions.map((q, index) => (
                  <Card
                    key={index}
                    className="border bg-white p-4 mb-4 hover:shadow-md transition-shadow rounded-lg"
                  >
                    <div className="mb-4 font-medium text-gray-800">
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs mr-2">
                        Q{index + 1}
                      </span>
                      {typeof q.question === "string" &&
                      q.question.startsWith("data:image/") ? (
                        <div className="mt-2">
                          <img
                            src={q.question}
                            alt={`Question ${index + 1}`}
                            className="w-full rounded-md"
                          />
                        </div>
                      ) : (
                        <span>{q.question}</span>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Type: {q.type}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, optIndex) => (
                        <button
                          key={optIndex}
                          className={`${
                            q.correctAnswer === `Option ${optIndex + 1}`
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-gray-700 hover:bg-gray-800"
                          } text-white p-2 rounded-lg text-sm flex items-center justify-center transition-colors`}
                        >
                          {typeof opt === "string" &&
                          opt.startsWith("data:image/") ? (
                            <img
                              src={opt}
                              alt={`Option ${optIndex + 1}`}
                              className="w-full rounded"
                            />
                          ) : (
                            <span>{opt || `Option ${optIndex + 1}`}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Question Creation Form */}
          <div className="w-full md:w-2/3 bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Create New Question
            </h2>

            {/* Question Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Question
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Enter your question here"
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label className="inline-flex items-center px-3 rounded-r-lg h-full bg-gray-100 border-l border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
                    <FaImage className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Image</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              {questionFile && (
                <div className="mt-2 relative">
                  <img
                    src={questionFile}
                    alt="Question Preview"
                    className="h-24 rounded-md"
                  />
                  <button
                    onClick={() => setQuestionFile(null)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Question Type */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Question Type
              </label>
              <input
                type="text"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                placeholder="Multiple Choice, True/False, etc."
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              />
            </div>

            {/* Options */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Options
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentOptions.map((opt, index) => (
                  <div key={index} className="mb-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label className="inline-flex items-center px-3 rounded-r-lg h-full bg-gray-100 border-l border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
                          <FaImage className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">Image</span>
                          <input
                            type="file"
                            onChange={(e) => handleOptionFileChange(index, e)}
                            className="sr-only"
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                    {optionsFiles[index] && (
                      <div className="mt-2 relative">
                        <img
                          src={optionsFiles[index]}
                          alt={`Option ${index + 1} Preview`}
                          className="h-16 rounded-md"
                        />
                        <button
                          onClick={() => {
                            setOptionsFiles((prev) => {
                              const updated = [...prev];
                              updated[index] = "";
                              return updated;
                            });
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {currentOptions.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2 text-gray-500" />
                  Add Option
                </button>
              )}
            </div>

            {/* Correct Answer */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Correct Answer
              </label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter as 'Option 1', 'Option 2', etc."
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={handleAddQuestionClick}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <FaPlus className="mr-2" />
                Add Question
              </button>

              <button
                onClick={handlePostQuizToApi}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                disabled={questions.length === 0}
              >
                <FaArrowRight className="mr-2" />
                Publish Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Button */}
      <div>
        <Tooltip label="Get help from AI assistant" placement="left">
          <button
            className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-20"
            onClick={() => setIsChatbotOpen(true)}
          >
            <FaRobot className="w-6 h-6" />
          </button>
        </Tooltip>
      </div>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
          <div className="w-full max-w-md h-full bg-white shadow-2xl rounded-l-xl flex flex-col">
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between rounded-tl-xl">
              <h3 className="font-semibold flex items-center">
                <FaRobot className="mr-2" /> AI Assistant
              </h3>
              <button
                className="text-white hover:bg-indigo-700 rounded-full p-2 transition-colors"
                onClick={() => setIsChatbotOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
