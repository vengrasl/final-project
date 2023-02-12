import QuestionContext from "../context/QuestionContext";
import { useContext, useState } from "react";
import Question from "./Question";
import { Link } from "react-router-dom";
import AnswerContext from "../context/AnswerContext";

const Questions = () => {
  const { questions } = useContext(QuestionContext);
  const { answers } = useContext(AnswerContext);
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedOption, setSelectedOption] = useState("all");

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filteredQuestions = questions && questions.filter(question => {
    if (selectedOption === "all") return true;
    if (selectedOption === "answered") return answers.some(answer => answer.questionId === question.id);
    if (selectedOption === "notAnswered") return !answers.some(answer => answer.questionId === question.id);
    return true;
  });

  let sortedQuestions = [];
  if (filteredQuestions) {
    sortedQuestions = [...filteredQuestions];
    if (sortOrder === "newest") {
      sortedQuestions.sort((a, b) => new Date(b.questionPostDate) - new Date(a.questionPostDate));
    } else {
      sortedQuestions.sort((a, b) => new Date(a.questionPostDate) - new Date(b.questionPostDate));
    }
  }

  return (
    <>
    <div className="sort-container">
        <div>
          <label htmlFor="sort-order">Sort by date:</label>
          <select id="sort-order" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="newest">Newest questions</option>
            <option value="oldest">Oldest questions</option>
          </select>
        </div>
        <div className="selectOption">
        <label>Sort by answers:</label>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="all">All</option>
            <option value="answered">Answered</option>
            <option value="notAnswered">Not Answered</option>
          </select>
        </div>
      </div>
    <section className="homeQuestions">
      {
        filteredQuestions ?
          filteredQuestions.length > 0 ?
            sortedQuestions.map(question =>
              <Question
                key={question.id}
                data={question}
              />
            ) :
            <div className="noPosts">
              <p>There are no questions at this time. Be the first one to Add a question by clicking <Link to='/addQuestion'>HERE</Link> </p>
            </div>
          :
          <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loading" />
      }
    </section>
    </>
  );
}

export default Questions;