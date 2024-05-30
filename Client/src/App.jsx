/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import QuizComponent from "./Components/QuizComponent";
import QuizPreview from "./Components/QuizPreview";
import LoginForm from "./Form/LoginForm";
import SigninForm from "./Form/SigninForm";
import LandingPage from "./Pages/LandingPage";
import Homepage from "./Pages/Homepage";
import PinVerification from "./Components/PinVerification";
import Quizzes from "./Components/Quizzes";
import QuizAttempt from "./Components/QuizAttempt";
import ResultPage from "./Pages/ResultPage";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleStartQuiz = (topic) => {
    setCurrentTopic(topic);
    setQuestions([]);
  };

  const topics = [
    { name: "JEE 2025" },
    { name: "Data Structures" },
    { name: "UPSC" },
    { name: "History" },
  ];

  return (
    <>
      {location.pathname !== "/"}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route
          path="/home"
          element={<Homepage topics={topics} onStartQuiz={handleStartQuiz} />}
        />
        <Route
          path="/create-quiz"
          element={<QuizComponent handleAddQuestion={handleAddQuestion} />}
        />
        <Route
          path="/quiz-preview"
          element={<QuizPreview questions={questions} />}
        />
        <Route path="/pin-verification" element={<PinVerification />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quiz/:type" element={<QuizAttempt />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
