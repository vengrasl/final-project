import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";
import Question from "./Question";

const Questions = () => {

  const { questions } = useContext(QuestionContext)
  console.log(questions)

  return ( 
    <>
    {
      questions && questions.map(question =>
      <Question
      key={question.id}
      data={question}
      />
      )
    }
    </>
   );
}
 
export default Questions;