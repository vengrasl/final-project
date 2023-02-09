import { useParams } from 'react-router-dom';
import QuestionContext from "../context/QuestionContext";
import AnswerContext from '../context/AnswerContext';
import { useContext } from "react";
import Question from "./Question";

const Answers = () => {

  //question id
  const { id } = useParams();
  console.log(id)
  
  const { questions } = useContext(QuestionContext);

  const { answers } = useContext(AnswerContext);

  //pasirinktas klausimas
  const currentQuestion = questions ? questions.filter(question => question.id.toString() === id) : [];
  console.log(currentQuestion)

  //specifinis atsakymas
  const currentAnswer = answers ? answers.filter(answer => answer.questionId.toString() === id ) : [];
  console.log(currentAnswer)

  return ( 
    <section className='answers'>

{
  currentQuestion &&
  currentQuestion.map(question => (

      <Question key={question.id}
      data={question} />

  ))
}

<h3>Answers:</h3>
    {
      currentAnswer ?
      currentAnswer.length > 0 ?
      currentAnswer.map(answer => (
        <div key={answer.id}>
          <p>{answer.answer}</p>
        </div>
      ))
      :
      <div className="noPosts">
        <p>There are no answers to this question yet.</p>
      </div>
      :
      <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loading"/>
    }
    </section>
   );
}
 
export default Answers;