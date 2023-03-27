import { useState } from 'react';
import { Home } from './pages/home/Home';
import { Quiz } from './pages/quiz/Quiz';
import { Result } from './pages/result/Result';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'quiz' && <Quiz setPage={setPage} />}
      {page === 'result' && <Result setPage={setPage} />}
    </>
  );
}

export default App;
