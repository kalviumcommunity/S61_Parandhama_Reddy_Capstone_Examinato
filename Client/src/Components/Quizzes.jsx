/* eslint-disable no-unused-vars */
import React from "react";

const Quizzes = () => {
  const quizzes = [
    { id: 1, topic: "Math Quiz" },
    { id: 2, topic: "History Quiz" },
    { id: 3, topic: "Science Quiz" },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      <div className="grid grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white shadow-lg rounded-md p-4 text-center cursor-pointer"
          >
            <h2 className="text-lg font-semibold mb-2">{quiz.topic}</h2>
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
