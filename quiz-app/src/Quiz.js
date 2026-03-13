import React, { useState, useEffect } from "react";
import Questions from "./Questions";

function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {

    if (option === Questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    nextQuestion();
  };

  const nextQuestion = () => {

    const next = currentQuestion + 1;

    if (next < Questions.length) {
      setCurrentQuestion(next);
      setTimeLeft(10);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">

      {showResult ? (

        <div className="result">
          <h2>Quiz Completed!</h2>
          <h3>Your Score: {score} / {Questions.length}</h3>
        </div>

      ) : (

        <div>

          <h2>Question {currentQuestion + 1}</h2>

          <p>{Questions[currentQuestion].question}</p>

          <h4>Time Left: {timeLeft} sec</h4>

          {Questions[currentQuestion].options.map((option, index) => (

            <button
              key={index}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>

          ))}

        </div>

      )}

    </div>
  );
}

export default Quiz;