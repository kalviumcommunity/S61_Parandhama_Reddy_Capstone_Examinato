/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
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
import { ToastContainer } from "react-toastify";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-N6WKF8LBVF", {
        page_path: location.pathname,
      });
    }
  }, [location]);

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
        {/*<Route path="/pin-verification" element={<PinVerification />} />*/}
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quiz/:type" element={<QuizAttempt />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
