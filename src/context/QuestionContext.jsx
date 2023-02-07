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

  const addNewQuestion = async (newQuestion) => {
    const res = await fetch('http://localhost:5000/questions', {
      method: 'POST',
      body: JSON.stringify(newQuestion),
      headers: {'Content-Type': 'application/json'}
    });
    const uptatedData = await res.json();
    setQuestions([...questions, uptatedData]);
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        addNewQuestion
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;