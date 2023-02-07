import { createContext, useState, useEffect } from "react";

const QuestionContext = createContext();
const QuestionProvider = ({ children }) => {

const [questions, setQuestions] = useState(null);

  useEffect(()=>{
    const questionData = async () => {
      const res = await fetch('http://localhost:5000/questions');
      const data = await res.json();
      setQuestions(data);
    }
    questionData();
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;