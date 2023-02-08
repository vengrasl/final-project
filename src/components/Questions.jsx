import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";
import Question from "./Question";
import { Link } from "react-router-dom";

const Questions = () => {

  const { questions } = useContext(QuestionContext)

  return ( 
    <section className="homeQuestions">
    {
      questions ?
      questions.length > 0 ?
      questions.map(question =>
        <Question
          key={question.id}
          data={question}
        />
      ) :
      <div className="noPosts">
        <p>There are no questions at this time. Be the first one to Add a question by clicking <Link to='/addQuestion'>HERE</Link> </p>
      </div> 
      :
      <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loading"/>
    }
    </section>
   );
}
 
export default Questions;