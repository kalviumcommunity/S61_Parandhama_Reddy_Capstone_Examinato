import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Spinner } from "@chakra-ui/react";

const QuizAttempt = () => {
  const { type } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const selectedAuthor = queryParams.get("author") || "All";
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    console.log("Quiz type:", type);

    const fetchQuestions = async () => {
      try {
        const token = getCookie("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://s61-parandhama-reddy-capstone-examinato.onrender.com/api/getquiz",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched quiz data:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          let filteredQuestions = response.data;
          if (selectedAuthor !== "All") {
            filteredQuestions = response.data.filter(
              (question) => question.author === selectedAuthor
            );
          }
          filteredQuestions = filteredQuestions.filter(
            (question) => question.type.toUpperCase() === type.toUpperCase()
          );
          console.log("Filtered questions:", filteredQuestions);
          setQuestions(filteredQuestions);

          const initialAnswers = {};
          filteredQuestions.forEach((question) => {
            initialAnswers[question.id] = "";
          });
          setAnswers(initialAnswers);
        } else {
          setError("No questions available for this type.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [type, selectedAuthor]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleAnswerChange = (questionId, option) => {
    const updatedAnswers = { ...answers, [questionId]: option };
    setAnswers(updatedAnswers);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleVerifyAnswers();
    }
  };

  const handleVerifyAnswers = () => {
    navigate("/results", { state: { questions, answers } });
  };

  if (loading) {
    return (
      <div className="absolute top-[25%] left-[45%]">
        <Spinner
          className="p-20"
          thickness="15px"
          speed="0.45s"
          color="red"
          size="xl"
        />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto mt-8 border-2 p-4 h-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Left side div (scrollable) */}
        <div className="w-full md:w-[25%] bg-white border h-auto overflow-y-auto shadow-lg rounded p-5 hidden md:block">
          {questions.map((q, index) => (
            <Card
              key={index}
              className="border-[1px] py-5 px-2 mb-5 text-[12px]"
              onClick={() => setCurrentQuestionIndex(index)}
            >
              <div className="mb-5 font-bold">{q.question}</div>
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                {q.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    className={`py-1 px-2 rounded-md ${
                      answers[q.id] === option
                        ? "bg-blue-500 text-white"
                        : "bg-slate-500 text-black"
                    }`}
                    disabled
                  >
                    {option}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
        {/* Right side div (current question) */}
        <div className="w-full border-2 py-10 px-24 md:w-[70%] md:ml-8 mt-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Quiz on {type}
          </h1>
          <div className="relative h-auto w-full">
            {currentQuestion && (
              <div
                key={currentQuestion.id}
                className="flex flex-col items-center"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  {currentQuestion.question}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`py-2 md:py-4 px-4 md:px-6 rounded-md ${
                        answers[currentQuestion.id] === option
                          ? "bg-blue-500 text-white"
                          : "bg-slate-500 text-black"
                      }`}
                      onClick={() =>
                        handleAnswerChange(currentQuestion.id, option)
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="py-2 px-4 bg-blue-500 text-white rounded-md mt-4"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "Next Question"
                      : "Verify Answers"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
