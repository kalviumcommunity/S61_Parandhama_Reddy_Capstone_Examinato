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
        // console.log(response.data)

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
    <div className="container mx-auto mt-8 border-2 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-start">
        {/* Left side div (scrollable) */}
        <div className="w-full md:w-1/4 bg-gray-100 border-r h-[calc(100vh-150px)] overflow-y-auto shadow-md rounded-lg p-4 hidden md:block">
          {questions.map((q, index) => (
            <Card
              key={index}
              className={`mb-4 p-4 cursor-pointer transition duration-300 hover:bg-gray-200 ${
                currentQuestionIndex === index
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              <div className="mb-3 font-semibold text-sm">
                {q.question.startsWith("data:image/") ? (
                  <img
                    src={q.question}
                    alt="Question"
                    className="px-20 h-auto w-auto  rounded-md"
                    style={{
                      maxHeight: "60px",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  q.question
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    className={`py-1 px-2 text-xs rounded-md ${
                      answers[q.id] === option
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
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
        <div className="w-full md:w-3/4 md:pl-8 mt-4 md:mt-0 py-28">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Quiz on {type}
          </h1>
          <div className="relative h-auto w-full bg-white shadow-lg rounded-lg p-6 pb-48">
            {currentQuestion && (
              <div className="flex flex-col items-center">
                {currentQuestion.question.startsWith("data:image/") ? (
                  <img
                    src={currentQuestion.question}
                    alt="Question"
                    className="mb-4 rounded-md"
                    style={{
                      maxHeight: "300px",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <h2 className="text-lg md:text-xl font-semibold mb-4">
                    {currentQuestion.question}
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`py-2 md:py-3 px-4 md:px-6 rounded-md transition duration-200 ease-in-out transform ${
                        answers[currentQuestion.id] === option
                          ? "bg-blue-500 text-white scale-105"
                          : "bg-gray-300 text-black"
                      } hover:bg-gray-400`}
                      onClick={() =>
                        handleAnswerChange(currentQuestion.id, option)
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button
                  className="py-2 px-6 bg-blue-500 text-white rounded-md mt-6 hover:bg-blue-600 transition duration-300"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question"
                    : "Verify Answers"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
