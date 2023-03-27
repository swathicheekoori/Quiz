import { useContext } from 'react';
import { QuizContext } from '../../context/QuizContext';
import './Result.css';

export const Result = ({ setPage }) => {
  const { quizNumber, correctCount, scorePerAnswer, resetCount } =
    useContext(QuizContext);

  const closeResult = () => {
    resetCount();
    setPage('home');
  };

  return (
    <div className="container-fluid">
      <div className="row header py-4">
        <div className="col d-flex align-items-center justify-content-end">
          <div onClick={closeResult} className="close">
            X
          </div>
        </div>
      </div>
      <div className="row mt-5 pt-5">
        <div className="col text-center result-title">
          Results of Fantasy Quiz #{quizNumber}
        </div>
      </div>
      <div className="mt-5 result-content">
        <div className="row h-60 d-flex align-items-center p-3">
          <div className="col text-uppercase">Score gained</div>
          <div className="col col-2 d-flex align-items-center justify-content-end">
            {correctCount * scorePerAnswer}
          </div>
        </div>
        <div className="row h-60 d-flex align-items-center p-3">
          <div className="col text-uppercase d-flex align-items-center">
            Correct predictions
          </div>
          <div className="col col-2 d-flex align-items-center justify-content-end">
            {correctCount}
          </div>
        </div>
      </div>
      <div className="row result-footer">
        <div className="col text-center pt-5">
          <button
            type="button"
            className="btn btn-secondary text-uppercase w-100 okay"
            onClick={closeResult}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};
