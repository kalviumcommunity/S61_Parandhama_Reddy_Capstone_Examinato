/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("https://s61-parandhama-reddy-capstone-examinato.onrender.com/api/getquiz");
        if (Array.isArray(response.data)) {
          setQuizzes(response.data);
        } else {
          console.error("API response is not an array:", response.data);
          setQuizzes([]);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      <div className="grid grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white shadow-lg rounded-md p-4 text-center cursor-pointer"
          >
            <h2 className="text-lg font-semibold mb-2">{quiz.type}</h2>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
