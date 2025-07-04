import React, { useState } from 'react';

const QuizModal = ({ quiz, userEmail, onClose }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleChange = (qid, value) => setAnswers({ ...answers, [qid]: value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://childtynker-backend-3.onrender.com/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, quizId: quiz.id, answers }),
    });
    const data = await res.json();
    setScore(data.score);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{quiz.title}</h3>
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((q, i) => (
            <div key={i}>
              <p>{q.question}</p>
              {q.options.map((opt, j) => (
                <label key={j}>
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button type="submit" disabled={submitted}>Submit</button>
        </form>
        {submitted && <div>Your Score: {score}</div>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuizModal;
