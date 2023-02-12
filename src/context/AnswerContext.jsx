import { createContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const AnswerContext = createContext();
const AnswerProvider = ({ children }) => {

  const [answers, setAnswers] = useState(null);

  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
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
      headers: { 'Content-Type': 'application/json' }
    });
    setAnswers([...answers, newAnswer]);
  }

  const deleteAnswer = async (id) => {
    await fetch(`http://localhost:5000/answers/${id}`, {
      method: 'DELETE'
    });
    setAnswers(answers.filter(answer => answer.id !== id))
  }

  const updateAnswer = async (id, updatedAnswer) => {
    await fetch(`http://localhost:5000/answers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedAnswer),
      headers: { 'Content-Type': 'application/json' }
    });
    setAnswers(answers.map(answer => answer.id.toString() === id ? { ...answer, ...updatedAnswer } : answer));
  }

  const handleAnswerLikes = async (id) => {
    const answerToUpdate = answers.find(answer => answer.id === id);
    if (!answerToUpdate.likedBy.includes(loggedInUser.id)) {
      answerToUpdate.likedBy.push(loggedInUser.id);
      answerToUpdate.disLikedBy = answerToUpdate.disLikedBy.filter(userId => userId !== loggedInUser.id);
    } else {
      answerToUpdate.likedBy = answerToUpdate.likedBy.filter(userId => userId !== loggedInUser.id);
    }
    await updateAnswer(id, answerToUpdate);
  }

  const handleAnswerDislike = async (id) => {
    const answerToUpdate = answers.find(answer => answer.id === id);
    if (!answerToUpdate.disLikedBy.includes(loggedInUser.id)) {
      answerToUpdate.disLikedBy.push(loggedInUser.id);
      answerToUpdate.likedBy = answerToUpdate.likedBy.filter(userId => userId !== loggedInUser.id);
    } else {
      answerToUpdate.disLikedBy = answerToUpdate.disLikedBy.filter(userId => userId !== loggedInUser.id);
    }
    await updateAnswer(id, answerToUpdate);
  }

  return (
    <AnswerContext.Provider
      value={{
        answers,
        addNewQuestion,
        deleteAnswer,
        updateAnswer,
        handleAnswerLikes,
        handleAnswerDislike
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export { AnswerProvider };
export default AnswerContext;