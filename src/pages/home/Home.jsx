import './Home.css';

export const Home = ({ setPage }) => {
  const startQuiz = () => {
    setPage('quiz');
  };

  return (
    <div className="home-page">
      <div className="content">
        <div className="row">
          <h1 className="col text-center text-uppercase">Fantasy Quiz</h1>
        </div>
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-light" onClick={startQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
