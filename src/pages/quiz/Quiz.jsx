import { useContext, useState } from 'react';
import { QuizContext } from '../../context/QuizContext';
import './Quiz.css';

export const Quiz = ({ setPage }) => {
  const {
    quizNumber,
    questions,
    correctCount,
    scorePerAnswer,
    updateCount,
    resetCount,
  } = useContext(QuizContext);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const questionObject = questions[questionIndex];
  const progressPercentage =
    questions.length > 0 ? (questionIndex * 100) / questions.length : 0;

  const submitAnswer = () => {
    if (questionObject?.correctAnswer === selectedAnswer) {
      updateCount(correctCount + 1);
    }
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setPage('result');
    }
  };

  const cancelQuiz = () => {
    resetCount();
    setPage('home');
  };

  return (
    <div className="container-fluid">
      <div className="row header py-4">
        <div className="col col-2 d-flex align-items-center">
          <div className="score">{correctCount * scorePerAnswer}</div>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <div className="title">Fantacy Quiz #{quizNumber}</div>
        </div>
        <div className="col col-2 d-flex align-items-center justify-content-end">
          <div className="close" onClick={cancelQuiz}>
            X
          </div>
        </div>
      </div>

      <div className="row py-2 align-items-center d-lg-none">
        <div className="col">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: '#45c486',
              }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        <div className="col col-1 pl-0 d-flex align-items-center justify-content-end">
          {questionIndex + 1}/{questions.length}
        </div>
      </div>

      <div className="row pt-4 mb-5 text-center">
        <div className="col question">{questionObject?.question}</div>
      </div>

      <div className="row mt-5">
        <div className="col">
          {questionObject?.options?.map((option, index) => (
            <div
              key={option.id}
              className={`answer mb-5 d-flex align-items-center ${option.id === selectedAnswer ? 'selected' : ''
                }`}
            >
              <input
                type="radio"
                className="btn-check"
                name="answer"
                id={option.id}
                checked={option.id === selectedAnswer}
                onChange={() => setSelectedAnswer(option.id)}
              />{' '}
              <label htmlFor={option.id} className="mx-2 answer-option">
                {index + 1}
              </label>
              <span className='checkicon'></span>
              <span className="answer-label">{option.index}</span>
              <span className="answer-label amount px-2">
                ₹{option.value.toLocaleString()},
              </span>
              <span
                className={`answer-label ${option.changePercentage <= 0 ? 'down-ratio' : 'up-ratio'
                  }`}
              >
                {option.changePercentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="row footer">
        <div className='col col-3 d-none d-lg-block'></div>
        <div className='col col-3 d-none d-lg-block'>
          <div className="row py-2 pt-3 align-items-center">
            <div className="col">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: '#45c486',
                  }}
                  aria-valuenow={progressPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="col col-1 pl-0 d-flex align-items-center justify-content-end">
              {questionIndex + 1}/{questions.length}
            </div>
          </div>
        </div>
        <div className="col col-3 text-center continue-section">
          <button
            type="button"
            className="btn btn-secondary text-uppercase w-100 continue"
            disabled={selectedAnswer === null}
            onClick={submitAnswer}
          >
            {questionIndex === questions.length - 1 ? 'Finish' : 'Continue'}
          </button>
        </div>
        <div className='col col-3 d-none d-lg-block'></div>
      </div>
    </div>
  );
};
