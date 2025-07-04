import React, { useEffect, useState } from 'react';
import QuizModal from './QuizModal';

const StudentQuizzes = ({ userEmail }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);

  useEffect(() => {
    fetch(`https://childtynker-backend-3.onrender.com/api/quiz/student/${userEmail}`)
      .then(res => res.json())
      .then(data => setQuizzes(data));
  }, [userEmail]);

  return (
    <div>
      <h2>Quizzes</h2>
      <ul>
        {quizzes.filter(q => !q.completed).map(q => (
          <li key={q.id}>
            {q.title}
            <button onClick={() => setActiveQuiz(q)}>Take Quiz</button>
          </li>
        ))}
      </ul>
      <h3>Completed</h3>
      <ul>
        {quizzes.filter(q => q.completed).map(q => (
          <li key={q.id}>{q.title} (Score: {q.score || 'N/A'})</li>
        ))}
      </ul>
      {activeQuiz && (
        <QuizModal quiz={activeQuiz} userEmail={userEmail} onClose={() => setActiveQuiz(null)} />
      )}
    </div>
  );
};

export default StudentQuizzes;