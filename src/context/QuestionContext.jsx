import { createContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const QuestionContext = createContext();
const QuestionProvider = ({ children }) => {

const [questions, setQuestions] = useState(null);

const { loggedInUser } = useContext(UserContext);

const [showMessageQuestion, setShowMessageQuestion] = useState(false);

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

  const handleLikes = async (id) => {
    const updatedQuestion= questions.find(question => question.id === id);
    if(!updatedQuestion.likedBy.includes(loggedInUser.id)) {
        updatedQuestion.likedBy.push(loggedInUser.id);
        updatedQuestion.disLikedBy = updatedQuestion.disLikedBy.filter(userId => userId !== loggedInUser.id);
    } else {
        updatedQuestion.likedBy = updatedQuestion.likedBy.filter(userId => userId !== loggedInUser.id);
    }
    await updateQuestion(id, updatedQuestion);
  }
  
  const handleDislike = async (id) => {
    const updatedQuestion= questions.find(question => question.id === id);
    if(!updatedQuestion.disLikedBy.includes(loggedInUser.id)) {
        updatedQuestion.disLikedBy.push(loggedInUser.id);
        updatedQuestion.likedBy = updatedQuestion.likedBy.filter(userId => userId !== loggedInUser.id);
    } else {
        updatedQuestion.disLikedBy = updatedQuestion.disLikedBy.filter(userId => userId !== loggedInUser.id);
    }
    await updateQuestion(id, updatedQuestion);
  }


  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        addNewQuestion,
        deleteQuestion,
        updateQuestion,
        handleLikes,
        handleDislike,
        showMessageQuestion,
        setShowMessageQuestion
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;