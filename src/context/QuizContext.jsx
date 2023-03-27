import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const QuizContext = createContext({
  quizNumber: null,
  scorePerAnswer: 0,
  questions: [],
  correctCount: 0,
});

export const QuizProvider = ({ children }) => {
  const [quizNumber, setQuizNumber] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [scorePerAnswer, setScorePerAnswer] = useState(0);

  useEffect(() => {
    fetch('/data/quiz_data.json')
      .then((res) => res.json())
      .then((response) => {
        const { data } = response;
        setQuizNumber(data.quizNumber);
        setQuestions(data.questions);
        setScorePerAnswer(data.scorePerAnswer ?? 50);
      })
      .catch((reason) => {
        setQuizNumber(null);
        setQuestions([]);
        setScorePerAnswer(0);
        console.error(reason);
      });
  }, []);

  const updateCount = useCallback((count) => {
    setCorrectCount(count);
  }, []);

  const resetCount = useCallback(() => {
    setCorrectCount(0);
  }, []);

  const value = useMemo(() => {
    return {
      quizNumber,
      questions,
      correctCount,
      scorePerAnswer,
      updateCount,
      resetCount,
    };
  }, [
    quizNumber,
    questions,
    correctCount,
    scorePerAnswer,
    updateCount,
    resetCount,
  ]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
