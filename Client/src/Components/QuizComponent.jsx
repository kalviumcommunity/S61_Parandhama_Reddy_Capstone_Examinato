/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const QuizComponent = ({ handleAddQuestion }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '']);
  const [quizTitle, setQuizTitle] = useState('');
  const [isTitleSet, setIsTitleSet] = useState(false);

  const handleAddOption = () => {
    setCurrentOptions([...currentOptions, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = value;
    setCurrentOptions(updatedOptions);
  };

  const handleAddQuestionClick = () => {
    if (currentQuestion.trim() !== '' && currentOptions.some(opt => opt.trim() !== '')) {
      const newQuestion = {
        question: currentQuestion,
        options: currentOptions.filter((opt) => opt.trim() !== ''),
      };
      setQuestions([...questions, newQuestion]);
      handleAddQuestion(newQuestion);
      setCurrentQuestion('');
      setCurrentOptions(['', '']);
    }
  };

  const handleSetTitle = () => {
    if (quizTitle.trim() !== '') {
      setIsTitleSet(true);
    }
  };

  const buttonStyle = {
    width: '25%',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px', position: 'relative' }}>
      {!isTitleSet && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button type="button" onClick={handleSetTitle} style={buttonStyle}>Set Title</button>
        </div>
      )}
      {isTitleSet && (
        <>
          <h2 style={{ textAlign: 'center' }}>{quizTitle}</h2>
          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
              <div>{q.question}</div>
              <ul>
                {q.options.map((opt, optIndex) => (
                  <li key={optIndex}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Add a new question"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            {currentOptions.map((opt, index) => (
              <input
                key={index}
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
            ))}
            <button type="button" onClick={handleAddOption} style={buttonStyle}>Add Option</button>
            <button type="button" onClick={handleAddQuestionClick} style={buttonStyle}>Add Question</button>
          </div>
        </>
      )}
      {isTitleSet && (
        <button style={{ ...buttonStyle, position: 'absolute', top: '10px', right: '10px' }}>Post Quiz</button>
      )}
    </div>
  );
};

export default QuizComponent;
