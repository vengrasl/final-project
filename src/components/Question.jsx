import UserContext from "../context/UserContext";
import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";

const Question = ({data}) => {

  const { users, loggedInUser } = useContext(UserContext);
  const { deleteQuestion } = useContext(QuestionContext);

  const questionOwner = users.find(user => user.id === data.userId);


  return ( 
    <div className="questionContainer">
      <div className="questionPostInfo">
        {
        questionOwner && 
          <div className="questionInfo">
            <img src={questionOwner.avatar} alt="user avatar"/>
            <h4>{questionOwner.username}</h4>
          </div>
        }
        <p>Question was posted: <span>{data.questionPostDate}</span></p>
      </div>
      <div className="theQuestion">
        <h1>{data.title}</h1>
      </div>
      <div>
        {loggedInUser && loggedInUser.id === questionOwner.id &&
        <button onClick={()=> deleteQuestion(data.id)}>Delete question</button>
        }
      </div>


        
        






    </div>
   );
}
 
export default Question;