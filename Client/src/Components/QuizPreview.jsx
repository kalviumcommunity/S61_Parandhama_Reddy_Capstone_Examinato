/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const QuizPreview = ({ questions }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuizzes = (topic) => {
    setIsLoading(true);

    // Simulate fetching quizzes with mock data
    setTimeout(() => {
      const mockQuizzes = [
        { id: 1, question: 'Mock Question 1', options: ['Option A', 'Option B', 'Option C'] },
        { id: 2, question: 'Mock Question 2', options: ['Option D', 'Option E', 'Option F'] },
      ];
      setQuizzes(mockQuizzes);
      setIsLoading(false);
    }, 1000);
  };

  const handleJoinQuiz = (topic) => {
    fetchQuizzes(topic);
  };

  const buttonStyle = {
    width: '100%',
    maxWidth: '300px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', width: '100%' }}>
            <div>{question.question}</div>
            {question.options.map((opt, optIndex) => (
              <input key={optIndex} type="text" value={opt} readOnly style={{ width: '100%', padding: '8px', marginBottom: '5px', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '3px' }} />
            ))}
          </div>
        ))}
      </div>
      <button style={buttonStyle} onClick={() => handleJoinQuiz('YourTopicName')}>
        {isLoading ? 'Loading Quizzes...' : 'Join Quiz'}
      </button>
      {isLoading ? (
        <p>Loading quizzes...</p>
      ) : (
        <div>
          {quizzes.map((quiz) => (
            <div key={quiz.id}>
              <h3>Quiz ID: {quiz.id}</h3>
              <p>Question: {quiz.question}</p>
              <ul>
                {quiz.options.map((opt, index) => (
                  <li key={index}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPreview;
