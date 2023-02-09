import { createContext, useState, useEffect } from "react";

const AnswerContext = createContext();
const AnswerProvider = ({ children }) => {

const [answers, setAnswers] = useState(null);

  useEffect(()=>{
    const questionData = async () => {
      const res = await fetch('http://localhost:5000/answers');
      const data = await res.json();
      setAnswers(data);
    }
    questionData();
  }, []);

  const addNewQuestion = async (newAnswer) => {
    await fetch('http://localhost:5000/answers', {
      method: 'POST',
      body: JSON.stringify(newAnswer),
      headers: {'Content-Type': 'application/json'}
    });
    setAnswers([...answers, newAnswer]);
  }



  return (
    <AnswerContext.Provider
      value={{
        answers,
        addNewQuestion
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export { AnswerProvider };
export default AnswerContext;