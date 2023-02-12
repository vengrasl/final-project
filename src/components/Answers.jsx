import { useParams } from 'react-router-dom';
import QuestionContext from "../context/QuestionContext";
import AnswerContext from '../context/AnswerContext';
import { useContext } from "react";
import Question from "./Question";
import Answer from './Answer';
import AddAnswer from "./AddAnswer";
import UserContext from '../context/UserContext';

const Answers = () => {

  const { id } = useParams();

  const { questions } = useContext(QuestionContext);

  const { answers } = useContext(AnswerContext);

  const { loggedInUser } = useContext(UserContext)

  const currentQuestion = questions ? questions.filter(question => question.id.toString() === id) : [];

  const currentAnswer = answers ? answers.filter(answer => answer.questionId && answer.questionId.toString() === id) : [];

  return (
    <section className='answers'>
      {currentQuestion &&
        currentQuestion.map(question => (
          <Question
            key={question.id}
            data={question}
          />
        ))
      }
      <h3 className='answersSection'>Answers section</h3>
      {currentAnswer ?
          currentAnswer.length > 0 ?
            currentAnswer.map(answer =>
              <Answer
                key={answer.id}
                data={answer}
              />
            )
            :
            <div className="noPosts">
              <p>There are no answers to this question yet.</p>
            </div>
          :
          <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loading" />
      }
      {loggedInUser &&
        <AddAnswer
          id={id} />
      }

    </section>
  );
}

export default Answers;