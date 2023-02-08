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

  const deleteQuestion = async (id) => {
    await fetch(`http://localhost:5000/questions/${id}`, {
      method: 'DELETE'
    });
    setQuestions(questions.filter(question => question.id !== id))
  }

  const updateQuestion = async (id, updatedQuestion) => {
    await fetch(`http://localhost:5000/questions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedQuestion),
      headers: { 'Content-Type': 'application/json' }
    });
    setQuestions(questions.map(question => question.id.toString() === id ? { ...question, ...updatedQuestion } : question));
  }

  const likeQuestion = async (id) => {
    const question = questions.find(question => question.id === id);
    const updatedQuestion = { ...question, likes: question.likes + 1 };
    await fetch(`http://localhost:5000/questions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedQuestion),
      headers: { 'Content-Type': 'application/json' }
    });
    setQuestions(questions.map(question => question.id === id ? { ...question, likes: question.likes + 1 } : question));
  }

  const dislikeQuestion = async (id) => {
    const question = questions.find(question => question.id === id);
    const updatedQuestion = { ...question, dislikes: question.dislikes - 1 };
    await fetch(`http://localhost:5000/questions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedQuestion),
      headers: { 'Content-Type': 'application/json' }
    });
    setQuestions(questions.map(question => question.id === id ? { ...question, dislikes: question.dislikes - 1 } : question));
  }


  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        addNewQuestion,
        deleteQuestion,
        updateQuestion,
        likeQuestion,
        dislikeQuestion
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;